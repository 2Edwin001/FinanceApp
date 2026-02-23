import { useState, useEffect } from 'react'
import { DollarSign, BarChart2, Target, CalendarDays } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { useBudgets } from '../hooks/useBudgets'
import { useGoals } from '../hooks/useGoals'
import StatCard from '../components/dashboard/StatCard'
import SpendingBarChart from '../components/dashboard/SpendingBarChart'
import CategoryDonutChart from '../components/dashboard/CategoryDonutChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import GoalsSummary from '../components/dashboard/GoalsSummary'
import SkeletonDashboard from '../components/dashboard/SkeletonDashboard'
import { formatCurrency } from '../utils/format'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const { transactions, getTransactionsByMonth } = useTransactions()
  const { getBudgetUsage } = useBudgets()
  const { goals } = useGoals()

  const now = new Date()
  const monthTransactions = getTransactionsByMonth(now.getFullYear(), now.getMonth() + 1)
  const budgetUsage = getBudgetUsage(monthTransactions)

  const totalMonth = monthTransactions.reduce((sum, tx) => sum + tx.amount, 0)

  const usageValues = Object.values(budgetUsage)
  const avgBudgetPct =
    usageValues.length > 0
      ? usageValues.reduce((sum, b) => sum + b.percentage, 0) / usageValues.length
      : 0

  const activeGoals = goals.filter(g => g.current < g.target).length

  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const daysLeft = daysInMonth - now.getDate()

  const dateLabel = now.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  if (loading) return <SkeletonDashboard />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-0.5 capitalize">{dateLabel}</p>
      </div>

      {/* Fila 1: Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          label="Total gastado este mes"
          value={formatCurrency(totalMonth)}
          iconBg="bg-indigo-500/15"
          iconText="text-indigo-400"
        />
        <StatCard
          icon={BarChart2}
          label="Presupuesto usado"
          value={`${avgBudgetPct.toFixed(0)}%`}
          sub="promedio por categoría"
          iconBg="bg-amber-500/15"
          iconText="text-amber-400"
        />
        <StatCard
          icon={Target}
          label="Metas activas"
          value={activeGoals}
          sub={`de ${goals.length} en total`}
          iconBg="bg-emerald-500/15"
          iconText="text-emerald-400"
        />
        <StatCard
          icon={CalendarDays}
          label="Días restantes del mes"
          value={daysLeft}
          sub="hasta fin de mes"
          iconBg="bg-sky-500/15"
          iconText="text-sky-400"
        />
      </div>

      {/* Fila 2: Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <SpendingBarChart transactions={transactions} />
        </div>
        <div className="lg:col-span-2">
          <CategoryDonutChart transactions={monthTransactions} />
        </div>
      </div>

      {/* Fila 3: Recientes + Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentTransactions transactions={transactions} />
        <GoalsSummary goals={goals} />
      </div>
    </div>
  )
}
