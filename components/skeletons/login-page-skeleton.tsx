import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function LoginPageSkeleton() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 relative bg-black overflow-hidden animate-pulse">
      {/* Background Decorative Circles Skeleton */}
      <div className="absolute w-64 h-64 rounded-full bg-rose-500/5 blur-[100px] top-10 left-10" />
      <div className="absolute w-64 h-64 rounded-full bg-emerald-500/5 blur-[100px] bottom-10 right-10" />

      {/* Login Card Skeleton */}
      <Card className="w-full max-w-md relative z-10 p-8 sm:p-10 border-white/10 bg-black/40 backdrop-blur-xl">
        {/* Logo/Title Skeleton */}
        <div className="text-center mb-10 space-y-3">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>

        {/* Form Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
          </div>

          <div className="pt-4">
            <Skeleton className="h-14 w-full rounded-md" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </Card>
    </main>
  )
}
