function SkeletonBlock({ className }) {
  return <div className={`bg-slate-700/60 rounded-lg animate-pulse ${className}`} />
}

export default function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="space-y-2">
        <SkeletonBlock className="h-6 w-28" />
        <SkeletonBlock className="h-4 w-48" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 flex items-center gap-4"
          >
            <SkeletonBlock className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <SkeletonBlock className="h-3 w-24" />
              <SkeletonBlock className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
          <SkeletonBlock className="h-4 w-40 mb-4" />
          <SkeletonBlock className="h-48 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
          <SkeletonBlock className="h-4 w-32 mb-4" />
          <SkeletonBlock className="h-48 w-full rounded-xl" />
        </div>
      </div>

      {/* Recientes + Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4"
          >
            <SkeletonBlock className="h-4 w-32" />
            {Array.from({ length: 4 }).map((__, j) => (
              <div key={j} className="flex items-center gap-3">
                <SkeletonBlock className="w-8 h-8 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <SkeletonBlock className="h-3 w-3/4" />
                  <SkeletonBlock className="h-2.5 w-1/2" />
                </div>
                <SkeletonBlock className="h-4 w-16" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
