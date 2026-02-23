import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { formatCurrency } from '../../utils/format'

function miniBarColor(pct) {
  if (pct >= 100) return 'bg-emerald-400'
  if (pct >= 70) return 'bg-emerald-500'
  return 'bg-indigo-500'
}

export default function GoalsSummary({ goals }) {
  const active = goals.filter(g => g.current < g.target).slice(0, 3)

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-base">Metas de ahorro</h2>
        <Link
          to="/metas"
          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Ver metas <ArrowRight size={12} />
        </Link>
      </div>

      {active.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">Sin metas activas.</p>
      ) : (
        <div className="space-y-5">
          {active.map(g => {
            const pct = g.target > 0 ? Math.min((g.current / g.target) * 100, 100) : 0
            return (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg flex-shrink-0">{g.emoji}</span>
                    <span className="text-sm text-white font-medium truncate">{g.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{pct.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${miniBarColor(pct)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{formatCurrency(g.current)}</span>
                  <span>{formatCurrency(g.target)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
