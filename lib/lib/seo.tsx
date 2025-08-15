import React, { createContext, useContext, useEffect } from "react";

interface SEOData {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: any;
  hreflang?: Record<string, string>;
}

interface SEOContextType {
  setSEO: (data: SEOData) => void;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const setSEO = (data: SEOData) => {
    // Set document title
    if (data.title) {
      document.title = data.title;
    }

    // Update meta tags
    updateMetaTag('description', data.description);
    updateMetaTag('og:title', data.title, 'property');
    updateMetaTag('og:description', data.description, 'property');
    updateMetaTag('og:image', data.ogImage, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', data.title, 'name');
    updateMetaTag('twitter:description', data.description, 'name');
    updateMetaTag('twitter:image', data.ogImage, 'name');

    // Update canonical URL
    if (data.canonical) {
      updateLinkTag('canonical', `${window.location.origin}${data.canonical}`);
    }

    // Update hreflang tags
    if (data.hreflang) {
      // Remove existing hreflang tags
      const existingHreflang = document.querySelectorAll('link[hreflang]');
      existingHreflang.forEach(tag => tag.remove());

      // Add new hreflang tags
      Object.entries(data.hreflang).forEach(([lang, url]) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hrefLang = lang;
        link.href = `${window.location.origin}${url}`;
        document.head.appendChild(link);
      });
    }

    // Update structured data
    if (data.structuredData) {
      updateStructuredData(data.structuredData);
    }
  };

  const updateMetaTag = (name: string, content?: string, attribute: string = 'name') => {
    if (!content) return;

    let tag = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const updateLinkTag = (rel: string, href: string) => {
    let tag = document.querySelector(`link[rel="${rel}"]`);
    if (!tag) {
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
  };

  const updateStructuredData = (data: any) => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  // Set default meta tags on mount
  useEffect(() => {
    setSEO({
      title: 'PropRank - Best Prop Trading Firms Comparison & Reviews',
      description: 'Compare the best prop trading firms, account sizes, pricing, and exclusive discount codes. Find your perfect trading challenge with our comprehensive ranking.',
      ogImage: '/og-image.jpg',
    });
  }, []);

  return (
    <SEOContext.Provider value={{ setSEO }}>
      {children}
    </SEOContext.Provider>
  );
}

export function useSEO() {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
}
