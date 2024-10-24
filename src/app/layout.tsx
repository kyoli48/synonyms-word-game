import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css'
import { GAME_TITLE } from '@/lib/constants/game-constants'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: GAME_TITLE,
  description: 'A fun word game to test your wordsmith abilities',
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
