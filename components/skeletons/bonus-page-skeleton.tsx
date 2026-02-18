import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function BonusPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="space-y-4 text-center md:text-left mb-10">
        <Skeleton className="h-12 w-2/3 md:w-1/3 mx-auto md:mx-0" />
        <Skeleton className="h-6 w-full md:w-2/3 mx-auto md:mx-0" />
      </div>

      {/* Accordion List Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-panel rounded-2xl px-6 border border-white/10 p-4">
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-6 flex-1">
                {/* Icon Skeleton */}
                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                
                {/* Text Skeleton */}
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4 md:w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
              
              {/* Trigger Icon Skeleton */}
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
            
            {/* Optional Content Preview Skeleton */}
            <div className="pt-4 border-t border-white/10 mt-2 space-y-4">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Support Card Skeleton */}
      <Card className="mt-12 p-8 border-gold/20 bg-gold/5 backdrop-blur-xl text-center space-y-4">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
        <div className="pt-4">
          <Skeleton className="h-12 w-48 mx-auto rounded-full" />
        </div>
      </Card>
    </div>
  )
}
