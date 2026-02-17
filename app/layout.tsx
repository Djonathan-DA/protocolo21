// app/layout.tsx
import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = { title: 'Protocolo 21 Dias | Pele Sem Cravos' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth"suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans relative z-10`}>
        {children}
        <Toaster toastOptions={{ style: { background: '#1E2937', color: '#E2E8F0', border: '1px solid rgba(251,191,36,0.2)' } }} />
      </body>
    </html>
  )
}