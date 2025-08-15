import { db } from './db';
import { firms, accounts, promotions, type Firm, type Account, type Promotion, type InsertFirm } from '@/shared/schema';
import { eq, and, lte, desc, asc, ilike } from 'drizzle-orm';

export interface FirmFilters {
  accountSize?: number;
  platform?: string;
  maxPayoutDays?: number;
  sort?: string;
}

export interface IStorage {
  // Firm operations
  getFirms(filters?: FirmFilters): Promise<(Firm & { accounts: Account[]; promotions: Promotion[] })[]>;
  getFirm(id: string): Promise<(Firm & { accounts: Account[]; promotions: Promotion[] }) | null>;
  createFirm(firm: InsertFirm): Promise<Firm>;
  updateFirm(id: string, updates: Partial<InsertFirm>): Promise<Firm | null>;
  deleteFirm(id: string): Promise<boolean>;
}

class DatabaseStorage implements IStorage {
  async getFirms(filters?: FirmFilters) {
    let query = db.select().from(firms);

    if (filters) {
      const conditions = [];
      
      if (filters.accountSize) {
        // Filter firms that have accounts with this size
        const firmsWithAccountSize = db
          .select({ firmId: accounts.firmId })
          .from(accounts)
          .where(eq(accounts.size, filters.accountSize));
        
        conditions.push(eq(firms.id, firmsWithAccountSize));
      }
      
      if (filters.platform) {
        conditions.push(ilike(firms.platforms, `%${filters.platform}%`));
      }
      
      if (filters.maxPayoutDays) {
        conditions.push(lte(firms.maxPayoutDays, filters.maxPayoutDays));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }

    // Apply sorting
    if (filters?.sort) {
      switch (filters.sort) {
        case 'name':
          query = query.orderBy(asc(firms.name));
          break;
        case 'rating':
          query = query.orderBy(desc(firms.rating));
          break;
        case 'lowestPrice':
          query = query.orderBy(asc(firms.minAccountSize));
          break;
        case 'fastestPayout':
          query = query.orderBy(asc(firms.maxPayoutDays));
          break;
        case 'bestDiscount':
          // This would need to be calculated from promotions
          query = query.orderBy(desc(firms.rating));
          break;
        default:
          query = query.orderBy(asc(firms.name));
      }
    } else {
      query = query.orderBy(asc(firms.name));
    }

    const firmsResult = await query;

    // Get related accounts and promotions for each firm
    const firmsWithRelations = await Promise.all(
      firmsResult.map(async (firm) => {
        const firmAccounts = await db
          .select()
          .from(accounts)
          .where(eq(accounts.firmId, firm.id));

        const firmPromotions = await db
          .select()
          .from(promotions)
          .where(eq(promotions.firmId, firm.id));

        return {
          ...firm,
          accounts: firmAccounts,
          promotions: firmPromotions,
        };
      })
    );

    return firmsWithRelations;
  }

  async getFirm(id: string) {
    const [firm] = await db
      .select()
      .from(firms)
      .where(eq(firms.id, id));

    if (!firm) return null;

    const firmAccounts = await db
      .select()
      .from(accounts)
      .where(eq(accounts.firmId, firm.id));

    const firmPromotions = await db
      .select()
      .from(promotions)
      .where(eq(promotions.firmId, firm.id));

    return {
      ...firm,
      accounts: firmAccounts,
      promotions: firmPromotions,
    };
  }

  async createFirm(firmData: InsertFirm): Promise<Firm> {
    const [newFirm] = await db
      .insert(firms)
      .values(firmData)
      .returning();
    
    return newFirm;
  }

  async updateFirm(id: string, updates: Partial<InsertFirm>): Promise<Firm | null> {
    const [updatedFirm] = await db
      .update(firms)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(firms.id, id))
      .returning();
    
    return updatedFirm || null;
  }

  async deleteFirm(id: string): Promise<boolean> {
    // Delete related accounts and promotions first
    await db.delete(accounts).where(eq(accounts.firmId, id));
    await db.delete(promotions).where(eq(promotions.firmId, id));
    
    const [deletedFirm] = await db
      .delete(firms)
      .where(eq(firms.id, id))
      .returning();
    
    return !!deletedFirm;
  }
}

export const storage = new DatabaseStorage();