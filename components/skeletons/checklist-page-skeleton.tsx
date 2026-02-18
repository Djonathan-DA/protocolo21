import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function ChecklistPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-pulse p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3 md:w-1/3" />
        <Skeleton className="h-6 w-full md:w-2/3" />
        
        {/* Progress Section Skeleton */}
        <div className="max-w-md pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      </div>

      {/* Checklist Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-white/10 bg-black/40 backdrop-blur-md overflow-hidden p-6 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>

            {/* Task Items Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center gap-3 p-3 rounded-xl border border-white/5">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
