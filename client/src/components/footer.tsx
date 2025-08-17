import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

export default function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg mr-3">
                <div className="w-6 h-6 bg-current rounded flex items-center justify-center text-sm font-bold">
                  P
                </div>
              </div>
              <span className="text-2xl font-bold">PropFirmMentor</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Discord">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.942 4.556a16.3 16.3 0 0 0-4.126-1.297 12.04 12.04 0 0 0-.529 1.097 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3C.846 7.142.064 9.663.064 12.126c0 .535.017 1.058.051 1.569a16.44 16.44 0 0 0 4.992 2.519c.4-.546.758-1.122 1.07-1.729a10.63 10.63 0 0 1-1.683-.803c.14-.103.279-.21.413-.320a11.664 11.664 0 0 0 10.106 0c.134.11.273.217.413.32-.537.316-1.106.590-1.683.803.312.607.67 1.183 1.07 1.729a16.418 16.418 0 0 0 4.992-2.519c.045-.511.062-1.034.051-1.569 0-2.463-.782-4.984-2.994-7.57zM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Telegram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.987 6.927L13.343 14.2c-.145.612-.537.761-.823.645L9.67 13.273l-1.326 1.277c-.147.147-.27.27-.554.27l.198-2.812L14.48 6.09c.248-.221-.054-.344-.386-.123L6.553 10.97l-2.51-.784c-.545-.17-.557-.545.114-.806l9.812-3.784c.456-.17.857.11.708.753l.31-1.422z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.rankings')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/reviews`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.reviews')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.guides')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news`} className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.tradingRules')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.payoutComparison')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.platformGuide')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.disclaimer')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}