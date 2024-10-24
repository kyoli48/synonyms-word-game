import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css'
import { GAME_TITLE } from '@/lib/constants/game-constants'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: GAME_TITLE,
  description: 'A fun word game to test your wordsmith abilities',
  openGraph: {
    title: GAME_TITLE,
    description: 'A fun word game to test your wordsmith abilities',
    url: 'https://synonyms-pows51z0s-kyoli48s-projects.vercel.app/',
    siteName: GAME_TITLE,
    images: [
      {
        url: 'https://your-game-url.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: GAME_TITLE,
    description: 'A fun word game to test your wordsmith abilities',
    images: ['https://your-game-url.com/og-image.jpg'],
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
