import { useState, useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useToast } from '../context/ToastContext'
import HistoryFilters from '../components/historial/HistoryFilters'
import HistoryTable from '../components/historial/HistoryTable'
import HistorySummary from '../components/historial/HistorySummary'
import { exportToCSV } from '../utils/csvExport'

function getLast12Months() {
  const months = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
    months.push({ value, label })
  }
  return months
}

const MONTHS = getLast12Months()

export default function HistoryView() {
  const { transactions, deleteTransaction } = useTransactions()
  const { addToast } = useToast()

  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchText, setSearchText] = useState('')
  const [sortConfig, setSortConfig] = useState({ column: 'date', direction: 'desc' })

  const filtered = useMemo(() => {
    let result = [...transactions]

    // Filtrar por mes
    if (selectedMonth !== 'all') {
      const [year, month] = selectedMonth.split('-').map(Number)
      result = result.filter(tx => {
        const d = new Date(tx.date + 'T12:00:00')
        return d.getFullYear() === year && d.getMonth() + 1 === month
      })
    }

    // Filtrar por categoría
    if (selectedCategory !== 'Todas') {
      result = result.filter(tx => tx.category === selectedCategory)
    }

    // Filtrar por texto
    if (searchText.trim()) {
      const q = searchText.toLowerCase()
      result = result.filter(
        tx =>
          tx.note.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q)
      )
    }

    // Ordenar
    result.sort((a, b) => {
      const dir = sortConfig.direction === 'asc' ? 1 : -1
      if (sortConfig.column === 'date') {
        return dir * (new Date(a.date + 'T12:00:00') - new Date(b.date + 'T12:00:00'))
      }
      if (sortConfig.column === 'amount') {
        return dir * (a.amount - b.amount)
      }
      if (sortConfig.column === 'category') {
        return dir * a.category.localeCompare(b.category, 'es-CO')
      }
      return 0
    })

    return result
  }, [transactions, selectedMonth, selectedCategory, searchText, sortConfig])

  function handleSort(column) {
    setSortConfig(prev =>
      prev.column === column
        ? { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: 'desc' }
    )
  }

  function handleDelete(id) {
    deleteTransaction(id)
    addToast({ message: 'Transacción eliminada', type: 'danger' })
  }

  function handleExport() {
    const filename =
      selectedMonth === 'all'
        ? 'historial-financeapp-todo.csv'
        : `historial-financeapp-${selectedMonth}.csv`
    exportToCSV(filtered, filename)
  }

  const total = filtered.reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Historial</h1>
        <p className="text-slate-400 text-sm mt-0.5">Registro completo de transacciones</p>
      </div>

      <HistoryFilters
        months={MONTHS}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchText={searchText}
        onSearchChange={setSearchText}
        onExport={handleExport}
        count={filtered.length}
        total={total}
      />

      <HistoryTable
        transactions={filtered}
        sortConfig={sortConfig}
        onSort={handleSort}
        onDelete={handleDelete}
      />

      {filtered.length > 0 && <HistorySummary transactions={filtered} />}
    </div>
  )
}
