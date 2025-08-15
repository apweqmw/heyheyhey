import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  decimal,
  integer,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const firms = pgTable("firms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  websiteUrl: text("website_url").notNull(),
  logoUrl: text("logo_url"),
  earliestPayoutDays: integer("earliest_payout_days"),
  payoutSplit: varchar("payout_split"), // e.g., "80/20"
  platforms: jsonb("platforms").$type<string[]>().default([]), // e.g., ["MetaTrader5","cTrader"]
  countryNotes: text("country_notes"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  referralLink: text("referral_link"),
  couponCode: varchar("coupon_code"),
  
  // Trading evaluation details
  evaluationSteps: integer("evaluation_steps").default(2), // Usually 1 or 2 step process
  maxDailyLoss: varchar("max_daily_loss"), // e.g., "5%" or "$2,000"
  maxTotalLoss: varchar("max_total_loss"), // e.g., "10%" or "$5,000"
  profitTarget: varchar("profit_target"), // e.g., "10%" or "$10,000"
  minTradingDays: integer("min_trading_days"),
  consistencyRule: text("consistency_rule"), // Description of consistency requirements
  activationFee: decimal("activation_fee", { precision: 10, scale: 2 }), // Fee to activate funded account
  
  // Localized descriptions
  descriptionEn: text("description_en"),
  descriptionKo: text("description_ko"),
  descriptionJa: text("description_ja"),
  descriptionHi: text("description_hi"),
  
  // Rules content (stored as JSON for structured data)
  rulesEn: jsonb("rules_en").$type<Record<string, any>>(),
  rulesKo: jsonb("rules_ko").$type<Record<string, any>>(),
  rulesJa: jsonb("rules_ja").$type<Record<string, any>>(),
  rulesHi: jsonb("rules_hi").$type<Record<string, any>>(),
  
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firmId: varchar("firm_id").notNull().references(() => firms.id, { onDelete: "cascade" }),
  sizeUsd: integer("size_usd").notNull(), // 10000, 25000, etc.
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("USD"),
  
  // Denormalized for fast sorting
  earliestPayoutDays: integer("earliest_payout_days"),
  payoutSplit: varchar("payout_split"),
  
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const promotions = pgTable("promotions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firmId: varchar("firm_id").notNull().references(() => firms.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  discountPct: decimal("discount_pct", { precision: 5, scale: 2 }).notNull(), // 0-100
  startsAt: timestamp("starts_at"),
  endsAt: timestamp("ends_at").notNull(),
  couponCode: varchar("coupon_code"),
  landingUrl: text("landing_url"),
  
  // Localized titles and descriptions
  titleEn: text("title_en"),
  titleKo: text("title_ko"),
  titleJa: text("title_ja"),
  titleHi: text("title_hi"),
  
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accountPrices = pgTable("account_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").notNull().references(() => accounts.id, { onDelete: "cascade" }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  effectiveAt: timestamp("effective_at").defaultNow(),
});

// Relations
export const firmRelations = relations(firms, ({ many }) => ({
  accounts: many(accounts),
  promotions: many(promotions),
}));

export const accountRelations = relations(accounts, ({ one, many }) => ({
  firm: one(firms, {
    fields: [accounts.firmId],
    references: [firms.id],
  }),
  prices: many(accountPrices),
}));

export const promotionRelations = relations(promotions, ({ one }) => ({
  firm: one(firms, {
    fields: [promotions.firmId],
    references: [firms.id],
  }),
}));

export const accountPriceRelations = relations(accountPrices, ({ one }) => ({
  account: one(accounts, {
    fields: [accountPrices.accountId],
    references: [accounts.id],
  }),
}));

// Insert schemas
export const insertFirmSchema = createInsertSchema(firms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type Firm = typeof firms.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Promotion = typeof promotions.$inferSelect;
export type AccountPrice = typeof accountPrices.$inferSelect;

export type InsertFirm = z.infer<typeof insertFirmSchema>;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;

// Extended types for API responses
export type FirmWithDetails = Firm & {
  accounts: (Account & { currentPrice?: number })[];
  promotions: Promotion[];
  currentDiscount?: number;
  finalPrice?: number;
  countdownEndTime?: string;
};
