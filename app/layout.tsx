import type {Metadata} from 'next';
import {Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl =
  process.env.APP_URL ||
  'https://ais-pre-dif3f56on34skfo7csf7zo-622233591882.asia-northeast1.run.app';

const seoTitle = 'Daniel Theo Santoso — Portofolio Frontend Programmer';
const seoDescription =
  'Portofolio resmi Daniel Theo Santoso, Frontend Programmer di Surakarta. Jelajahi proyek aplikasi web modern berbasis React, Next.js, dan TypeScript.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: '%s | Daniel Theo Santoso',
  },
  description: seoDescription,
  keywords: [
    'Daniel Theo Santoso',
    'Frontend Programmer',
    'Frontend Developer Indonesia',
    'Web Developer Surakarta',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'PT Daya Rekadigital Indonesia',
    'Portofolio Frontend',
  ],
  authors: [{name: 'Daniel Theo Santoso', url: 'https://www.linkedin.com/in/daniel-theo-santoso/'}],
  creator: 'Daniel Theo Santoso',
  publisher: 'Daniel Theo Santoso',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Daniel Theo Santoso',
    title: seoTitle,
    description: seoDescription,
    images: [
      {
        url: '/assets/aistudio/IMG_20260221_094158_522_9c399076.webp',
        width: 800,
        height: 1000,
        alt: 'Daniel Theo Santoso — Frontend Programmer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: ['/assets/aistudio/IMG_20260221_094158_522_9c399076.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: seoTitle,
      description: seoDescription,
      inLanguage: 'id-ID',
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Daniel Theo Santoso',
      jobTitle: 'Frontend Programmer',
      email: 'mailto:danieltheo.73@gmail.com',
      image: `${siteUrl}/assets/aistudio/IMG_20260221_094158_522_9c399076.webp`,
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surakarta',
        addressRegion: 'Jawa Tengah',
        addressCountry: 'ID',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'PT Daya Rekadigital Indonesia (Rekadigi)',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Universitas Duta Bangsa Surakarta',
        },
        {
          '@type': 'HighSchool',
          name: 'SMK Negeri 2 Surakarta',
        },
      ],
      knowsAbout: [
        'React.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Frontend Web Development',
      ],
      sameAs: [
        'https://www.linkedin.com/in/daniel-theo-santoso/',
        'https://github.com/Moscart',
      ],
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#FAF9F6] dark:bg-[#0B0C0E] text-zinc-900 dark:text-zinc-100 font-[family-name:var(--font-sans)] antialiased selection:bg-orange-500 selection:text-white dark:selection:bg-yellow-400 dark:selection:text-zinc-950"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        {children}
      </body>
    </html>
  );
}
