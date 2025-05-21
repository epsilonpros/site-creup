// Base skeleton block component
export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
}

// Base skeleton line component
export function SkeletonLine({ lines = 1 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array(lines)
        .fill(0)
        .map((_, i) => (
          <SkeletonBlock key={i} className="h-4" />
        ))}
    </div>
  )
}

// Base skeleton container component
export function SkeletonContainer({
  children,
  className = '',
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 ${className}`}>{children}</div>
  )
}

// Adding new skeleton component for project details
export function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative h-[70vh] bg-gray-900">
        <SkeletonBlock className="h-full w-full opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-3xl space-y-6">
              <SkeletonBlock className="h-8 w-32 rounded-full" />
              <SkeletonBlock className="h-16 w-2/3" />
              <div className="flex gap-4">
                <SkeletonBlock className="h-6 w-24 rounded-full" />
                <SkeletonBlock className="h-6 w-24 rounded-full" />
                <SkeletonBlock className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div>
              <SkeletonBlock className="mb-8 h-8 w-48" />
              <SkeletonLine lines={3} />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <SkeletonContainer />
              <SkeletonContainer />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonContainer key={i} className="h-32" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonBlock key={i} className="aspect-video" />
              ))}
            </div>
          </div>
          <div>
            <SkeletonContainer className="sticky top-24">
              <SkeletonLine lines={4} />
              <div className="mt-8 border-t pt-8">
                <SkeletonBlock className="h-12 w-full rounded-lg" />
              </div>
            </SkeletonContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// Partner skeleton component
export function PartnerSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`group flex h-32 flex-col items-center justify-center rounded-lg ${dark ? 'bg-white/5 backdrop-blur-sm' : 'bg-white'} p-8 ${dark ? '' : 'shadow-sm'} transition-all ${dark ? 'hover:bg-white/10' : 'hover:shadow-md'}`}
    >
      {/* <SkeletonBlock className={`mb-4 h-12 w-32 ${dark ? 'bg-white/20' : ''}`} />
      <SkeletonBlock className={`h-4 w-24 ${dark ? 'bg-white/20' : ''}`} /> */}
    </div>
  )
}

// Project skeleton component
export function ProjectSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="aspect-w-16 aspect-h-9">
        <SkeletonBlock className="h-full w-full" />
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          <SkeletonBlock className="h-4 w-24" />
        </div>
        <SkeletonBlock className="mb-2 h-6 w-48" />
        <SkeletonBlock className="mb-4 h-4 w-full" />
        <SkeletonBlock className="h-4 w-24" />
      </div>
    </div>
  )
}

// Service skeleton component
export function ServiceSkeleton() {
  return (
    <div className="group relative rounded-xl bg-white p-6 shadow-lg">
      <SkeletonBlock className="h-12 w-12 rounded-lg" />
      <div className="mt-8">
        <SkeletonBlock className="mb-2 h-6 w-32" />
        <SkeletonLine lines={2} />
      </div>
      <SkeletonBlock className="mt-6 h-4 w-24" />
    </div>
  )
}

// Stat skeleton component
export function StatSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl border ${dark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white'} p-8 backdrop-blur-sm`}
    >
      <SkeletonBlock className={`mb-4 h-8 w-8 ${dark ? 'bg-white/20' : ''}`} />
      <SkeletonBlock className={`mb-2 h-6 w-24 ${dark ? 'bg-white/20' : ''}`} />
      <SkeletonBlock className={`h-4 w-32 ${dark ? 'bg-white/20' : ''}`} />
    </div>
  )
}
