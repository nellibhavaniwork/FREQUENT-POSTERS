export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://frequentposters.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/learn-with-us',
    '/clients',
    '/portfolio',
    '/pricing',
    '/reviews',
    '/blog',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}

