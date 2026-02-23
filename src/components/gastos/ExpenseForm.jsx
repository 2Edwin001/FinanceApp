import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CATEGORY_NAMES } from '../../data/categories'
import { fmtInput, digitsOnly } from '../../utils/format'

function getTodayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORY_NAMES[0])
  const [date, setDate] = useState(getTodayStr())
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const n = Number(amount)
    if (!amount || isNaN(n) || n <= 0) {
      setError('Ingresa un monto válido mayor a 0.')
      return
    }
    setError('')
    onAdd({ amount: n, category, date, note })
    setAmount('')
    setNote('')
    setDate(getTodayStr())
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
      <h2 className="text-white font-semibold text-base">Registrar gasto</h2>

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

        {/* Categoría */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Categoría</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
          >
            {CATEGORY_NAMES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
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

        {/* Nota */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Nota <span className="text-slate-600">(opcional)</span>
          </label>
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Descripción breve..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        type="submit"
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus size={16} />
        Agregar gasto
      </button>
    </form>
  )
}
