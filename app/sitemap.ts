import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://propfirmmentor.replit.app';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic firm pages
  try {
    const response = await fetch(`${baseUrl}/api/firms`);
    const firms = await response.json();

    const firmPages: MetadataRoute.Sitemap = firms.map((firm: any) => ({
      url: `${baseUrl}/firm/${firm.slug}`,
      lastModified: new Date(firm.updatedAt || firm.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...firmPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}