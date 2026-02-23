import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, Trash2, TrendingUp } from 'lucide-react'
import { CATEGORY_MAP } from '../../data/categories'
import { formatCurrency, formatDate } from '../../utils/format'

function SortIcon({ column, sortConfig }) {
  if (sortConfig.column !== column) {
    return <ChevronsUpDown size={12} className="text-slate-600" />
  }
  return sortConfig.direction === 'asc'
    ? <ChevronUp size={12} className="text-indigo-400" />
    : <ChevronDown size={12} className="text-indigo-400" />
}

function HistoryRow({ tx, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const isIncome = !!tx.isIncome
  const catData  = isIncome ? null : CATEGORY_MAP[tx.category]
  const Icon     = isIncome ? TrendingUp : catData?.icon
  const color    = isIncome
    ? { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' }
    : catData?.color

  return (
    <tr className="border-b border-slate-700/40 hover:bg-slate-700/20 transition-colors group">
      {/* Categoría / Tipo */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          {Icon && color && (
            <div className={`w-7 h-7 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0`}>
              <Icon size={13} className={color.text} />
            </div>
          )}
          <span className="text-sm text-slate-300 whitespace-nowrap">{tx.category}</span>
        </div>
      </td>
      {/* Nota / Descripción */}
      <td className="py-3 px-4 max-w-[200px]">
        <span className="text-sm text-white truncate block">{tx.note || '—'}</span>
      </td>
      {/* Fecha */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="text-sm text-slate-400">{formatDate(tx.date)}</span>
      </td>
      {/* Monto */}
      <td className="py-3 px-4 text-right whitespace-nowrap">
        <span className={`text-sm font-medium ${isIncome ? 'text-emerald-400' : 'text-red-400'}`}>
          {isIncome ? '+' : ''}{formatCurrency(tx.amount)}
        </span>
      </td>
      {/* Acciones */}
      <td className="py-3 px-4 text-right">
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-slate-600 hover:text-red-400 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        ) : (
          <div className="flex items-center justify-end gap-2 text-xs">
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
      </td>
    </tr>
  )
}

const COLS = [
  { key: 'category', label: 'Categoría', sortable: true, right: false },
  { key: 'note',     label: 'Nota',      sortable: false, right: false },
  { key: 'date',     label: 'Fecha',     sortable: true,  right: false },
  { key: 'amount',   label: 'Monto',     sortable: true,  right: true  },
  { key: 'actions',  label: '',          sortable: false,  right: true  },
]

export default function HistoryTable({ transactions, sortConfig, onSort, onDelete }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              {COLS.map(col => (
                <th
                  key={col.key}
                  className={`py-3 px-4 text-xs font-medium text-slate-400 ${col.right ? 'text-right' : 'text-left'}`}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => onSort(col.key)}
                      className={`flex items-center gap-1 hover:text-slate-200 transition-colors ${col.right ? 'ml-auto' : ''}`}
                    >
                      {col.label}
                      <SortIcon column={col.key} sortConfig={sortConfig} />
                    </button>
                  ) : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-slate-500 text-sm">
                  No hay transacciones que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              transactions.map(tx => (
                <HistoryRow key={tx.id} tx={tx} onDelete={onDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
