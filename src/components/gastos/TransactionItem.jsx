import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { CATEGORY_MAP } from '../../data/categories'
import { formatCurrency, formatDate } from '../../utils/format'

export default function TransactionItem({ tx, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const catData = CATEGORY_MAP[tx.category]
  const Icon = catData?.icon
  const color = catData?.color

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-700/50 last:border-0">
      {Icon && (
        <div className={`w-9 h-9 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0`}>
          <Icon size={16} className={color.text} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{tx.note || tx.category}</p>
        <p className="text-xs text-slate-500">{formatDate(tx.date)}</p>
      </div>

      <span className="text-sm font-medium text-red-400 flex-shrink-0">{formatCurrency(tx.amount)}</span>

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
          <button
            onClick={() => onDelete(tx.id)}
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Eliminar
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-slate-400 hover:text-slate-300"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}
