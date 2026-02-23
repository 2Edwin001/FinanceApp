import ExpenseForm from '../components/gastos/ExpenseForm'
import BudgetList from '../components/gastos/BudgetList'
import TransactionList from '../components/gastos/TransactionList'
import { useTransactions } from '../hooks/useTransactions'
import { useBudgets } from '../hooks/useBudgets'
import { useToast } from '../context/ToastContext'

export default function Expenses() {
  const { addTransaction, deleteTransaction, getTransactionsByMonth } = useTransactions()
  const { updateBudget, getBudgetUsage } = useBudgets()
  const { addToast } = useToast()

  const now = new Date()
  const monthTransactions = getTransactionsByMonth(now.getFullYear(), now.getMonth() + 1)
  const budgetUsage = getBudgetUsage(monthTransactions)

  function handleAdd(data) {
    addTransaction(data)
    addToast({ message: 'Gasto agregado correctamente', type: 'success' })
  }

  function handleDelete(id) {
    deleteTransaction(id)
    addToast({ message: 'Transacción eliminada', type: 'danger' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Gastos & Presupuesto</h1>
        <p className="text-slate-400 text-sm mt-0.5 capitalize">
          {now.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <ExpenseForm onAdd={handleAdd} />
      <BudgetList budgetUsage={budgetUsage} onUpdateLimit={updateBudget} />
      <TransactionList transactions={monthTransactions} onDelete={handleDelete} />
    </div>
  )
}
