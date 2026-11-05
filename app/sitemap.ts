import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.APP_URL ||
    'https://ais-pre-dif3f56on34skfo7csf7zo-622233591882.asia-northeast1.run.app';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
