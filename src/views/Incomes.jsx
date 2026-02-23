import { useIncomes } from '../hooks/useIncomes'
import { useTransactions } from '../hooks/useTransactions'
import { useToast } from '../context/ToastContext'
import IncomeForm from '../components/ingresos/IncomeForm'
import IncomeSummary from '../components/ingresos/IncomeSummary'
import IncomeList from '../components/ingresos/IncomeList'

export default function Incomes() {
  const { addIncome, deleteIncome, getIncomesByMonth } = useIncomes()
  const { getTransactionsByMonth } = useTransactions()
  const { addToast } = useToast()

  const now = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth() + 1

  const monthIncomes      = getIncomesByMonth(year, month)
  const monthTransactions = getTransactionsByMonth(year, month)

  const incomeTotal  = monthIncomes.reduce((sum, i) => sum + i.amount, 0)
  const expenseTotal = monthTransactions.reduce((sum, t) => sum + t.amount, 0)

  function handleAdd(data) {
    addIncome(data)
    addToast({ message: 'Ingreso registrado correctamente', type: 'success' })
  }

  function handleDelete(id) {
    deleteIncome(id)
    addToast({ message: 'Ingreso eliminado', type: 'danger' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Ingresos</h1>
        <p className="text-slate-400 text-sm mt-0.5 capitalize">
          {now.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <IncomeForm onAdd={handleAdd} />
      <IncomeSummary incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      <IncomeList incomes={monthIncomes} onDelete={handleDelete} />
    </div>
  )
}
