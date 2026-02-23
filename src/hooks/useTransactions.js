import { useLocalStorage } from './useLocalStorage'

function generateId() {
  return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage('transactions', [])

  function addTransaction({ amount, category, date, note }) {
    const tx = {
      id: generateId(),
      amount: Number(amount),
      category,
      date,
      note: note || '',
      type: 'expense',
    }
    setTransactions(prev => [tx, ...prev])
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  function getTransactionsByMonth(year, month) {
    return transactions.filter(tx => {
      const d = new Date(tx.date + 'T12:00:00')
      return d.getFullYear() === year && d.getMonth() + 1 === month
    })
  }

  function getTransactionsByCategory(category) {
    return transactions.filter(tx => tx.category === category)
  }

  return { transactions, addTransaction, deleteTransaction, getTransactionsByMonth, getTransactionsByCategory }
}
