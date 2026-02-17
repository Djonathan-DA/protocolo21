// app/(dashboard)/bonus/page.tsx
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Download, Salad, Pill, Snowflake } from 'lucide-react'

export default function BonusPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="heading-gold text-3xl md:text-5xl text-white mb-2">Bônus VIP</h1>
        <p className="text-gray-400 text-lg">Materiais exclusivos para acelerar sua jornada Glow.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        
        {/* Bonus 1 */}
        <AccordionItem value="item-1" className="glass-panel rounded-2xl px-6 border-l-4 border-l-gold">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center"><Salad /></div>
              <div className="text-left"><h2 className="font-serif text-xl text-white">Cardápio Anti-Acne 21 Dias</h2></div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 border-t border-white/10 mt-2">
            <p className="text-gray-400 mb-6">Refeições com baixo índice glicêmico para desinflamar seu organismo de dentro para fora.</p>
            <Button variant="outline"><Download className="mr-2" size={16} /> Baixar PDF Completo</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Bonus 2 */}
        <AccordionItem value="item-2" className="glass-panel rounded-2xl px-6 border-l-4 border-l-rosegold">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rosegold/10 text-rosegold rounded-full flex items-center justify-center"><Pill /></div>
              <div className="text-left"><h2 className="font-serif text-xl text-white">Guia de Suplementos Acessíveis</h2></div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 border-t border-white/10 mt-2">
            <p className="text-gray-400 mb-4">Nutracêuticos de farmácia abaixo de R$ 30 para blindar sua pele.</p>
            <div className="overflow-x-auto bg-dark-900/50 rounded-xl border border-white/5">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 text-gold text-sm uppercase tracking-wider">
                            <th className="p-4">Suplemento</th>
                            <th className="p-4">Benefício na Pele</th>
                            <th className="p-4">Dose / Preço Médio</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                        <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4 font-bold text-white">Zinco Quelato</td>
                            <td className="p-4">Controla a produção de sebo e ajuda a cicatrizar.</td>
                            <td className="p-4">30mg / ~R$ 15</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-4 font-bold text-white">Vitamina C</td>
                            <td className="p-4">Estimula colágeno e previne manchas de espinhas.</td>
                            <td className="p-4">500mg / ~R$ 12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Bonus 3 */}
        <AccordionItem value="item-3" className="glass-panel rounded-2xl px-6 border-l-4 border-l-emerald-400">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center"><Snowflake /></div>
              <div className="text-left"><h2 className="font-serif text-xl text-white">O Truque do Gelo Verde</h2></div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 border-t border-white/10 mt-2">
            <p className="text-gray-400 mb-6">O segredo coreano para desinchar o rosto e fechar poros em 5 minutos.</p>
            <div className="mb-6 text-center">
              
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold mb-4 font-serif text-lg border-b border-white/10 pb-2">Como Preparar</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                        <li>Faça 200ml de Chá Verde bem concentrado.</li>
                        <li>Despeje em forminhas de gelo e congele.</li>
                    </ol>
                </div>
                <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold mb-4 font-serif text-lg border-b border-white/10 pb-2">Como Aplicar</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><span className="text-emerald-400 mr-2">✓</span> Envolva 1 cubo num pano de algodão.</li>
                        <li><span className="text-emerald-400 mr-2">✓</span> Passe nas áreas inflamadas por 2 min.</li>
                    </ul>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}