import { useState } from 'react'
import TransactionItem from './TransactionItem'
import { CATEGORY_NAMES } from '../../data/categories'
import { formatCurrency } from '../../utils/format'

export default function TransactionList({ transactions, onDelete }) {
  const [filterCategory, setFilterCategory] = useState('Todas')

  const filtered =
    filterCategory === 'Todas'
      ? transactions
      : transactions.filter(tx => tx.category === filterCategory)

  const total = filtered.reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-white font-semibold text-base">Gastos del mes</h2>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg py-1.5 px-3 text-white text-xs outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="Todas">Todas las categorías</option>
          {CATEGORY_NAMES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        {filtered.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">
            Sin gastos este mes{filterCategory !== 'Todas' ? ` en ${filterCategory}` : ''}.
          </p>
        ) : (
          filtered.map(tx => (
            <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} />
          ))
        )}

        {filtered.length > 0 && (
          <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-700">
            <span className="text-xs text-slate-400">
              {filtered.length} transacción{filtered.length !== 1 ? 'es' : ''}
            </span>
            <span className="text-sm font-semibold text-red-400">{formatCurrency(total)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
