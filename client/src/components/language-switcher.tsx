import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/lib/i18n";

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    setLocale(languageCode);
    setIsOpen(false);
    
    // Update URL to include the new locale
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Remove existing locale if present
    if (languages.some(lang => lang.code === pathParts[0])) {
      pathParts.shift();
    }
    
    // Add new locale
    const newPath = `/${languageCode}${pathParts.length ? '/' + pathParts.join('/') : ''}`;
    window.history.pushState({}, '', newPath);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 px-3 py-2 hover:bg-muted transition-colors"
          data-testid="language-switcher"
        >
          <span className="text-sm font-medium">
            {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
          </span>
          <i className="fas fa-chevron-down text-xs"></i>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-48 p-1" align="end">
        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md text-left transition-colors ${
                locale === language.code
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-foreground'
              }`}
              data-testid={`language-option-${language.code}`}
            >
              <span className="mr-3">{language.flag}</span>
              <span>{language.name}</span>
              {locale === language.code && (
                <i className="fas fa-check ml-auto text-primary"></i>
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
