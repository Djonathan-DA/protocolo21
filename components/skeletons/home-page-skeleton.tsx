import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function HomePageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
      {/* Banner Card Skeleton */}
      <Card className="relative overflow-hidden border-gold/40">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent z-0" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">
          <div className="flex-1 space-y-4">
            <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-48 w-full md:w-48">
              <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* Modules Grid Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full border-t-2 border-white/10 p-6 space-y-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
