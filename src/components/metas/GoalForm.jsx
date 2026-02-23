import { useState } from 'react'
import { Plus } from 'lucide-react'
import { fmtInput, digitsOnly } from '../../utils/format'

function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function GoalForm({ onAdd }) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🎯')
  const [target, setTarget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!name.trim()) errs.name = 'El nombre es requerido.'
    const n = Number(target)
    if (!target || isNaN(n) || n <= 0) errs.target = 'Ingresa un monto válido mayor a 0.'
    if (!deadline) {
      errs.deadline = 'La fecha límite es requerida.'
    } else {
      const d = new Date(deadline + 'T12:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (d <= today) errs.deadline = 'La fecha debe ser futura.'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    onAdd({
      name: name.trim(),
      emoji: emoji.trim() || '🎯',
      target: Number(target),
      deadline,
    })
    setName('')
    setEmoji('🎯')
    setTarget('')
    setDeadline('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4"
    >
      <h2 className="text-white font-semibold text-base">Nueva meta de ahorro</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Nombre */}
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">Nombre de la meta</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ej: Fondo de emergencia"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Emoji */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Emoji <span className="text-slate-600">(opcional)</span>
          </label>
          <input
            type="text"
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
            placeholder="🎯"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
          />
        </div>

        {/* Monto objetivo */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Monto objetivo</label>
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
            <span className="px-3 text-slate-400 text-sm select-none">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={fmtInput(target)}
              onChange={e => setTarget(digitsOnly(e.target.value))}
              placeholder="0"
              className="flex-1 bg-transparent py-2 pr-3 text-white text-sm outline-none placeholder:text-slate-600"
            />
          </div>
          {errors.target && <p className="text-red-400 text-xs mt-1">{errors.target}</p>}
        </div>

        {/* Fecha límite */}
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">Fecha límite</label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
          />
          {errors.deadline && <p className="text-red-400 text-xs mt-1">{errors.deadline}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus size={16} />
        Crear meta
      </button>
    </form>
  )
}
