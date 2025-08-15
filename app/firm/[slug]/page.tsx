import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FirmDetail from '@/components/pages/firm-detail';

interface FirmPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata dynamically
export async function generateMetadata({ params }: FirmPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/firms`);
    const firms = await response.json();
    const firm = firms.find((f: any) => f.slug === params.slug);

    if (!firm) {
      return {
        title: 'Firm Not Found | PropFirmMentor',
        description: 'The requested prop trading firm was not found.',
      };
    }

    return {
      title: `${firm.name} Review - Detailed Analysis | PropFirmMentor`,
      description: `Comprehensive review of ${firm.name} prop trading firm. Account sizes, pricing, rules, payout terms, and trader requirements analysis.`,
      keywords: `${firm.name}, prop trading, ${firm.platforms?.join(', ')}, trading challenge, forex, futures`,
      openGraph: {
        title: `${firm.name} Review - Detailed Analysis`,
        description: `Comprehensive review of ${firm.name} prop trading firm. Account sizes, pricing, rules, payout terms analysis.`,
        url: `/firm/${params.slug}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${firm.name} Review - Detailed Analysis`,
        description: `Comprehensive review of ${firm.name} prop trading firm. Account sizes, pricing, rules, payout terms analysis.`,
      },
    };
  } catch (error) {
    return {
      title: 'Firm Details | PropFirmMentor',
      description: 'Detailed information about a prop trading firm.',
    };
  }
}

// Generate static params for all firms
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/firms`);
    const firms = await response.json();

    return firms.map((firm: any) => ({
      slug: firm.slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function FirmPage({ params }: FirmPageProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/firms`);
    const firms = await response.json();
    const firm = firms.find((f: any) => f.slug === params.slug);

    if (!firm) {
      notFound();
    }

    return <FirmDetail firm={firm} />;
  } catch (error) {
    notFound();
  }
}