import { useState, useEffect } from 'react'
import { Trash2, Check, X } from 'lucide-react'
import { formatCurrency } from '../../utils/format'

function barColor(pct) {
  if (pct >= 100) return 'bg-emerald-400'
  if (pct >= 70) return 'bg-emerald-500'
  return 'bg-indigo-500'
}

export default function GoalCard({ goal, onDelete, onContribute }) {
  const [mounted, setMounted] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [contributing, setContributing] = useState(false)
  const [contribAmount, setContribAmount] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const pct = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0
  const isComplete = pct >= 100
  const remaining = Math.max(goal.target - goal.current, 0)

  const deadline = new Date(goal.deadline + 'T12:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))

  function handleContribute() {
    const n = parseFloat(contribAmount)
    if (isNaN(n) || n <= 0) return
    onContribute(goal.id, n)
    setContribAmount('')
    setContributing(false)
  }

  function cancelContrib() {
    setContributing(false)
    setContribAmount('')
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl flex-shrink-0">{goal.emoji}</span>
          <div className="min-w-0">
            <h3 className="text-white font-semibold truncate">{goal.name}</h3>
            {isComplete && (
              <span className="inline-block text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 mt-1">
                ¡Meta alcanzada! 🎉
              </span>
            )}
          </div>
        </div>

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0 mt-1"
            title="Eliminar meta"
          >
            <Trash2 size={15} />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs flex-shrink-0">
            <button
              onClick={() => onDelete(goal.id)}
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

      {/* Progreso */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300 font-medium">{formatCurrency(goal.current)} ahorrado</span>
          <span className="text-slate-500">{pct.toFixed(0)}%</span>
        </div>
        <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor(pct)}`}
            style={{ width: mounted ? `${pct}%` : '0%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Faltan {formatCurrency(remaining)}</span>
          <span className="text-right">
            {daysLeft > 0
              ? `${daysLeft} día${daysLeft !== 1 ? 's' : ''} restantes`
              : daysLeft === 0
              ? 'Vence hoy'
              : 'Fecha vencida'}
          </span>
        </div>
        <p className="text-xs text-slate-600">Objetivo: {formatCurrency(goal.target)}</p>
      </div>

      {/* Aportación */}
      {!isComplete && (
        <div className="mt-auto">
          {!contributing ? (
            <button
              onClick={() => setContributing(true)}
              className="w-full text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 rounded-lg py-2 transition-all"
            >
              + Agregar aportación
            </button>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1 flex items-center bg-slate-900 border border-indigo-500 rounded-lg overflow-hidden">
                <span className="px-2 text-slate-400 text-sm select-none">$</span>
                <input
                  type="number"
                  min="1"
                  step="1000"
                  value={contribAmount}
                  onChange={e => setContribAmount(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleContribute()
                    if (e.key === 'Escape') cancelContrib()
                  }}
                  autoFocus
                  placeholder="0"
                  className="flex-1 bg-transparent py-2 pr-2 text-white text-sm outline-none placeholder:text-slate-600"
                />
              </div>
              <button
                onClick={handleContribute}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 rounded-lg transition-colors"
              >
                <Check size={16} />
              </button>
              <button
                onClick={cancelContrib}
                className="text-slate-400 hover:text-slate-300 px-2"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
