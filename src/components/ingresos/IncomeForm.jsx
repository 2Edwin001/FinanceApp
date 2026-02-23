import { useState } from 'react'
import { Plus } from 'lucide-react'
import { INCOME_TYPES } from '../../hooks/useIncomes'
import { fmtInput, digitsOnly } from '../../utils/format'

function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function IncomeForm({ onAdd }) {
  const [amount, setAmount]           = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate]               = useState(getTodayStr())
  const [type, setType]               = useState('salario')
  const [error, setError]             = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const n = Number(amount)
    if (!amount || isNaN(n) || n <= 0) {
      setError('Ingresa un monto válido mayor a 0.')
      return
    }
    if (!description.trim()) {
      setError('La descripción es requerida.')
      return
    }
    setError('')
    onAdd({ amount: n, description, date, type })
    setAmount('')
    setDescription('')
    setDate(getTodayStr())
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
      <h2 className="text-white font-semibold text-base">Registrar ingreso</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Monto */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Monto</label>
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
            <span className="px-3 text-slate-400 text-sm select-none">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={fmtInput(amount)}
              onChange={e => setAmount(digitsOnly(e.target.value))}
              placeholder="0"
              className="flex-1 bg-transparent py-2 pr-3 text-white text-sm outline-none placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Tipo</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
          >
            {INCOME_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Descripción</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Ej: Salario marzo"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus size={16} />
        Registrar ingreso
      </button>
    </form>
  )
}
