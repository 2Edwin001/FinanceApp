import { useState, useEffect } from 'react'
import { Check, X, Pencil } from 'lucide-react'
import { CATEGORY_MAP } from '../../data/categories'
import { formatCurrency, fmtInput, digitsOnly } from '../../utils/format'

function barColor(pct) {
  if (pct < 70) return 'bg-emerald-500'
  if (pct < 90) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function BudgetCard({ category, spent, limit, percentage, onUpdateLimit }) {
  const [mounted, setMounted] = useState(false)
  const [editing, setEditing] = useState(false)
  const [inputVal, setInputVal] = useState(String(Math.round(limit)))

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setInputVal(String(Math.round(limit)))
  }, [limit])

  const catData = CATEGORY_MAP[category]
  const Icon = catData?.icon
  const color = catData?.color

  function handleSave() {
    const n = Number(inputVal)
    if (!isNaN(n) && n >= 0) {
      onUpdateLimit(category, n)
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={`w-8 h-8 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center`}>
              <Icon size={16} className={color.text} />
            </div>
          )}
          <span className="text-sm font-medium text-white">{category}</span>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="text-slate-500 hover:text-slate-300 transition-colors"
            title="Editar límite"
          >
            <Pencil size={14} />
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <input
              type="text"
              inputMode="numeric"
              value={fmtInput(inputVal)}
              onChange={e => setInputVal(digitsOnly(e.target.value))}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-28 bg-slate-900 border border-indigo-500 rounded px-2 py-0.5 text-white text-xs outline-none"
            />
            <button onClick={handleSave} className="text-emerald-400 hover:text-emerald-300">
              <Check size={14} />
            </button>
            <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-red-400">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor(percentage)}`}
          style={{ width: mounted ? `${percentage}%` : '0%' }}
        />
      </div>

      <div className="flex justify-between text-xs">
        <span className="text-slate-400">
          {formatCurrency(spent)} <span className="text-slate-600">gastado</span>
        </span>
        <span className="text-slate-400">
          {formatCurrency(limit)} <span className="text-slate-600">límite</span>
        </span>
      </div>
    </div>
  )
}
