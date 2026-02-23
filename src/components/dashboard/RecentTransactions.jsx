import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORY_MAP } from '../../data/categories'
import { formatCurrency, formatDate } from '../../utils/format'

export default function RecentTransactions({ transactions }) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date + 'T12:00:00') - new Date(a.date + 'T12:00:00'))
    .slice(0, 5)

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-base">Últimos gastos</h2>
        <Link
          to="/historial"
          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Ver todos <ArrowRight size={12} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">Sin transacciones registradas.</p>
      ) : (
        <div>
          {recent.map(tx => {
            const catData = CATEGORY_MAP[tx.category]
            const Icon = catData?.icon
            const color = catData?.color
            return (
              <div
                key={tx.id}
                className="flex items-center gap-3 py-2.5 border-b border-slate-700/50 last:border-0"
              >
                {Icon && (
                  <div
                    className={`w-8 h-8 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={14} className={color.text} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{tx.note || tx.category}</p>
                  <p className="text-xs text-slate-500">{formatDate(tx.date)}</p>
                </div>
                <span className="text-sm font-medium text-red-400 flex-shrink-0">
                  {formatCurrency(tx.amount)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
