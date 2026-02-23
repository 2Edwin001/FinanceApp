import IncomeItem from './IncomeItem'
import { formatCurrency } from '../../utils/format'

export default function IncomeList({ incomes, onDelete }) {
  const total = incomes.reduce((sum, i) => sum + i.amount, 0)

  return (
    <div>
      <h2 className="text-white font-semibold text-base mb-3">Ingresos del mes</h2>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        {incomes.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">
            Sin ingresos registrados este mes.
          </p>
        ) : (
          incomes.map(income => (
            <IncomeItem key={income.id} income={income} onDelete={onDelete} />
          ))
        )}

        {incomes.length > 0 && (
          <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-700">
            <span className="text-xs text-slate-400">
              {incomes.length} ingreso{incomes.length !== 1 ? 's' : ''}
            </span>
            <span className="text-sm font-semibold text-emerald-400">{formatCurrency(total)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
