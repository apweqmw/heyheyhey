import {
  firms,
  accounts,
  promotions,
  accountPrices,
  type Firm,
  type Account,
  type Promotion,
  type InsertFirm,
  type InsertAccount,
  type InsertPromotion,
  type FirmWithDetails,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql, gte, lte, isNull, or } from "drizzle-orm";

export interface IStorage {
  // Firm operations
  getFirms(options?: {
    locale?: string;
    sort?: string;
    accountSize?: number;
    minDiscount?: number;
    maxPayoutDays?: number;
    platform?: string;
    limit?: number;
    offset?: number;
  }): Promise<FirmWithDetails[]>;
  
  getFirmBySlug(slug: string, locale?: string): Promise<FirmWithDetails | undefined>;
  getFirmById(id: string): Promise<Firm | undefined>;
  createFirm(firm: InsertFirm): Promise<Firm>;
  updateFirm(id: string, firm: Partial<InsertFirm>): Promise<Firm>;
  deleteFirm(id: string): Promise<void>;
  
  // Account operations
  getAccountsByFirmId(firmId: string): Promise<Account[]>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccount(id: string, account: Partial<InsertAccount>): Promise<Account>;
  deleteAccount(id: string): Promise<void>;
  
  // Promotion operations
  getActivePromotions(): Promise<Promotion[]>;
  getPromotionsByFirmId(firmId: string): Promise<Promotion[]>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
  updatePromotion(id: string, promotion: Partial<InsertPromotion>): Promise<Promotion>;
  deletePromotion(id: string): Promise<void>;
  
  // Sync operations for Airflow
  syncFirms(firms: Partial<InsertFirm>[]): Promise<{ success: number; errors: string[] }>;
  syncPromotions(promotions: Partial<InsertPromotion>[]): Promise<{ success: number; errors: string[] }>;
}

