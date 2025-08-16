import { db } from "./db";
import { firms, accounts, promotions } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await db.delete(promotions);
    await db.delete(accounts);
    await db.delete(firms);

    // Real prop firm data
    const sampleFirms = [
      {
        name: "FTMO",
        slug: "ftmo",
        websiteUrl: "https://ftmo.com",
        logoUrl: null,
        earliestPayoutDays: 14,
        payoutSplit: "80/20",
        platforms: ["MetaTrader4", "MetaTrader5"],
        countryNotes: "Worldwide except USA",
        rating: "4.8",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://ftmo.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        trustpilotUrl: "https://www.trustpilot.com/review/ftmo.com",
        trustpilotBusinessId: "5c8b4c4e68a7dd0001d4f123",
        descriptionEn: "One of the most established prop trading firms with a proven track record and transparent evaluation process.",
        descriptionKo: "투명한 평가 프로세스와 검증된 실적을 가진 가장 확립된 프롭 트레이딩 회사 중 하나입니다.",
        descriptionJa: "透明な評価プロセスと実績のある、最も確立されたプロップトレーディング会社の一つです。",
        descriptionHi: "पारदर्शी मूल्यांकन प्रक्रिया और सिद्ध ट्रैक रिकॉर्ड के साथ सबसे स्थापित प्रॉप ट्रेडिंग फर्मों में से एक।",
        evaluationSteps: 2,
        maxDailyLoss: "5%",
        maxTotalLoss: "10%", 
        profitTarget: "10%",
        minTradingDays: 10,
        consistencyRule: "No single day can exceed 50% of total profit",
        activationFee: 99.00,
        rulesEn: {
          "Daily Drawdown": "5%",
          "Max Drawdown": "10%",
          "Profit Target": "10%",
          "Min Trading Days": "10",
          "News Trading": "Allowed",
          "Weekend Holding": "Allowed",
          "Scaling": "Up to $2M"
        },
        rulesKo: {
          "일일 손실한도": "5%",
          "최대 손실한도": "10%",
          "수익 목표": "10%",
          "최소 거래일": "10일",
          "뉴스 거래": "허용",
          "주말 보유": "허용",
          "스케일링": "최대 $2M"
        },
        featured: true,
        active: true,
      },
      {
        name: "Topstep",
        slug: "topstep",
        websiteUrl: "https://www.topstep.com",
        logoUrl: null,
        earliestPayoutDays: 14,
        payoutSplit: "90/10",
        platforms: ["NinjaTrader", "Sierra Chart", "TradingView"],
        countryNotes: "Worldwide",
        rating: "4.3",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://www.topstep.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        trustpilotUrl: "https://www.trustpilot.com/review/topstep.com",
        trustpilotBusinessId: "5c8b4c4e68a7dd0001d4f890",
        descriptionEn: "Leading futures prop trading firm with comprehensive evaluation programs and excellent trader support.",
        descriptionKo: "포괄적인 평가 프로그램과 우수한 트레이더 지원을 제공하는 선도적인 선물 프롭 트레이딩 회사입니다.",
        descriptionJa: "包括的な評価プログラムと優れたトレーダーサポートを提供する主要な先物プロップトレーディング会社です。",
        descriptionHi: "व्यापक मूल्यांकन कार्यक्रमों और उत्कृष्ट ट्रेडर सहायता के साथ अग्रणी फ्यूचर्स प्रॉप ट्रेडिंग फर्म।",
        evaluationSteps: 2,
        maxDailyLoss: "5%",
        maxTotalLoss: "10%",
        profitTarget: "10%",
        minTradingDays: 10,
        consistencyRule: "Consistent performance required",
        activationFee: 165.00,
        rulesEn: {
          "Daily Drawdown": "5%",
          "Max Drawdown": "10%",
          "Profit Target": "10%",
          "Min Trading Days": "10",
          "News Trading": "Allowed",
          "Weekend Holding": "Not Allowed",
          "Scaling": "Up to $1.5M"
        },
        featured: true,
        active: true,
      },
      {
        name: "The Funded Trader",
        slug: "the-funded-trader",
        websiteUrl: "https://thefundedtrader.com",
        logoUrl: null,
        earliestPayoutDays: 7,
        payoutSplit: "90/10",
        platforms: ["MetaTrader4", "MetaTrader5", "cTrader"],
        countryNotes: "Worldwide",
        rating: "4.6",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://thefundedtrader.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        descriptionEn: "Offering one of the highest profit splits in the industry with fast payouts and flexible trading rules.",
        descriptionKo: "업계에서 가장 높은 수익 분할과 빠른 지급, 유연한 거래 규칙을 제공합니다.",
        descriptionJa: "業界で最も高い利益分配と迅速な支払い、柔軟な取引ルールを提供しています。",
        descriptionHi: "उद्योग में सबसे अधिक लाभ बांटने और तेज़ भुगतान तथा लचीले ट्रेडिंग नियमों के साथ।",
        evaluationSteps: 1,
        maxDailyLoss: "5%",
        maxTotalLoss: "12%",
        profitTarget: "8%", 
        minTradingDays: 5,
        consistencyRule: "Maximum 10 trading days",
        activationFee: 149.00,
        rulesEn: {
          "Daily Drawdown": "5%",
          "Max Drawdown": "12%",
          "Profit Target": "8%",
          "Min Trading Days": "5",
          "News Trading": "Restricted",
          "Weekend Holding": "Allowed",
          "Scaling": "Up to $1M"
        },
        featured: false,
        active: true,
      },
      {
        name: "TopstepFX",
        slug: "topstepfx",
        websiteUrl: "https://topstepfx.com",
        logoUrl: null,
        earliestPayoutDays: 5,
        payoutSplit: "80/20",
        platforms: ["MetaTrader4", "MetaTrader5"],
        countryNotes: "Limited countries",
        rating: "4.7",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://topstepfx.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        trustpilotUrl: "https://www.trustpilot.com/review/topstep.com",
        trustpilotBusinessId: "5c8b4c4e68a7dd0001d4f567",
        descriptionEn: "Known for the fastest payouts in the industry and comprehensive trader education programs.",
        descriptionKo: "업계에서 가장 빠른 지급과 포괄적인 트레이더 교육 프로그램으로 유명합니다.",
        descriptionJa: "業界最速の支払いと包括的なトレーダー教育プログラムで知られています。",
        descriptionHi: "उद्योग में सबसे तेज़ भुगतान और व्यापक ट्रेडर शिक्षा कार्यक्रमों के लिए जाना जाता है।",
        evaluationSteps: 2,
        maxDailyLoss: "4%",
        maxTotalLoss: "8%",
        profitTarget: "6%",
        minTradingDays: 7,
        consistencyRule: "5 days minimum trading period",
        activationFee: 79.00,
        rulesEn: {
          "Daily Drawdown": "4%",
          "Max Drawdown": "8%",
          "Profit Target": "6%",
          "Min Trading Days": "7",
          "News Trading": "Allowed",
          "Weekend Holding": "Not Allowed",
          "Scaling": "Up to $500K"
        },
        featured: true,
        active: true,
      },
      {
        name: "Funded Next",
        slug: "funded-next",
        websiteUrl: "https://fundednext.com",
        logoUrl: null,
        earliestPayoutDays: 10,
        payoutSplit: "85/15",
        platforms: ["MetaTrader4", "MetaTrader5"],
        countryNotes: "Most countries",
        rating: "4.5",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://fundednext.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        descriptionEn: "Competitive pricing with straightforward evaluation process and reliable funding.",
        descriptionKo: "경쟁력 있는 가격과 간단한 평가 프로세스, 신뢰할 수 있는 자금 지원을 제공합니다.",
        descriptionJa: "競争力のある価格設定と分かりやすい評価プロセス、信頼できる資金提供を行っています。",
        descriptionHi: "प्रतिस्पर्धी मूल्य निर्धारण के साथ सीधी मूल्यांकन प्रक्रिया और विश्वसनीय फंडिंग।",
        evaluationSteps: 2,
        maxDailyLoss: "5%",
        maxTotalLoss: "10%",
        profitTarget: "10%",
        minTradingDays: 8,
        consistencyRule: "Best 5 trading days rule",
        activationFee: 120.00,
        rulesEn: {
          "Daily Drawdown": "5%",
          "Max Drawdown": "10%",
          "Profit Target": "10%",
          "Min Trading Days": "8",
          "News Trading": "Allowed",
          "Weekend Holding": "Allowed",
          "Scaling": "Up to $1M"
        },
        featured: false,
        active: true,
      },
      {
        name: "MyForexFunds",
        slug: "myforexfunds",
        websiteUrl: "https://myforexfunds.com",
        logoUrl: null,
        earliestPayoutDays: 14,
        payoutSplit: "85/15",
        platforms: ["MetaTrader4", "MetaTrader5", "cTrader"],
        countryNotes: "Global",
        rating: "4.4",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://myforexfunds.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        descriptionEn: "Flexible trading conditions with multiple account types and competitive profit splits.",
        descriptionKo: "여러 계좌 유형과 경쟁력 있는 수익 분할로 유연한 거래 조건을 제공합니다.",
        descriptionJa: "複数のアカウントタイプと競争力のある利益分配で柔軟な取引条件を提供しています。",
        descriptionHi: "कई खाता प्रकारों और प्रतिस्पर्धी लाभ बंटवारे के साथ लचीली ट्रेडिंग शर्तें।",
        evaluationSteps: 1,
        maxDailyLoss: "5%",
        maxTotalLoss: "12%",
        profitTarget: "8%",
        minTradingDays: 10,
        consistencyRule: "No consistency rule",
        activationFee: 199.00,
        rulesEn: {
          "Daily Drawdown": "5%",
          "Max Drawdown": "12%",
          "Profit Target": "8%",
          "Min Trading Days": "10",
          "News Trading": "Restricted",
          "Weekend Holding": "Allowed",
          "Scaling": "Up to $2M"
        },
        featured: false,
        active: true,
      },
      {
        name: "Apex Trader Funding",
        slug: "apex-trader-funding",
        websiteUrl: "https://apextraderfunding.com",
        logoUrl: null,
        earliestPayoutDays: 7,
        payoutSplit: "90/10",
        platforms: ["Rithmic", "TradingView"],
        countryNotes: "USA focused",
        rating: "4.3",
        referralLink: process.env.DEFAULT_REFERRAL_URL || "https://apextraderfunding.com",
        couponCode: process.env.DEFAULT_COUPON_CODE || "PROPRANK",
        descriptionEn: "Futures-focused prop firm with excellent technology and competitive pricing for US traders.",
        descriptionKo: "미국 트레이더를 위한 우수한 기술과 경쟁력 있는 가격의 선물 중심 프롭 회사입니다.",
        descriptionJa: "米国のトレーダー向けの優れた技術と競争力のある価格設定の先物中心のプロップ会社です。",
        descriptionHi: "अमेरिकी व्यापारियों के लिए उत्कृष्ट तकनीक और प्रतिस्पर्धी मूल्य निर्धारण के साथ वायदा-केंद्रित प्रॉप फर्म।",
        evaluationSteps: 1,
        maxDailyLoss: "$3,000",
        maxTotalLoss: "$6,000",
        profitTarget: "$3,000",
        minTradingDays: 5,
        consistencyRule: "Futures trading focused",
        activationFee: 165.00,
        rulesEn: {
          "Daily Drawdown": "$3,000",
          "Max Drawdown": "$6,000",
          "Profit Target": "$3,000",
          "Min Trading Days": "5",
          "News Trading": "Allowed",
          "Weekend Holding": "Not Allowed",
          "Scaling": "Up to $300K"
        },
        featured: false,
        active: true,
      }
    ];

    console.log("📊 Creating firms...");
    const createdFirms = await db.insert(firms).values(sampleFirms).returning();
    console.log(`✅ Created ${createdFirms.length} firms`);

    // Sample accounts for each firm with realistic pricing
    const accountConfigs = [
      { size: 10000, prices: { ftmo: 155, tft: 179, topstep: 139, fundednext: 89, mff: 99, apex: 197 } },
      { size: 25000, prices: { ftmo: 345, tft: 379, topstep: 289, fundednext: 179, mff: 199, apex: 347 } },
      { size: 50000, prices: { ftmo: 549, tft: 599, topstep: 449, fundednext: 289, mff: 349, apex: 497 } },
      { size: 100000, prices: { ftmo: 1080, tft: 1199, topstep: 899, fundednext: 549, mff: 649, apex: 847 } },
      { size: 200000, prices: { ftmo: 2160, tft: 2399, topstep: 1799, fundednext: 1099, mff: 1299, apex: 1597 } }
    ];

    console.log("💰 Creating accounts...");
    const accountsToCreate = [];
    
    for (const firm of createdFirms) {
      const firmKey = firm.slug.replace(/-/g, '').substring(0, 8);
      
      for (const config of accountConfigs) {
        const priceKey = firmKey.includes('ftmo') ? 'ftmo' :
                        firmKey.includes('funded') ? 'tft' :
                        firmKey.includes('topstep') ? 'topstep' :
                        firmKey.includes('next') ? 'fundednext' :
                        firmKey.includes('forex') ? 'mff' : 'apex';
        
        const basePrice = config.prices[priceKey as keyof typeof config.prices] || config.prices.ftmo;
        
        accountsToCreate.push({
          firmId: firm.id,
          sizeUsd: config.size,
          basePrice: basePrice.toString(),
          currency: "USD",
          earliestPayoutDays: firm.earliestPayoutDays,
          payoutSplit: firm.payoutSplit,
          active: true,
        });
      }
    }

    const createdAccounts = await db.insert(accounts).values(accountsToCreate).returning();
    console.log(`✅ Created ${createdAccounts.length} accounts`);

    // Create realistic active promotions
    console.log("🎯 Creating promotions...");
    const now = new Date();
    const promotionsToCreate = [
      {
        firmId: createdFirms[0].id, // FTMO
        title: "Flash Sale",
        discountPct: "20.00",
        startsAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // Started 1 hour ago
        endsAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Ends in 2 days
        couponCode: "PROP20",
        landingUrl: null,
        titleEn: "Flash Sale - 20% Off",
        titleKo: "플래시 세일 - 20% 할인",
        titleJa: "フラッシュセール - 20% オフ",
        titleHi: "फ्लैश सेल - 20% छूट",
        active: true,
      },
      {
        firmId: createdFirms[1].id, // The Funded Trader
        title: "Limited Time Offer",
        discountPct: "20.00",
        startsAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Started 2 days ago
        endsAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Ends in 5 days
        couponCode: "SAVE20",
        landingUrl: null,
        titleEn: "Limited Time Offer",
        titleKo: "한정 시간 제안",
        titleJa: "期間限定オファー",
        titleHi: "सीमित समय ऑफर",
        active: true,
      },
      {
        firmId: createdFirms[2].id, // TopstepFX
        title: "Today Only Special",
        discountPct: "20.00",
        startsAt: new Date(now.getTime() - 6 * 60 * 60 * 1000), // Started 6 hours ago
        endsAt: new Date(now.getTime() + 18 * 60 * 60 * 1000), // Ends in 18 hours
        couponCode: "FLASH20",
        landingUrl: null,
        titleEn: "Today Only Special",
        titleKo: "오늘만 특가",
        titleJa: "本日限定スペシャル",
        titleHi: "केवल आज विशेष",
        active: true,
      },
      {
        firmId: createdFirms[4].id, // MyForexFunds
        title: "Weekend Deal",
        discountPct: "15.00",
        startsAt: new Date(now.getTime() - 12 * 60 * 60 * 1000), // Started 12 hours ago
        endsAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Ends in 3 days
        couponCode: "WEEKEND15",
        landingUrl: null,
        titleEn: "Weekend Deal - 15% Off",
        titleKo: "주말 딜 - 15% 할인",
        titleJa: "週末ディール - 15% オフ",
        titleHi: "सप्ताहांत डील - 15% छूट",
        active: true,
      }
    ];

    const createdPromotions = await db.insert(promotions).values(promotionsToCreate).returning();
    console.log(`✅ Created ${createdPromotions.length} promotions`);

    console.log("🎉 Database seeded successfully!");
    console.log(`📊 Summary:
    - Firms: ${createdFirms.length}
    - Accounts: ${createdAccounts.length}
    - Promotions: ${createdPromotions.length}`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log("✅ Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}

export { seed };
