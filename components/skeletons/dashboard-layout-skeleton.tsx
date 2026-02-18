import { Skeleton } from "@/components/ui/skeleton"

export function DashboardLayoutSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Mobile Nav Skeleton */}
      <nav className="fixed w-full z-50 glass-panel border-b-0 py-3 px-4 md:px-8 flex justify-between items-center md:hidden">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </nav>

      {/* Sidebar Skeleton */}
      <aside className="fixed md:relative top-16 md:top-0 w-64 h-full glass-panel border-r border-t-0 border-l-0 border-white/10 hidden md:block">
        <div className="py-6 flex flex-col gap-1 h-full overflow-y-auto">
          {/* Home Link Skeleton */}
          <div className="px-6 py-3 flex items-center gap-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Modules Section Header */}
          <div className="px-6 py-3 mt-4">
            <Skeleton className="h-3 w-24" />
          </div>

          {/* Modules Accordion Skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-6 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}

          {/* Bottom Links Skeleton */}
          <div className="mt-auto pb-6">
             <div className="px-6 py-3 flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="px-6 py-3 flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 relative overflow-y-auto pt-20 md:pt-8 pb-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
