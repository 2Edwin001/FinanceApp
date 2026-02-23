import { useState, useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useIncomes, INCOME_TYPE_MAP } from '../hooks/useIncomes'
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
  const { incomes, deleteIncome }           = useIncomes()
  const { addToast }                        = useToast()

  const [viewType, setViewType]               = useState('expenses')
  const [selectedMonth, setSelectedMonth]     = useState(MONTHS[0].value)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchText, setSearchText]           = useState('')
  const [sortConfig, setSortConfig]           = useState({ column: 'date', direction: 'desc' })

  // Normalizar ingresos al mismo formato que transacciones para reutilizar la tabla
  const normalizedIncomes = useMemo(() =>
    incomes.map(i => ({
      ...i,
      category: INCOME_TYPE_MAP[i.type]?.label ?? 'Ingreso',
      note: i.description,
      isIncome: true,
    })),
  [incomes])

  const sourceData = viewType === 'expenses' ? transactions : normalizedIncomes

  const filtered = useMemo(() => {
    let result = [...sourceData]

    // Filtrar por mes
    if (selectedMonth !== 'all') {
      const [year, month] = selectedMonth.split('-').map(Number)
      result = result.filter(item => {
        const d = new Date(item.date + 'T12:00:00')
        return d.getFullYear() === year && d.getMonth() + 1 === month
      })
    }

    // Filtrar por categoría / tipo
    if (selectedCategory !== 'Todas') {
      result = result.filter(item => item.category === selectedCategory)
    }

    // Filtrar por texto
    if (searchText.trim()) {
      const q = searchText.toLowerCase()
      result = result.filter(
        item =>
          (item.note ?? '').toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
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
  }, [sourceData, selectedMonth, selectedCategory, searchText, sortConfig])

  function handleSort(column) {
    setSortConfig(prev =>
      prev.column === column
        ? { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: 'desc' }
    )
  }

  function handleDelete(id) {
    if (viewType === 'expenses') {
      deleteTransaction(id)
      addToast({ message: 'Transacción eliminada', type: 'danger' })
    } else {
      deleteIncome(id)
      addToast({ message: 'Ingreso eliminado', type: 'danger' })
    }
  }

  // Al cambiar de vista, resetear filtro de categoría
  function handleViewTypeChange(type) {
    setViewType(type)
    setSelectedCategory('Todas')
  }

  function handleExport() {
    const prefix    = viewType === 'expenses' ? 'gastos' : 'ingresos'
    const filename  = selectedMonth === 'all'
      ? `${prefix}-financeapp-todo.csv`
      : `${prefix}-financeapp-${selectedMonth}.csv`
    exportToCSV(filtered, filename)
  }

  const total = filtered.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Historial</h1>
        <p className="text-slate-400 text-sm mt-0.5">Registro completo de movimientos</p>
      </div>

      <HistoryFilters
        viewType={viewType}
        onViewTypeChange={handleViewTypeChange}
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
