import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EcoTrack - Environmental Sustainability',
  description: 'Track and contribute to environmental sustainability efforts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ConvexClientProvider>
          {children}
          </ConvexClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}