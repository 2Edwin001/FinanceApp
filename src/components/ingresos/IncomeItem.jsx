import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { INCOME_TYPE_MAP } from '../../hooks/useIncomes'
import { formatCurrency, formatDate } from '../../utils/format'

export default function IncomeItem({ income, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const typeData = INCOME_TYPE_MAP[income.type] ?? INCOME_TYPE_MAP.otro

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-700/50 last:border-0">
      {/* Badge tipo */}
      <span className={`text-xs font-medium px-2.5 py-1 rounded-md border flex-shrink-0 ${typeData.bg} ${typeData.border} ${typeData.text}`}>
        {typeData.label}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{income.description}</p>
        <p className="text-xs text-slate-500">{formatDate(income.date)}</p>
      </div>

      <span className="text-sm font-medium text-emerald-400 flex-shrink-0">
        +{formatCurrency(income.amount)}
      </span>

      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
          title="Eliminar"
        >
          <Trash2 size={15} />
        </button>
      ) : (
        <div className="flex items-center gap-2 text-xs flex-shrink-0">
          <button onClick={() => onDelete(income.id)} className="text-red-400 hover:text-red-300 font-medium">
            Eliminar
          </button>
          <span className="text-slate-600">|</span>
          <button onClick={() => setConfirmDelete(false)} className="text-slate-400 hover:text-slate-300">
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}
