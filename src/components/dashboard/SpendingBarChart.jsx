import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { formatCurrency } from '../../utils/format'

function getLast6MonthsData(transactions) {
  const now = new Date()
  const result = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const raw = d.toLocaleDateString('es-CO', { month: 'short' })
    const label = raw.charAt(0).toUpperCase() + raw.slice(1).replace('.', '')
    const total = transactions
      .filter(tx => {
        const td = new Date(tx.date + 'T12:00:00')
        return td.getFullYear() === year && td.getMonth() + 1 === month
      })
      .reduce((sum, tx) => sum + tx.amount, 0)
    result.push({ month: label, total })
  }
  return result
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-white">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

function yTickFormatter(v) {
  if (v === 0) return '0'
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}k`
  return `$${v}`
}

export default function SpendingBarChart({ transactions }) {
  const data = getLast6MonthsData(transactions)

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 h-full">
      <h2 className="text-white font-semibold text-base mb-4">Gastos últimos 6 meses</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="35%" margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', radius: 6 }} />
          <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
