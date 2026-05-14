import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Fraunces, Inter, Caveat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Singara — The Art of Being Seen',
  description: "India's premier beauty services marketplace",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${fraunces.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#FCF9F3',
              color: '#1C1814',
              border: '1px solid #DDD2C1',
              borderRadius: '16px',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
      </body>
    </html>
  );
}
