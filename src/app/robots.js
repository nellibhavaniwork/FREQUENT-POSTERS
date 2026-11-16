export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://frequentposters.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

