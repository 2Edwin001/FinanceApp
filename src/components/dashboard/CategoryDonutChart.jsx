import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { CATEGORY_COLORS } from '../../data/categories'
import { formatCurrency } from '../../utils/format'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-xs text-slate-400 mb-1">{payload[0].name}</p>
      <p className="text-sm font-semibold text-white">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-1">
      {payload.map(entry => (
        <div key={entry.value} className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function CategoryDonutChart({ transactions }) {
  const byCategory = {}
  for (const tx of transactions) {
    byCategory[tx.category] = (byCategory[tx.category] || 0) + tx.amount
  }
  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }))

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 h-full">
      <h2 className="text-white font-semibold text-base mb-2">Por categoría</h2>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
          Sin gastos este mes
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="42%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map(entry => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] ?? '#64748b'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