export class DatabaseStorage implements IStorage {
  async getFirms(options: {
    locale?: string;
    sort?: string;
    accountSize?: number;
    minDiscount?: number;
    maxPayoutDays?: number;
    platform?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<FirmWithDetails[]> {
    const {
      locale = 'en',
      sort = 'discount_desc',
      accountSize,
      minDiscount,
      maxPayoutDays,
      platform,
      limit = 50,
      offset = 0,
    } = options;

    let query = db
      .select({
        firm: firms,
        account: accounts,
        promotion: promotions,
      })
      .from(firms)
      .leftJoin(accounts, eq(firms.id, accounts.firmId))
      .leftJoin(promotions, and(
        eq(firms.id, promotions.firmId),
        eq(promotions.active, true),
        or(
          isNull(promotions.startsAt),
          lte(promotions.startsAt, new Date())
        ),
        gte(promotions.endsAt, new Date())
      ))
      .where(eq(firms.active, true));

    if (accountSize) {
      query = query.where(eq(accounts.sizeUsd, accountSize));
    }

    if (maxPayoutDays) {
      query = query.where(lte(firms.earliestPayoutDays, maxPayoutDays));
    }

    if (platform) {
      query = query.where(sql`${firms.platforms} ? ${platform}`);
    }

    // Apply sorting
    switch (sort) {
      case 'price_asc':
        query = query.orderBy(asc(accounts.basePrice));
        break;
      case 'price_desc':
        query = query.orderBy(desc(accounts.basePrice));
        break;
      case 'payout_asc':
        query = query.orderBy(asc(firms.earliestPayoutDays));
        break;
      case 'rating_desc':
        query = query.orderBy(desc(firms.rating));
        break;
      case 'discount_desc':
      default:
        query = query.orderBy(desc(promotions.discountPct));
        break;
    }

    query = query.limit(limit).offset(offset);

    const results = await query;

    // Group results by firm
    const firmMap = new Map<string, FirmWithDetails>();

    for (const row of results) {
      const firmId = row.firm.id;
      
      if (!firmMap.has(firmId)) {
        firmMap.set(firmId, {
          ...row.firm,
          accounts: [],
          promotions: [],
        });
      }

      const firmData = firmMap.get(firmId)!;

      if (row.account && !firmData.accounts.find(a => a.id === row.account!.id)) {
        firmData.accounts.push(row.account);
      }

      if (row.promotion && !firmData.promotions.find(p => p.id === row.promotion!.id)) {
        firmData.promotions.push(row.promotion);
      }
    }

    // Calculate derived fields
    return Array.from(firmMap.values()).map(firm => {
      const activePromotion = firm.promotions[0]; // Best discount
      const currentDiscount = activePromotion ? Number(activePromotion.discountPct) : 0;
      
      // Calculate final price for primary account size
      const primaryAccount = firm.accounts.find(a => accountSize ? a.sizeUsd === accountSize : true) || firm.accounts[0];
      const basePrice = primaryAccount ? Number(primaryAccount.basePrice) : 0;
      const finalPrice = basePrice * (1 - currentDiscount / 100);

      return {
        ...firm,
        currentDiscount,
        finalPrice,
        countdownEndTime: activePromotion?.endsAt?.toISOString(),
        accounts: firm.accounts.map(account => ({
          ...account,
          currentPrice: Number(account.basePrice) * (1 - currentDiscount / 100),
        })),
      };
    });
  }

  async getFirmBySlug(slug: string, locale: string = 'en'): Promise<FirmWithDetails | undefined> {
    const result = await db
      .select({
        firm: firms,
        account: accounts,
        promotion: promotions,
      })
      .from(firms)
      .leftJoin(accounts, eq(firms.id, accounts.firmId))
      .leftJoin(promotions, and(
        eq(firms.id, promotions.firmId),
        eq(promotions.active, true),
        or(
          isNull(promotions.startsAt),
          lte(promotions.startsAt, new Date())
        ),
        gte(promotions.endsAt, new Date())
      ))
      .where(and(eq(firms.slug, slug), eq(firms.active, true)));

    if (!result.length) return undefined;

    const firm = result[0].firm;
    const accountsMap = new Map<string, Account>();
    const promotionsMap = new Map<string, Promotion>();

    for (const row of result) {
      if (row.account) {
        accountsMap.set(row.account.id, row.account);
      }
      if (row.promotion) {
        promotionsMap.set(row.promotion.id, row.promotion);
      }
    }

    const accounts = Array.from(accountsMap.values());
    const promotions = Array.from(promotionsMap.values());
    const activePromotion = promotions[0];
    const currentDiscount = activePromotion ? Number(activePromotion.discountPct) : 0;

    return {
      ...firm,
      accounts: accounts.map(account => ({
        ...account,
        currentPrice: Number(account.basePrice) * (1 - currentDiscount / 100),
      })),
      promotions,
      currentDiscount,
      countdownEndTime: activePromotion?.endsAt?.toISOString(),
    };
  }

  async getFirmById(id: string): Promise<Firm | undefined> {
    const [result] = await db.select().from(firms).where(eq(firms.id, id));
    return result;
  }

  async createFirm(firmData: InsertFirm): Promise<Firm> {
    const [firm] = await db.insert(firms).values({
      ...firmData,
      updatedAt: new Date(),
    }).returning();
    return firm;
  }

  async updateFirm(id: string, firmData: Partial<InsertFirm>): Promise<Firm> {
    const [firm] = await db
      .update(firms)
      .set({ ...firmData, updatedAt: new Date() })
      .where(eq(firms.id, id))
      .returning();
    return firm;
  }

  async deleteFirm(id: string): Promise<void> {
    await db.delete(firms).where(eq(firms.id, id));
  }

  async getAccountsByFirmId(firmId: string): Promise<Account[]> {
    return await db.select().from(accounts).where(eq(accounts.firmId, firmId));
  }

  async createAccount(accountData: InsertAccount): Promise<Account> {
    const [account] = await db.insert(accounts).values({
      ...accountData,
      updatedAt: new Date(),
    }).returning();
    return account;
  }

  async updateAccount(id: string, accountData: Partial<InsertAccount>): Promise<Account> {
    const [account] = await db
      .update(accounts)
      .set({ ...accountData, updatedAt: new Date() })
      .where(eq(accounts.id, id))
      .returning();
    return account;
  }

  async deleteAccount(id: string): Promise<void> {
    await db.delete(accounts).where(eq(accounts.id, id));
  }

  async getActivePromotions(): Promise<Promotion[]> {
    return await db
      .select()
      .from(promotions)
      .where(
        and(
          eq(promotions.active, true),
          or(
            isNull(promotions.startsAt),
            lte(promotions.startsAt, new Date())
          ),
          gte(promotions.endsAt, new Date())
        )
      );
  }

  async getPromotionsByFirmId(firmId: string): Promise<Promotion[]> {
    return await db.select().from(promotions).where(eq(promotions.firmId, firmId));
  }

  async createPromotion(promotionData: InsertPromotion): Promise<Promotion> {
    const [promotion] = await db.insert(promotions).values({
      ...promotionData,
      updatedAt: new Date(),
    }).returning();
    return promotion;
  }

  async updatePromotion(id: string, promotionData: Partial<InsertPromotion>): Promise<Promotion> {
    const [promotion] = await db
      .update(promotions)
      .set({ ...promotionData, updatedAt: new Date() })
      .where(eq(promotions.id, id))
      .returning();
    return promotion;
  }

  async deletePromotion(id: string): Promise<void> {
    await db.delete(promotions).where(eq(promotions.id, id));
  }

  async syncFirms(firmsData: Partial<InsertFirm>[]): Promise<{ success: number; errors: string[] }> {
    const errors: string[] = [];
    let success = 0;

    for (const firmData of firmsData) {
      try {
        if (firmData.slug) {
          // Upsert logic
          const existing = await db
            .select()
            .from(firms)
            .where(eq(firms.slug, firmData.slug))
            .limit(1);

          if (existing.length > 0) {
            await this.updateFirm(existing[0].id, firmData);
          } else {
            await this.createFirm(firmData as InsertFirm);
          }
          success++;
        }
      } catch (error) {
        errors.push(`Failed to sync firm ${firmData.slug}: ${error}`);
      }
    }

    return { success, errors };
  }

  async syncPromotions(promotionsData: Partial<InsertPromotion>[]): Promise<{ success: number; errors: string[] }> {
    const errors: string[] = [];
    let success = 0;

    for (const promotionData of promotionsData) {
      try {
        if (promotionData.firmId && promotionData.title) {
          await this.createPromotion(promotionData as InsertPromotion);
          success++;
        }
      } catch (error) {
        errors.push(`Failed to sync promotion ${promotionData.title}: ${error}`);
      }
    }

    return { success, errors };
  }
}

export const storage = new DatabaseStorage();
