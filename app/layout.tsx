import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/components/query-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'PropFirmMentor - Best Prop Trading Firms Comparison',
    template: '%s | PropFirmMentor'
  },
  description: 'Compare and find the best prop trading firms. Detailed analysis of account sizes, pricing, rules, and payouts across top proprietary trading companies.',
  keywords: 'prop trading, proprietary trading, trading firms, forex trading, futures trading, challenge accounts',
  authors: [{ name: 'PropFirmMentor Team' }],
  creator: 'PropFirmMentor',
  publisher: 'PropFirmMentor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://propfirmmentor.replit.app',
    siteName: 'PropFirmMentor',
    title: 'PropFirmMentor - Best Prop Trading Firms Comparison',
    description: 'Compare and find the best prop trading firms. Detailed analysis of account sizes, pricing, rules, and payouts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PropFirmMentor - Prop Trading Firms Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropFirmMentor - Best Prop Trading Firms Comparison',
    description: 'Compare and find the best prop trading firms. Detailed analysis of account sizes, pricing, rules, and payouts.',
    images: ['/og-image.png'],
    creator: '@propfirmmentor',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://propfirmmentor.replit.app'} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}