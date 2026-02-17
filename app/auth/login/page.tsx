// app/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/home')
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        toast.success('Conta criada! Redirecionando...')
        router.push('/home')
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro de autenticação.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    if (!email) return toast.error('Digite seu e-mail para recuperar a senha.')
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) toast.error(error.message)
    else toast.success('E-mail de recuperação enviado!')
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4 relative">
      <div className="absolute w-64 h-64 rounded-full bg-rosegold/10 blur-[100px] top-10 left-10 animate-float pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-emerald-500/10 blur-[100px] bottom-10 right-10 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <Card className="w-full max-w-md relative z-10 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="heading-gold text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-rosegold">Protocolo 21 Dias</h1>
          <p className="text-gray-400 text-sm mt-2">O Império da sua pele perfeita</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">E-mail</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="seu@email.com" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Senha</label>
              <button type="button" onClick={handleReset} className="text-xs text-rosegold hover:text-white transition-colors">Esqueci a senha</button>
            </div>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" disabled={loading} size="lg">
            {loading ? 'Carregando...' : (isLogin ? 'Entrar no Portal' : 'Criar Conta')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <span>{isLogin ? 'Primeira vez aqui?' : 'Já tem uma conta?'}</span>{' '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-gold font-semibold hover:text-white transition-colors">{isLogin ? 'Crie sua conta' : 'Faça login'}</button>
        </div>
      </Card>
    </main>
  )
}