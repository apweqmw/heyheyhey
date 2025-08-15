import { Metadata } from 'next';
import Home from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'PropFirmMentor - Best Prop Trading Firms Comparison',
  description: 'Compare and find the best prop trading firms. Detailed analysis of account sizes, pricing, rules, and payouts across top proprietary trading companies.',
  openGraph: {
    title: 'PropFirmMentor - Best Prop Trading Firms Comparison',
    description: 'Compare and find the best prop trading firms. Detailed analysis of account sizes, pricing, rules, and payouts.',
    url: '/',
  },
};

export default function HomePage() {
  return <Home />;
}