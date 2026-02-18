// app/(dashboard)/checklist/page.tsx
import { protocolData } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { fetchUserChecklists, updateChecklist } from '@/app/actions'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Award, Check } from 'lucide-react'

export default async function ChecklistPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { get(name) { return cookieStore.get(name)?.value } } })
  const { data: { user } } = await supabase.auth.getUser()
  const savedChecklists = await fetchUserChecklists(user!.id)

  const totalTasks = protocolData.length * 3
  let completedTasks = 0
  
  // ✅ Tipagem limpa e estrita: avisamos o TS exatamente o que é o 'c' e o 'task'
  savedChecklists.forEach((c: { tasks: boolean[] }) => {
    completedTasks += c.tasks.filter((task: boolean) => task === true).length
  })
  
  const progressPct = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="heading-gold text-3xl md:text-4xl text-white mb-2">Checklist de Hábitos</h1>
        <p className="text-gray-400 mb-6">A pele perfeita é resultado da repetição diária. Marque suas missões.</p>
        <div className="max-w-md">
            <div className="flex justify-between text-sm mb-2 text-gray-300">
                <span>Total de Hábitos Concluídos</span>
                <span className="font-bold text-emerald-400">{progressPct}%</span>
            </div>
            <Progress value={progressPct} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protocolData.map((d) => {
          // ✅ Tipagem limpa adicionada aqui também
          const savedData = savedChecklists.find((c: { day: number; tasks: boolean[] }) => c.day === d.day)
          const tasksStatus = savedData?.tasks || [false, false, false]
          const isAllDone = tasksStatus.every((v: boolean) => v === true)

          return (
            <Card key={d.day} className={`relative ${isAllDone ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-emerald-500/5' : ''}`}>
              {isAllDone && <Award className="absolute top-4 right-4 text-emerald-400" size={24} />}
              <h3 className="text-white font-bold mb-4 font-serif text-xl">Dia {d.day}</h3>
              <div className="space-y-4">
                {d.steps.map((task, idx) => {
                  const toggleTask = async () => {
                    'use server'
                    const newTasks = [...tasksStatus]
                    newTasks[idx] = !newTasks[idx]
                    await updateChecklist(user!.id, d.day, newTasks)
                  }
                  return (
                    <form action={toggleTask} key={idx}>
                      <button type="submit" className="flex items-center gap-3 w-full text-left group">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${tasksStatus[idx] ? 'bg-emerald-500 border-emerald-500' : 'border-rosegold group-hover:border-white'}`}>
                          {tasksStatus[idx] && <Check size={14} className="text-white" />}
                        </div>
                        <span className={`text-sm transition-colors ${tasksStatus[idx] ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-white'}`}>
                          {task.title}
                        </span>
                      </button>
                    </form>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}