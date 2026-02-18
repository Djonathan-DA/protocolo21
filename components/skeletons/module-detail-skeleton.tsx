import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function ModuleDetailSkeleton() {
  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 max-w-4xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-64" />
            </div>
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-10 w-24 ml-auto" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
      </div>

      {/* Progress Bar Skeleton */}
      <div className="mb-10 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-3 w-full rounded-full" />
      </div>

      {/* Main Content Card Skeleton */}
      <Card className="p-6 md:p-8 space-y-8 border-white/10">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>

        {/* Steps Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-white/10 pb-6 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-6 w-6" />
              </div>
              <div className="pl-12 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>

        {/* Completion Button Skeleton */}
        <div className="pt-6">
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      </Card>
    </div>
  )
}
