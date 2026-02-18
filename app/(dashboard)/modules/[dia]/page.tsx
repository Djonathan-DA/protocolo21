// app/(dashboard)/modules/[dia]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { protocolData } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { markDayAsCompleted } from '@/app/actions'
import toast from 'react-hot-toast'
import { CheckCircle2, AlertCircle, Lightbulb, Zap, ChevronDown, ChevronUp } from 'lucide-react'

export default function ModuleDetailPage() {
  const params = useParams()
  const dia = parseInt(params.dia as string, 10)
  const supabase = createClient()
  
  const [user, setUser] = useState<any>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0])
  const [totalProgress, setTotalProgress] = useState(0)

  const dayData = protocolData.find(d => d.day === dia)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)

      if (data.user) {
        // Fetch completion status
        const { data: progress } = await supabase
          .from('UserProgress')
          .select('completed')
          .eq('userId', data.user.id)
          .eq('day', dia)
          .single()

        if (progress?.completed) {
          setIsCompleted(true)
        }

        // Fetch total progress
        const { data: allProgress } = await supabase
          .from('UserProgress')
          .select('completed')
          .eq('userId', data.user.id)

        const completed = allProgress?.filter(p => p.completed).length || 0
        setTotalProgress((completed / 21) * 100)
      }
    }

    fetchUser()
  }, [dia, supabase])

  const handleMarkAsCompleted = async () => {
    if (!user) return

    setLoading(true)
    try {
      await markDayAsCompleted(user.id, dia, !isCompleted)
      setIsCompleted(!isCompleted)
      toast.success(isCompleted ? 'Dia desmarcado!' : 'Parabéns! Dia concluído! 🎉')
    } catch (error) {
      toast.error('Erro ao atualizar progresso')
    } finally {
      setLoading(false)
    }
  }

  const toggleStepExpanded = (index: number) => {
    setExpandedSteps(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  if (!dayData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-gray-400">Dia não encontrado</p>
        </Card>
      </div>
    )
  }

  const moduleNames = {
    1: 'Detoxificação',
    2: 'Renovação Celular',
    3: 'Blindagem'
  }

  const moduleColors = {
    1: 'from-emerald-400 to-emerald-600',
    2: 'from-rosegold to-rose-500',
    3: 'from-gold to-amber-500'
  }

  const moduleIcons = {
    1: '🍃',
    2: '✨',
    3: '🛡️'
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      {/* Header com progresso */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{moduleIcons[dayData.mod as keyof typeof moduleIcons]}</span>
              <div>
                <p className="text-sm text-gray-400">Módulo {dayData.mod}</p>
                <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                  {moduleNames[dayData.mod as keyof typeof moduleNames]}
                </h1>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-gold">Dia {dia}</p>
            <p className="text-xs text-gray-400 mt-1">de 21</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-400">Progresso Geral</span>
            <span className="text-xs font-bold text-gold">{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 md:p-8 mb-6">
          {/* Dia Title */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{dayData.title}</h2>
            <p className="text-gray-300 text-lg">{dayData.desc}</p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-bold text-gold uppercase tracking-wider">Passos Detalhados</h3>
            
            {dayData.steps?.map((step, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-lg overflow-hidden hover:border-gold/30 transition-colors"
              >
                <button
                  onClick={() => toggleStepExpanded(index)}
                  className="w-full p-4 flex items-start justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mt-1">
                      <span className="text-gold font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{step.title}</p>
                      {!expandedSteps.includes(index) && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{step.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4 text-gold">
                    {expandedSteps.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {expandedSteps.includes(index) && (
                  <div className="px-4 pb-4 pt-0 border-t border-white/5 space-y-4">
                    {/* Description */}
                    <div>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-emerald-300 text-sm mb-2">Dicas</p>
                            <ul className="space-y-1">
                              {step.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-emerald-200">• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Warnings */}
                    {step.warnings && step.warnings.length > 0 && (
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-rose-300 text-sm mb-2">Avisos</p>
                            <ul className="space-y-1">
                              {step.warnings.map((warning, i) => (
                                <li key={i} className="text-sm text-rose-200">• {warning}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cost */}
                    {step.cost && (
                      <div className="flex items-center gap-2 text-sm">
                        <Zap size={16} className="text-gold" />
                        <span className="text-gray-300">Custo aproximado: <span className="font-semibold text-gold">{step.cost}</span></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Completion Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <Button
              onClick={handleMarkAsCompleted}
              disabled={loading}
              size="lg"
              className={`flex-1 ${
                isCompleted
                  ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 hover:bg-emerald-500/30'
                  : 'bg-gradient-to-r from-gold to-rosegold text-white'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 size={18} className="mr-2" />
                  Dia Concluído!
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} className="mr-2" />
                  Marcar como Concluído
                </>
              )}
            </Button>

            {/* Navigation */}
            <div className="flex gap-2">
              {dia > 1 && (
                <a
                  href={`/modules/${dia - 1}`}
                  className="px-4 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-gold/50 transition-colors font-semibold"
                >
                  ← Anterior
                </a>
              )}
              {dia < 21 && (
                <a
                  href={`/modules/${dia + 1}`}
                  className="px-4 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-gold/50 transition-colors font-semibold"
                >
                  Próximo →
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* Module Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(mod => {
            const startDay = mod === 1 ? 1 : mod === 2 ? 8 : 15
            const endDay = mod === 1 ? 7 : mod === 2 ? 14 : 21
            const isCurrentModule = dayData.mod === mod

            return (
              <a
                key={mod}
                href={`/modules/${startDay}`}
                className={`p-4 rounded-lg border transition-all ${
                  isCurrentModule
                    ? 'border-gold bg-gold/10'
                    : 'border-white/10 hover:border-gold/50'
                }`}
              >
                <div className="text-2xl mb-2">
                  {moduleIcons[mod as keyof typeof moduleIcons]}
                </div>
                <p className="text-xs text-gray-400 mb-1">Módulo {mod}</p>
                <p className="font-bold text-white mb-2">{moduleNames[mod as keyof typeof moduleNames]}</p>
                <p className="text-xs text-gray-400">Dias {startDay}-{endDay}</p>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
