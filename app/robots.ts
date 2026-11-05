import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.APP_URL ||
    'https://ais-pre-dif3f56on34skfo7csf7zo-622233591882.asia-northeast1.run.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
