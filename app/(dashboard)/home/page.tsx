// app/(dashboard)/home/page.tsx
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { fetchUserProgress } from '@/app/actions'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Leaf, Sparkles, Shield } from 'lucide-react'

export default async function HomePage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name) { return cookieStore.get(name)?.value } } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const progress = await fetchUserProgress(user!.id)
  
  const completedDays = progress.filter((p: { completed: any }) => p.completed).length
  const progressPct = Math.round((completedDays / 21) * 100)

  const modules = [
    { id: 1, name: "Detoxificação", days: "Dias 1 a 7", icon: <Leaf className="text-emerald-400" size={28} /> },
    { id: 2, name: "Renovação Celular", days: "Dias 8 a 14", icon: <Sparkles className="text-rosegold" size={28} /> },
    { id: 3, name: "Blindagem", days: "Dias 15 a 21", icon: <Shield className="text-gold" size={28} /> }
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8 ">
      <Card className="relative overflow-hidden border-gold/40 ">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 ">
            <h1 className="heading-gold text-3xl md:text-5xl text-white mb-2">Bem-vinda ao método que mudará a sua pele</h1>
            <p className="text-gray-400 text-lg mb-6">Sua jornada de 21 dias para uma pele perfeita começou.</p>
            <div className="max-w-md">
                <div className="flex justify-between text-sm mb-2 text-gray-300">
                    <span>Seu Progresso</span>
                    <span className="font-bold text-emerald-400">{progressPct}%</span>
                </div>
                <Progress value={progressPct} />
            </div>
          </div>
        </div>
      </Card>

      <h2 className="heading-gold text-2xl">Seus Módulos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {modules.map(m => (
          <Link href={`/modulos/${(m.id - 1) * 7 + 1}`} key={m.id}>
            <Card className="h-full hover-3d group cursor-pointer border-t-2 border-t-white/10 hover:border-t-gold/50 flex flex-col">
              <div className="w-14 h-14 rounded-full bg-dark-900 flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">{m.days}</p>
              <div className="text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Acessar Aulas →</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}