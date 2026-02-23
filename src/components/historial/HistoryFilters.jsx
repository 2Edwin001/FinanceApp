import { Search, Download } from 'lucide-react'
import { CATEGORY_NAMES } from '../../data/categories'
import { formatCurrency } from '../../utils/format'

export default function HistoryFilters({
  months,
  selectedMonth,
  onMonthChange,
  selectedCategory,
  onCategoryChange,
  searchText,
  onSearchChange,
  onExport,
  count,
  total,
}) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Mes */}
        <select
          value={selectedMonth}
          onChange={e => onMonthChange(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors capitalize"
        >
          <option value="all">Todos los meses</option>
          {months.map(m => (
            <option key={m.value} value={m.value} className="capitalize">
              {m.label}
            </option>
          ))}
        </select>

        {/* Categoría */}
        <select
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="Todas">Todas las categorías</option>
          {CATEGORY_NAMES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Búsqueda */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
          <Search size={14} className="ml-3 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            value={searchText}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar por nota..."
            className="flex-1 bg-transparent py-2 px-2 text-white text-sm outline-none placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Contador + Exportar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-slate-400">
          <span className="text-white font-medium">{count}</span>{' '}
          transacción{count !== 1 ? 'es' : ''} ·{' '}
          Total:{' '}
          <span className="text-red-400 font-medium">{formatCurrency(total)}</span>
        </p>
        <button
          onClick={onExport}
          disabled={count === 0}
          className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={13} />
          Exportar CSV
        </button>
      </div>
    </div>
  )
}
