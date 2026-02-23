import { Search, Download } from 'lucide-react'
import { CATEGORY_NAMES } from '../../data/categories'
import { INCOME_TYPES } from '../../hooks/useIncomes'
import { formatCurrency } from '../../utils/format'

export default function HistoryFilters({
  viewType,
  onViewTypeChange,
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
  const isIncomes = viewType === 'incomes'

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-3">
      {/* Toggle Gastos / Ingresos */}
      <div className="flex gap-1 bg-slate-900 rounded-lg p-1 w-fit">
        <button
          onClick={() => onViewTypeChange('expenses')}
          className={`px-4 py-1.5 text-xs rounded-md font-medium transition-colors ${
            !isIncomes ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Gastos
        </button>
        <button
          onClick={() => onViewTypeChange('incomes')}
          className={`px-4 py-1.5 text-xs rounded-md font-medium transition-colors ${
            isIncomes ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Ingresos
        </button>
      </div>

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

        {/* Categoría / Tipo */}
        <select
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="Todas">{isIncomes ? 'Todos los tipos' : 'Todas las categorías'}</option>
          {isIncomes
            ? INCOME_TYPES.map(t => (
                <option key={t.value} value={t.label}>{t.label}</option>
              ))
            : CATEGORY_NAMES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))
          }
        </select>

        {/* Búsqueda */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
          <Search size={14} className="ml-3 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            value={searchText}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={isIncomes ? 'Buscar por descripción...' : 'Buscar por nota...'}
            className="flex-1 bg-transparent py-2 px-2 text-white text-sm outline-none placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Contador + Exportar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-slate-400">
          <span className="text-white font-medium">{count}</span>{' '}
          {isIncomes ? 'ingreso' : 'transacción'}{count !== 1 ? 'es' : ''} ·{' '}
          Total:{' '}
          <span className={`font-medium ${isIncomes ? 'text-emerald-400' : 'text-red-400'}`}>
            {isIncomes ? '+' : ''}{formatCurrency(total)}
          </span>
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
