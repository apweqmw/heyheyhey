import { Metadata } from 'next';
import Admin from '@/components/pages/admin';

export const metadata: Metadata = {
  title: 'Admin Panel | PropFirmMentor',
  description: 'Administration panel for managing prop trading firms data.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <Admin />;
}