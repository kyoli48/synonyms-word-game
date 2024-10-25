import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css'
import { GAME_TITLE } from '@/lib/constants/game-constants'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: GAME_TITLE,
    template: `%s | ${GAME_TITLE}`
  },
  description: 'Challenge your vocabulary with Synonyms, a fast-paced adjective association game. Discover new words and test your language skills in just 60 seconds!',
  keywords: ['synonyms', 'word game', 'vocabulary', 'language learning', 'adjectives', 'educational game'],
  authors: [{ name: 'Alphonsus Koong' }],
  creator: 'Alphonsus Koong',
  publisher: 'Alphonsus Koong',
  openGraph: {
    title: GAME_TITLE,
    description: 'Challenge your vocabulary with Synonyms, a fast-paced adjective association game. Discover new words and test your language skills in just 60 seconds!',
    url: 'https://synonyms.kyoli48.me/',
    siteName: GAME_TITLE,
    images: [
      {
        url: 'https://synonyms.kyoli48.me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Synonyms Game - Test Your Vocabulary',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: GAME_TITLE,
    description: 'Challenge your vocabulary with Synonyms, a fast-paced adjective association game. Discover new words and test your language skills in just 60 seconds!',
    images: ['https://synonyms.kyoli48.me/og-image.png'],
    creator: '@yourTwitterHandle',
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
