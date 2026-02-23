import { formatCurrency } from '../../utils/format'

export default function IncomeSummary({ incomeTotal, expenseTotal }) {
  const balance  = incomeTotal - expenseTotal
  const spentPct = incomeTotal > 0 ? (expenseTotal / incomeTotal) * 100 : null

  const balancePositive = balance >= 0

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
      <h2 className="text-white font-semibold text-base mb-4">Resumen del mes</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Ingresos */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
          <p className="text-xs text-slate-400 mb-1">Ingresos</p>
          <p className="text-base font-bold text-emerald-400 font-mono leading-tight">
            {formatCurrency(incomeTotal)}
          </p>
        </div>

        {/* Gastos */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <p className="text-xs text-slate-400 mb-1">Gastos</p>
          <p className="text-base font-bold text-red-400 font-mono leading-tight">
            {formatCurrency(expenseTotal)}
          </p>
        </div>

        {/* Balance */}
        <div className={`border rounded-xl p-3 ${balancePositive ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
          <p className="text-xs text-slate-400 mb-1">Balance neto</p>
          <p className={`text-base font-bold font-mono leading-tight ${balancePositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {balancePositive ? '+' : ''}{formatCurrency(balance)}
          </p>
        </div>

        {/* % gastado */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
          <p className="text-xs text-slate-400 mb-1">% gastado</p>
          <p className="text-base font-bold text-indigo-400 font-mono leading-tight">
            {spentPct !== null ? `${spentPct.toFixed(0)}%` : '—'}
          </p>
          {spentPct !== null && (
            <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${spentPct >= 100 ? 'bg-red-500' : spentPct >= 80 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(spentPct, 100)}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
