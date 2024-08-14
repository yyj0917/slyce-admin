import localFont from 'next/font/local';
import type { Viewport } from 'next';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import QueryProvider from './admin/_components/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const fontSuit = localFont({
  src: '../assets/fonts/suit-variable.woff2',
  weight: '300 800',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'SLYCE',
  description:
    '특별한 무드를 가진 멤버들과 디자이너 브랜드가 만나는 프라이빗 패션 멤버십, SLYCE',
  keywords: [
    'SLYCE',
    'SLY/CE',
    'Designer Brands',
    'Exclusive',
    'Fashion',
    'Influencer',
    'Creator',
    'Membership',
    'Instagram',
    'Tiktok',
    '슬라이스',
    '디자이너 브랜드',
    '편집샵',
    '멤버십',
    '패션',
    '인플루언서',
    '크리에이터',
    '인스타그램',
    '틱톡',
  ],
  openGraph: {
    title: 'SLYCE',
    description:
      '특별한 무드를 가진 멤버들과 디자이너 브랜드가 만나는 프라이빗 패션 멤버십, SLYCE',
    images: '',
    type: 'website',
    locale: 'ko_KR',
  },
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>

      <html lang="ko" className={fontSuit.className} suppressHydrationWarning>
        <body>
          
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
              
                {children}
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                  )}

          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}