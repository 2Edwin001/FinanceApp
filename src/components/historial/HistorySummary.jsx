import { CATEGORY_MAP } from '../../data/categories'
import { formatCurrency } from '../../utils/format'

export default function HistorySummary({ transactions }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0)
  const avg = transactions.length > 0 ? total / transactions.length : 0

  // Categoría con mayor gasto
  const byCategory = {}
  for (const tx of transactions) {
    byCategory[tx.category] = (byCategory[tx.category] || 0) + tx.amount
  }
  const topEntry = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]
  const catData = topEntry ? CATEGORY_MAP[topEntry[0]] : null
  const TopIcon = catData?.icon
  const topColor = catData?.color

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:divide-x sm:divide-slate-700">
        <div className="sm:pr-4">
          <p className="text-xs text-slate-400 mb-1">Total del período</p>
          <p className="text-lg font-bold text-white font-mono">{formatCurrency(total)}</p>
        </div>

        <div className="sm:px-4">
          <p className="text-xs text-slate-400 mb-1">Mayor categoría</p>
          {topEntry ? (
            <div className="flex items-center gap-2">
              {TopIcon && (
                <div className={`w-6 h-6 rounded-md ${topColor.bg} ${topColor.border} border flex items-center justify-center flex-shrink-0`}>
                  <TopIcon size={12} className={topColor.text} />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-white leading-tight">{topEntry[0]}</p>
                <p className="text-xs text-slate-500">{formatCurrency(topEntry[1])}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">—</p>
          )}
        </div>

        <div className="sm:pl-4">
          <p className="text-xs text-slate-400 mb-1">Promedio por transacción</p>
          <p className="text-lg font-bold text-white font-mono">{formatCurrency(avg)}</p>
        </div>
      </div>
    </div>
  )
}
