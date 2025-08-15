import React, { createContext, useContext, useState, useEffect } from "react";

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translation keys and their values
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.rankings': 'Rankings',
    'nav.reviews': 'Reviews',
    'nav.guides': 'Guides',
    'nav.news': 'News',
    
    // Header
    'header.searchPlaceholder': 'Search firms...',
    
    // Home page
    'home.title': 'Best Prop Trading Firms 2024',
    'home.subtitle': 'Compare {{count}} prop firms with exclusive discount codes and real-time pricing.',
    'home.seo.title': 'Best Prop Trading Firms 2024 - Compare Prices & Discounts | PropFirmMentor',
    'home.seo.description': 'Compare the best prop trading firms with exclusive discount codes and real-time pricing. Find your perfect trading challenge with our comprehensive ranking.',
    
    // Firm detail
    'firmDetail.seo.title': '{{firmName}} Review & Discount Codes | PropFirmMentor',
    'firmDetail.seo.description': 'Get the latest {{firmName}} discount codes, pricing, and trading rules. Compare account sizes and find the best deal.',
    'firmDetail.rules.title': 'Trading Rules & Requirements',
    'firmDetail.rules.noRules': 'Trading rules not available',
    'firmDetail.pricing.title': 'Account Sizes & Pricing',
    'firmDetail.referral.title': 'Exclusive Offers',
    'firmDetail.referral.couponCode': 'Coupon Code',
    'firmDetail.referral.limitedOffer': 'Limited Time Offer',
    'firmDetail.referral.endsIn': 'Ends in',
    'firmDetail.referral.getChallenge': 'Get Challenge',
    'firmDetail.referral.disclosure': 'We may earn a commission if you purchase through our links.',
    'firmDetail.stats.title': 'Quick Stats',
    'firmDetail.stats.totalSavings': 'Total Savings Available',
    'firmDetail.stats.avgDiscount': 'Average Discount',
    'firmDetail.stats.accountSizes': 'Account Sizes Available',
    
    // Table headers
    'table.firm': 'Firm',
    'table.accountSize': 'Account Size',
    'table.price': 'Price',
    'table.discount': 'Discount',
    'table.payout': 'Payout',
    'table.action': 'Action',
    'table.basePrice': 'Base Price',
    'table.finalPrice': 'Final Price',
    
    // Labels
    'labels.featured': 'FEATURED',
    'labels.challenge': 'Challenge',
    'labels.split': 'Split',
    'labels.code': 'Code',
    'labels.none': 'None',
    'labels.noDiscount': 'No discount',
    'labels.endsIn': 'Ends in',
    'labels.payout': 'payout',
    'labels.platforms': 'Platforms',
    'labels.rating': 'Rating',
    'labels.payoutSplit': 'Payout Split',
    
    // Actions
    'actions.getChallenge': 'Get Challenge',
    'actions.loadMore': 'Load More Firms',
    
    // Filters and sorting
    'filters.title': 'Filters',
    'filters.accountSize': 'Account Size',
    'filters.platform': 'Platform',
    'filters.payout': 'Payout',
    'filters.selectAccountSize': 'Select Account Size',
    'filters.selectPlatform': 'Select Platform',
    'filters.maxPayoutDays': 'Maximum Payout Days',
    'sort.sortBy': 'Sort by',
    'sort.bestDiscount': 'Best Discount',
    'sort.lowestPrice': 'Lowest Price',
    'sort.highestPrice': 'Highest Price',
    'sort.fastestPayout': 'Fastest Payout',
    'sort.highestRated': 'Highest Rated',
    
    // Stats
    'stats.avgDiscount': 'Avg Discount',
    'stats.activeDeals': 'Active Deals',
    'stats.avgSavings': 'Average Savings',
    'stats.vsLastMonth': '12% vs last month',
    'stats.bestDiscount': 'Best Discount Available',
    'stats.limited': 'Limited time',
    'stats.usersThisMonth': 'Users This Month',
    'stats.activeCommunity': 'Active community',
    
    // CTA Section
    'cta.title': 'Never Miss a Deal Again',
    'cta.subtitle': 'Get notified when new promotions and discounts become available. Join 2,400+ traders saving money.',
    'cta.emailPlaceholder': 'Enter your email...',
    'cta.subscribe': 'Subscribe',
    'cta.weeklyUpdates': 'Weekly updates',
    'cta.exclusiveDeals': 'Exclusive deals',
    'cta.noSpam': 'No spam',
    
    // Footer
    'footer.description': 'The most comprehensive prop firm comparison platform. Find the best deals and discounts.',
    'footer.navigation': 'Navigation',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.tradingRules': 'Trading Rules',
    'footer.payoutComparison': 'Payout Comparison',
    'footer.platformGuide': 'Platform Guide',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.disclaimer': 'Disclaimer',
    'footer.copyright': '© 2024 PropRank. All rights reserved.',
    'footer.operational': 'All systems operational',
    
    // Listing
    'listing.noResults': 'No firms found',
    'listing.tryDifferentFilters': 'Try adjusting your filters or search terms.',
    'listing.showingCount': 'Showing {{count}} firms',
    
    // Countdown
    'countdown.expired': 'Expired',
    
    // Clipboard
    'clipboard.success': 'Copied!',
    'clipboard.copied': 'Copied "{{text}}" to clipboard',
    'clipboard.error': 'Copy failed',
    'clipboard.failed': 'Failed to copy to clipboard',
    
    // Errors
    'errors.loadFailed': 'Failed to load data',
    'errors.tryAgain': 'Please try again later.',
    'errors.firmNotFound': 'Firm not found',
    'errors.checkUrl': 'Please check the URL and try again.',
  },
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.rankings': '순위',
    'nav.reviews': '리뷰',
    'nav.guides': '가이드',
    'nav.news': '뉴스',
    
    // Header
    'header.searchPlaceholder': '회사 검색...',
    
    // Home page
    'home.title': '2024 최고의 프롭 트레이딩 회사',
    'home.subtitle': '독점 할인 코드와 실시간 가격으로 {{count}}개의 프롭 회사를 비교하세요.',
    'home.seo.title': '2024 최고의 프롭 트레이딩 회사 - 가격 및 할인 비교 | PropRank',
    'home.seo.description': '독점 할인 코드와 실시간 가격으로 최고의 프롭 트레이딩 회사를 비교하세요.',
    
    // Firm detail
    'firmDetail.seo.title': '{{firmName}} 리뷰 및 할인 코드 | PropRank',
    'firmDetail.seo.description': '최신 {{firmName}} 할인 코드, 가격 및 거래 규칙을 확인하세요.',
    'firmDetail.rules.title': '거래 규칙 및 요구사항',
    'firmDetail.rules.noRules': '거래 규칙을 사용할 수 없습니다',
    'firmDetail.pricing.title': '계좌 크기 및 가격',
    'firmDetail.referral.title': '독점 혜택',
    'firmDetail.referral.couponCode': '쿠폰 코드',
    'firmDetail.referral.limitedOffer': '한정 시간 제안',
    'firmDetail.referral.endsIn': '종료까지',
    'firmDetail.referral.getChallenge': '챌린지 받기',
    'firmDetail.referral.disclosure': '링크를 통해 구매하시면 수수료를 받을 수 있습니다.',
    'firmDetail.stats.title': '빠른 통계',
    'firmDetail.stats.totalSavings': '총 절약 가능 금액',
    'firmDetail.stats.avgDiscount': '평균 할인',
    'firmDetail.stats.accountSizes': '사용 가능한 계좌 크기',
    
    // Table headers
    'table.firm': '회사',
    'table.accountSize': '계좌 크기',
    'table.price': '가격',
    'table.discount': '할인',
    'table.payout': '지급',
    'table.action': '액션',
    'table.basePrice': '기본 가격',
    'table.finalPrice': '최종 가격',
    
    // Labels
    'labels.featured': '추천',
    'labels.challenge': '챌린지',
    'labels.split': '분할',
    'labels.code': '코드',
    'labels.none': '없음',
    'labels.noDiscount': '할인 없음',
    'labels.endsIn': '종료까지',
    'labels.payout': '지급',
    'labels.platforms': '플랫폼',
    'labels.rating': '평점',
    'labels.payoutSplit': '지급 분할',
    
    // Actions
    'actions.getChallenge': '챌린지 받기',
    'actions.loadMore': '더 보기',
    
    // Filters and sorting
    'filters.title': '필터',
    'filters.accountSize': '계좌 크기',
    'filters.platform': '플랫폼',
    'filters.payout': '지급',
    'filters.selectAccountSize': '계좌 크기 선택',
    'filters.selectPlatform': '플랫폼 선택',
    'filters.maxPayoutDays': '최대 지급 일수',
    'sort.sortBy': '정렬 기준',
    'sort.bestDiscount': '최고 할인',
    'sort.lowestPrice': '최저 가격',
    'sort.highestPrice': '최고 가격',
    'sort.fastestPayout': '가장 빠른 지급',
    'sort.highestRated': '최고 평점',
    
    // Stats
    'stats.avgDiscount': '평균 할인',
    'stats.activeDeals': '활성 딜',
    'stats.avgSavings': '평균 절약',
    'stats.vsLastMonth': '지난달 대비 12%',
    'stats.bestDiscount': '최고 할인율',
    'stats.limited': '한정 시간',
    'stats.usersThisMonth': '이번 달 사용자',
    'stats.activeCommunity': '활성 커뮤니티',
    
    // CTA Section
    'cta.title': '더 이상 딜을 놓치지 마세요',
    'cta.subtitle': '새로운 프로모션과 할인이 제공될 때 알림을 받으세요. 2,400명 이상의 트레이더가 돈을 절약하고 있습니다.',
    'cta.emailPlaceholder': '이메일 입력...',
    'cta.subscribe': '구독하기',
    'cta.weeklyUpdates': '주간 업데이트',
    'cta.exclusiveDeals': '독점 딜',
    'cta.noSpam': '스팸 없음',
    
    // Footer
    'footer.description': '가장 포괄적인 프롭 회사 비교 플랫폼. 최고의 딜과 할인을 찾으세요.',
    'footer.navigation': '내비게이션',
    'footer.resources': '리소스',
    'footer.legal': '법적 고지',
    'footer.tradingRules': '거래 규칙',
    'footer.payoutComparison': '지급 비교',
    'footer.platformGuide': '플랫폼 가이드',
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '서비스 약관',
    'footer.disclaimer': '면책 조항',
    'footer.copyright': '© 2024 PropRank. 모든 권리 보유.',
    'footer.operational': '모든 시스템 정상 작동',
    
    // Listing
    'listing.noResults': '회사를 찾을 수 없습니다',
    'listing.tryDifferentFilters': '다른 필터나 검색어를 시도해보세요.',
    'listing.showingCount': '{{count}}개 회사 표시 중',
    
    // Countdown
    'countdown.expired': '만료됨',
    
    // Clipboard
    'clipboard.success': '복사됨!',
    'clipboard.copied': '"{{text}}"가 클립보드에 복사되었습니다',
    'clipboard.error': '복사 실패',
    'clipboard.failed': '클립보드에 복사하지 못했습니다',
    
    // Errors
    'errors.loadFailed': '데이터 로드 실패',
    'errors.tryAgain': '나중에 다시 시도해주세요.',
    'errors.firmNotFound': '회사를 찾을 수 없습니다',
    'errors.checkUrl': 'URL을 확인하고 다시 시도해주세요.',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.rankings': 'ランキング',
    'nav.reviews': 'レビュー',
    'nav.guides': 'ガイド',
    'nav.news': 'ニュース',
    
    // Header
    'header.searchPlaceholder': '会社を検索...',
    
    // Home page
    'home.title': '2024年最高のプロップトレーディング会社',
    'home.subtitle': '独占割引コードとリアルタイム価格で{{count}}のプロップ会社を比較。',
    'home.seo.title': '2024年最高のプロップトレーディング会社 - 価格と割引の比較 | PropRank',
    'home.seo.description': '独占割引コードとリアルタイム価格で最高のプロップトレーディング会社を比較。',
    
    // Firm detail
    'firmDetail.seo.title': '{{firmName}} レビューと割引コード | PropRank',
    'firmDetail.seo.description': '最新の{{firmName}}割引コード、価格、取引ルールを取得。',
    'firmDetail.rules.title': '取引ルールと要件',
    'firmDetail.rules.noRules': '取引ルールは利用できません',
    'firmDetail.pricing.title': 'アカウントサイズと価格',
    'firmDetail.referral.title': '限定オファー',
    'firmDetail.referral.couponCode': 'クーポンコード',
    'firmDetail.referral.limitedOffer': '期間限定オファー',
    'firmDetail.referral.endsIn': '終了まで',
    'firmDetail.referral.getChallenge': 'チャレンジを取得',
    'firmDetail.referral.disclosure': 'リンクから購入された場合、手数料を受け取る場合があります。',
    'firmDetail.stats.title': 'クイック統計',
    'firmDetail.stats.totalSavings': '利用可能な総節約額',
    'firmDetail.stats.avgDiscount': '平均割引',
    'firmDetail.stats.accountSizes': '利用可能なアカウントサイズ',
    
    // Table headers
    'table.firm': '会社',
    'table.accountSize': 'アカウントサイズ',
    'table.price': '価格',
    'table.discount': '割引',
    'table.payout': 'ペイアウト',
    'table.action': 'アクション',
    'table.basePrice': '基本価格',
    'table.finalPrice': '最終価格',
    
    // Labels
    'labels.featured': 'おすすめ',
    'labels.challenge': 'チャレンジ',
    'labels.split': '分割',
    'labels.code': 'コード',
    'labels.none': 'なし',
    'labels.noDiscount': '割引なし',
    'labels.endsIn': '終了まで',
    'labels.payout': 'ペイアウト',
    'labels.platforms': 'プラットフォーム',
    'labels.rating': '評価',
    'labels.payoutSplit': 'ペイアウト分割',
    
    // Actions
    'actions.getChallenge': 'チャレンジを取得',
    'actions.loadMore': 'もっと見る',
    
    // Filters and sorting
    'filters.title': 'フィルター',
    'filters.accountSize': 'アカウントサイズ',
    'filters.platform': 'プラットフォーム',
    'filters.payout': 'ペイアウト',
    'filters.selectAccountSize': 'アカウントサイズを選択',
    'filters.selectPlatform': 'プラットフォームを選択',
    'filters.maxPayoutDays': '最大ペイアウト日数',
    'sort.sortBy': '並び替え',
    'sort.bestDiscount': '最高割引',
    'sort.lowestPrice': '最低価格',
    'sort.highestPrice': '最高価格',
    'sort.fastestPayout': '最速ペイアウト',
    'sort.highestRated': '最高評価',
    
    // Stats
    'stats.avgDiscount': '平均割引',
    'stats.activeDeals': 'アクティブディール',
    'stats.avgSavings': '平均節約',
    'stats.vsLastMonth': '先月比12%',
    'stats.bestDiscount': '最高割引率',
    'stats.limited': '期間限定',
    'stats.usersThisMonth': '今月のユーザー',
    'stats.activeCommunity': 'アクティブコミュニティ',
    
    // CTA Section
    'cta.title': 'もうディールを見逃さない',
    'cta.subtitle': '新しいプロモーションや割引が利用可能になったときに通知を受け取る。2,400人以上のトレーダーがお金を節約しています。',
    'cta.emailPlaceholder': 'メールアドレスを入力...',
    'cta.subscribe': '購読する',
    'cta.weeklyUpdates': '週間更新',
    'cta.exclusiveDeals': '限定ディール',
    'cta.noSpam': 'スパムなし',
    
    // Footer
    'footer.description': '最も包括的なプロップ会社比較プラットフォーム。最高のディールと割引を見つける。',
    'footer.navigation': 'ナビゲーション',
    'footer.resources': 'リソース',
    'footer.legal': '法的事項',
    'footer.tradingRules': '取引ルール',
    'footer.payoutComparison': 'ペイアウト比較',
    'footer.platformGuide': 'プラットフォームガイド',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.disclaimer': '免責事項',
    'footer.copyright': '© 2024 PropRank. 全著作権所有。',
    'footer.operational': 'すべてのシステムが稼働中',
    
    // Listing
    'listing.noResults': '会社が見つかりません',
    'listing.tryDifferentFilters': 'フィルターや検索語を調整してみてください。',
    'listing.showingCount': '{{count}}社を表示中',
    
    // Countdown
    'countdown.expired': '期限切れ',
    
    // Clipboard
    'clipboard.success': 'コピーしました！',
    'clipboard.copied': '"{{text}}"をクリップボードにコピーしました',
    'clipboard.error': 'コピー失敗',
    'clipboard.failed': 'クリップボードへのコピーに失敗しました',
    
    // Errors
    'errors.loadFailed': 'データの読み込みに失敗しました',
    'errors.tryAgain': '後でもう一度お試しください。',
    'errors.firmNotFound': '会社が見つかりません',
    'errors.checkUrl': 'URLを確認してもう一度お試しください。',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.rankings': 'रैंकिंग',
    'nav.reviews': 'समीक्षा',
    'nav.guides': 'गाइड',
    'nav.news': 'समाचार',
    
    // Header
    'header.searchPlaceholder': 'कंपनियां खोजें...',
    
    // Home page
    'home.title': '2024 के सर्वश्रेष्ठ प्रॉप ट्रेडिंग फर्म',
    'home.subtitle': 'विशेष छूट कोड और रीयल-टाइम मूल्य निर्धारण के साथ {{count}} प्रॉप फर्मों की तुलना करें।',
    'home.seo.title': '2024 के सर्वश्रेष्ठ प्रॉप ट्रेडिंग फर्म - मूल्य और छूट तुलना | PropRank',
    'home.seo.description': 'विशेष छूट कोड और रीयल-टाइम मूल्य निर्धारण के साथ सर्वश्रेष्ठ प्रॉप ट्रेडिंग फर्मों की तुलना करें।',
    
    // Firm detail
    'firmDetail.seo.title': '{{firmName}} समीक्षा और छूट कोड | PropRank',
    'firmDetail.seo.description': 'नवीनतम {{firmName}} छूट कोड, मूल्य निर्धारण और ट्रेडिंग नियम प्राप्त करें।',
    'firmDetail.rules.title': 'ट्रेडिंग नियम और आवश्यकताएं',
    'firmDetail.rules.noRules': 'ट्रेडिंग नियम उपलब्ध नहीं हैं',
    'firmDetail.pricing.title': 'खाता आकार और मूल्य निर्धारण',
    'firmDetail.referral.title': 'विशेष ऑफर',
    'firmDetail.referral.couponCode': 'कूपन कोड',
    'firmDetail.referral.limitedOffer': 'सीमित समय ऑफर',
    'firmDetail.referral.endsIn': 'समाप्त होने में',
    'firmDetail.referral.getChallenge': 'चुनौती प्राप्त करें',
    'firmDetail.referral.disclosure': 'यदि आप हमारे लिंक के माध्यम से खरीदारी करते हैं तो हमें कमीशन मिल सकता है।',
    'firmDetail.stats.title': 'त्वरित आंकड़े',
    'firmDetail.stats.totalSavings': 'कुल उपलब्ध बचत',
    'firmDetail.stats.avgDiscount': 'औसत छूट',
    'firmDetail.stats.accountSizes': 'उपलब्ध खाता आकार',
    
    // Table headers
    'table.firm': 'फर्म',
    'table.accountSize': 'खाता आकार',
    'table.price': 'मूल्य',
    'table.discount': 'छूट',
    'table.payout': 'पेआउट',
    'table.action': 'कार्रवाई',
    'table.basePrice': 'आधार मूल्य',
    'table.finalPrice': 'अंतिम मूल्य',
    
    // Labels
    'labels.featured': 'विशेष',
    'labels.challenge': 'चुनौती',
    'labels.split': 'विभाजन',
    'labels.code': 'कोड',
    'labels.none': 'कोई नहीं',
    'labels.noDiscount': 'कोई छूट नहीं',
    'labels.endsIn': 'समाप्त होने में',
    'labels.payout': 'पेआउट',
    'labels.platforms': 'प्लेटफॉर्म',
    'labels.rating': 'रेटिंग',
    'labels.payoutSplit': 'पेआउट विभाजन',
    
    // Actions
    'actions.getChallenge': 'चुनौती प्राप्त करें',
    'actions.loadMore': 'और देखें',
    
    // Filters and sorting
    'filters.title': 'फिल्टर',
    'filters.accountSize': 'खाता आकार',
    'filters.platform': 'प्लेटफॉर्म',
    'filters.payout': 'पेआउट',
    'filters.selectAccountSize': 'खाता आकार चुनें',
    'filters.selectPlatform': 'प्लेटफॉर्म चुनें',
    'filters.maxPayoutDays': 'अधिकतम पेआउट दिन',
    'sort.sortBy': 'इसके द्वारा क्रमबद्ध करें',
    'sort.bestDiscount': 'सर्वोत्तम छूट',
    'sort.lowestPrice': 'सबसे कम मूल्य',
    'sort.highestPrice': 'सबसे अधिक मूल्य',
    'sort.fastestPayout': 'सबसे तेज़ पेआउट',
    'sort.highestRated': 'सर्वोच्च रेटेड',
    
    // Stats
    'stats.avgDiscount': 'औसत छूट',
    'stats.activeDeals': 'सक्रिय डील',
    'stats.avgSavings': 'औसत बचत',
    'stats.vsLastMonth': 'पिछले महीने की तुलना में 12%',
    'stats.bestDiscount': 'सर्वोत्तम छूट दर',
    'stats.limited': 'सीमित समय',
    'stats.usersThisMonth': 'इस महीने के उपयोगकर्ता',
    'stats.activeCommunity': 'सक्रिय समुदाय',
    
    // CTA Section
    'cta.title': 'फिर कभी कोई डील न चूकें',
    'cta.subtitle': 'जब नए प्रमोशन और छूट उपलब्ध हों तो सूचना प्राप्त करें। 2,400+ व्यापारी पैसे बचा रहे हैं।',
    'cta.emailPlaceholder': 'अपना ईमेल दर्ज करें...',
    'cta.subscribe': 'सब्सक्राइब करें',
    'cta.weeklyUpdates': 'साप्ताहिक अपडेट',
    'cta.exclusiveDeals': 'विशेष डील',
    'cta.noSpam': 'कोई स्पैम नहीं',
    
    // Footer
    'footer.description': 'सबसे व्यापक प्रॉप फर्म तुलना प्लेटफॉर्म। सर्वोत्तम डील और छूट खोजें।',
    'footer.navigation': 'नेवीगेशन',
    'footer.resources': 'संसाधन',
    'footer.legal': 'कानूनी',
    'footer.tradingRules': 'ट्रेडिंग नियम',
    'footer.payoutComparison': 'पेआउट तुलना',
    'footer.platformGuide': 'प्लेटफॉर्म गाइड',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.disclaimer': 'अस्वीकरण',
    'footer.copyright': '© 2024 PropRank. सभी अधिकार सुरक्षित।',
    'footer.operational': 'सभी सिस्टम चालू',
    
    // Listing
    'listing.noResults': 'कोई फर्म नहीं मिली',
    'listing.tryDifferentFilters': 'अपने फिल्टर या खोज शब्दों को समायोजित करने का प्रयास करें।',
    'listing.showingCount': '{{count}} फर्में दिखाई जा रही हैं',
    
    // Countdown
    'countdown.expired': 'समाप्त',
    
    // Clipboard
    'clipboard.success': 'कॉपी हो गया!',
    'clipboard.copied': '"{{text}}" को क्लिपबोर्ड में कॉपी किया गया',
    'clipboard.error': 'कॉपी असफल',
    'clipboard.failed': 'क्लिपबोर्ड में कॉपी करने में असफल',
    
    // Errors
    'errors.loadFailed': 'डेटा लोड करने में असफल',
    'errors.tryAgain': 'कृपया बाद में पुनः प्रयास करें।',
    'errors.firmNotFound': 'फर्म नहीं मिली',
    'errors.checkUrl': 'कृपया URL की जांच करें और पुनः प्रयास करें।',
  }
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState('en');

  useEffect(() => {
    // Get locale from URL path
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const supportedLocales = ['en', 'ko', 'ja', 'hi'];
    
    if (pathParts.length > 0 && supportedLocales.includes(pathParts[0])) {
      setLocaleState(pathParts[0]);
    } else {
      // Default to English if no locale in URL
      setLocaleState('en');
    }
  }, []);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    // Store in localStorage for persistence
    localStorage.setItem('proprank-locale', newLocale);
  };

  const t = (key: string, params: Record<string, any> = {}) => {
    const localeTranslations = translations[locale as keyof typeof translations] || translations.en;
    let translation = localeTranslations[key as keyof typeof localeTranslations] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    });
    
    return translation;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
