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
  
  // Review operations
  getReviewsByFirmSlug(slug: string, options?: {
    stars?: string;
    sort?: string;
  }): Promise<{ reviews: any[]; stats: any }>;
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

    // Simple approach: get all firms first, then get related data
    const firmsResult = await db
      .select()
      .from(firms)
      .where(eq(firms.active, true))
      .limit(limit)
      .offset(offset);

    if (firmsResult.length === 0) {
      return [];
    }

    const firmIds = firmsResult.map(f => f.id);
    
    // Get all accounts for these firms using individual queries for each firm
    const accountsResult: Account[] = [];
    const promotionsResult: Promotion[] = [];
    
    for (const firmId of firmIds) {
      // Get accounts for this firm
      const firmAccounts = await db
        .select()
        .from(accounts)
        .where(eq(accounts.firmId, firmId));
      accountsResult.push(...firmAccounts);

      // Get active promotions for this firm
      const firmPromotions = await db
        .select()
        .from(promotions)
        .where(and(
          eq(promotions.firmId, firmId),
          eq(promotions.active, true),
          or(
            isNull(promotions.startsAt),
            lte(promotions.startsAt, new Date())
          ),
          gte(promotions.endsAt, new Date())
        ));
      promotionsResult.push(...firmPromotions);
    }

    // Group by firm
    const firmMap = new Map<string, FirmWithDetails>();

    for (const firm of firmsResult) {
      const firmAccounts = accountsResult.filter(a => a.firmId === firm.id);
      const firmPromotions = promotionsResult.filter(p => p.firmId === firm.id);
      
      const activePromotion = firmPromotions[0];
      const currentDiscount = activePromotion ? Number(activePromotion.discountPct) : 0;
      
      const primaryAccount = firmAccounts.find(a => accountSize ? a.sizeUsd === accountSize : true) || firmAccounts[0];
      const basePrice = primaryAccount ? Number(primaryAccount.basePrice) : 0;
      const finalPrice = basePrice * (1 - currentDiscount / 100);

      firmMap.set(firm.id, {
        ...firm,
        accounts: firmAccounts.map(account => ({
          ...account,
          currentPrice: Number(account.basePrice) * (1 - currentDiscount / 100),
        })),
        promotions: firmPromotions,
        currentDiscount,
        finalPrice,
        countdownEndTime: activePromotion?.endsAt?.toISOString(),
      });
    }

    return Array.from(firmMap.values());
  }

  async getFirmBySlug(slug: string, locale: string = 'en'): Promise<FirmWithDetails | undefined> {
    try {
      console.log(`getFirmBySlug called with slug: ${slug}, locale: ${locale}`);
      
      // First get the firm
      const firmResult = await db
        .select()
        .from(firms)
        .where(and(eq(firms.slug, slug), eq(firms.active, true)))
        .limit(1);

      if (!firmResult.length) {
        console.log(`No firm found with slug: ${slug}`);
        return undefined;
      }

      const firm = firmResult[0];
      console.log(`Found firm: ${firm.name} (${firm.id})`);

      // Get accounts for this firm
      const accountsResult = await db
        .select()
        .from(accounts)
        .where(eq(accounts.firmId, firm.id));

      // Get active promotions for this firm
      const promotionsResult = await db
        .select()
        .from(promotions)
        .where(and(
          eq(promotions.firmId, firm.id),
          eq(promotions.active, true),
          or(
            isNull(promotions.startsAt),
            lte(promotions.startsAt, new Date())
          ),
          gte(promotions.endsAt, new Date())
        ));

      const activePromotion = promotionsResult[0];
      const currentDiscount = activePromotion ? Number(activePromotion.discountPct) : 0;

      console.log(`Firm has ${accountsResult.length} accounts and ${promotionsResult.length} promotions`);

      return {
        ...firm,
        accounts: accountsResult.map(account => ({
          ...account,
          currentPrice: Number(account.basePrice) * (1 - currentDiscount / 100),
        })),
        promotions: promotionsResult,
        currentDiscount,
        finalPrice: accountsResult.length > 0 ? Number(accountsResult[0].basePrice) * (1 - currentDiscount / 100) : 0,
        countdownEndTime: activePromotion?.endsAt?.toISOString(),
      };
    } catch (error) {
      console.error('Error in getFirmBySlug:', error);
      throw error;
    }
  }

  async getFirmById(id: string): Promise<Firm | undefined> {
    const [result] = await db.select().from(firms).where(eq(firms.id, id));
    return result;
  }

  async createFirm(firmData: InsertFirm): Promise<Firm> {
    const [firm] = await db.insert(firms).values(firmData as any).returning();
    return firm;
  }

  async updateFirm(id: string, firmData: Partial<InsertFirm>): Promise<Firm> {
    const [firm] = await db
      .update(firms)
      .set(firmData as any)
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
    const [account] = await db.insert(accounts).values(accountData).returning();
    return account;
  }

  async updateAccount(id: string, accountData: Partial<InsertAccount>): Promise<Account> {
    const [account] = await db
      .update(accounts)
      .set(accountData)
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
    const [promotion] = await db.insert(promotions).values(promotionData).returning();
    return promotion;
  }

  async updatePromotion(id: string, promotionData: Partial<InsertPromotion>): Promise<Promotion> {
    const [promotion] = await db
      .update(promotions)
      .set(promotionData)
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

  async getReviewsByFirmSlug(slug: string, options: {
    stars?: string;
    sort?: string;
  } = {}): Promise<{ reviews: any[]; stats: any }> {
    try {
      // Get firm details first
      const [firm] = await db.select().from(firms).where(eq(firms.slug, slug));
      
      if (!firm) {
        return { reviews: [], stats: { averageStars: 0, totalReviews: 0, distribution: {}, trustScore: 0 } };
      }

      // For now, return mock data since we need Trustpilot API integration
      // In a real implementation, this would fetch from Trustpilot API using firm.trustpilotBusinessId
      const mockReviews = [
        {
          id: "1",
          title: "Great trading experience",
          text: "I've been trading with this firm for 6 months now and the experience has been excellent. Fast payouts and good customer support.",
          stars: 5,
          createdAt: "2024-01-15T10:30:00Z",
          consumer: {
            displayName: "TradingPro123",
            countryCode: "US"
          },
          businessReply: {
            text: "Thank you for your positive feedback! We're glad to hear about your success.",
            createdAt: "2024-01-16T09:15:00Z"
          }
        },
        {
          id: "2", 
          title: "Professional platform",
          text: "The platform is very professional and user-friendly. The evaluation process was clear and fair.",
          stars: 4,
          createdAt: "2024-01-10T14:20:00Z",
          consumer: {
            displayName: "ForexTrader88",
            countryCode: "GB"
          }
        },
        {
          id: "3",
          title: "Good but could be better",
          text: "Overall good experience but the spreads could be tighter during news events.",
          stars: 3,
          createdAt: "2024-01-05T16:45:00Z",
          consumer: {
            displayName: "SwingTrader",
            countryCode: "CA"
          }
        }
      ];

      const mockStats = {
        averageStars: 4.1,
        totalReviews: 156,
        distribution: {
          "5": 78,
          "4": 45,
          "3": 20,
          "2": 8,
          "1": 5
        },
        trustScore: 85
      };

      // Apply filters
      let filteredReviews = mockReviews;
      
      if (options.stars && options.stars !== 'all') {
        const targetStars = parseInt(options.stars);
        filteredReviews = mockReviews.filter(review => review.stars === targetStars);
      }

      // Apply sorting
      switch (options.sort) {
        case 'oldest':
          filteredReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case 'highest':
          filteredReviews.sort((a, b) => b.stars - a.stars);
          break;
        case 'lowest':
          filteredReviews.sort((a, b) => a.stars - b.stars);
          break;
        case 'newest':
        default:
          filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }

      return { reviews: filteredReviews, stats: mockStats };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return { reviews: [], stats: { averageStars: 0, totalReviews: 0, distribution: {}, trustScore: 0 } };
    }
  }
}

export const storage = new DatabaseStorage();
