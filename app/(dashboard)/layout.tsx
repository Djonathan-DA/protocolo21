// app/(dashboard)/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { LogOut, Home, Leaf, Sparkles, Shield, CheckSquare, Gift, Menu } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || ''))
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const navLinks = [
    { href: '/home', label: 'Início', icon: <Home size={18} /> },
    { label: 'A Jornada', isHeader: true },
    { href: '/modulos/1', label: 'Módulo 1: Detox', icon: <Leaf size={18} className="text-emerald-400" /> },
    { href: '/modulos/8', label: 'Módulo 2: Renovação', icon: <Sparkles size={18} className="text-rosegold" /> },
    { href: '/modulos/15', label: 'Módulo 3: Blindagem', icon: <Shield size={18} className="text-gold" /> },
    { label: 'Ferramentas', isHeader: true },
    { href: '/checklist', label: 'Checklist Diário', icon: <CheckSquare size={18} /> },
    { label: 'Bônus VIP', isHeader: true },
    { href: '/bonus', label: 'Meus Bônus', icon: <Gift size={18} /> },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <nav className="fixed w-full z-50 glass-panel border-b-0 py-3 px-4 md:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gold"><Menu /></button>
          <span className="font-serif font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gold to-rosegold hidden sm:block">PROTOCOLO 21</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-300 hidden sm:block">Olá, <span className="text-white font-bold">{email.split('@')[0]}</span></span>
          <button onClick={handleLogout} className="text-xs flex items-center gap-2 text-rosegold border border-rosegold/30 px-4 py-1.5 rounded-full hover:bg-rosegold hover:text-white transition-colors">
            <LogOut size={14} /> Sair
          </button>
        </div>
      </nav>

      <aside className={`fixed md:relative top-16 md:top-0 w-64 h-full glass-panel border-r border-t-0 border-l-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 z-40 md:pt-16`}>
        <div className="py-6 flex flex-col gap-1 h-full overflow-y-auto">
          {navLinks.map((link, i) => 
            link.isHeader ? (
              <div key={i} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gold/50 mt-4">{link.label}</div>
            ) : (
              <Link key={i} href={link.href!} onClick={() => setIsOpen(false)} className={`px-6 py-3 text-sm flex items-center gap-3 transition-colors ${pathname === link.href || pathname.startsWith(link.href!) ? 'text-gold bg-gold/10 border-r-2 border-gold' : 'text-gray-400 hover:text-white'}`}>
                {link.icon} {link.label}
              </Link>
            )
          )}
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

      <main className="flex-1 pt-16 h-full overflow-y-auto mt-15 relative z-10 scroll-smooth">
        {children}
      </main>
    </div>
  )
}