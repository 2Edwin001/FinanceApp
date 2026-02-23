import { useLocalStorage } from './useLocalStorage'

export const INCOME_TYPES = [
  { value: 'salario',   label: 'Salario' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'pasivo',    label: 'Ingreso Pasivo' },
  { value: 'otro',      label: 'Otro' },
]

export const INCOME_TYPE_MAP = {
  salario:  { label: 'Salario',        bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  freelance:{ label: 'Freelance',      bg: 'bg-sky-500/20',     border: 'border-sky-500/30',     text: 'text-sky-400'     },
  pasivo:   { label: 'Ingreso Pasivo', bg: 'bg-violet-500/20',  border: 'border-violet-500/30',  text: 'text-violet-400'  },
  otro:     { label: 'Otro',           bg: 'bg-slate-500/20',   border: 'border-slate-500/30',   text: 'text-slate-400'   },
}

export function useIncomes() {
  const [incomes, setIncomes] = useLocalStorage('incomes', [])

  function addIncome({ amount, description, date, type }) {
    const income = {
      id: `inc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      amount: Number(amount),
      description: description.trim(),
      date,
      type,
    }
    setIncomes(prev => [income, ...prev])
  }

  function deleteIncome(id) {
    setIncomes(prev => prev.filter(i => i.id !== id))
  }

  function getIncomesByMonth(year, month) {
    return incomes.filter(i => {
      const d = new Date(i.date + 'T12:00:00')
      return d.getFullYear() === year && d.getMonth() + 1 === month
    })
  }

  function getTotalIncomeByMonth(year, month) {
    return getIncomesByMonth(year, month).reduce((sum, i) => sum + i.amount, 0)
  }

  return { incomes, addIncome, deleteIncome, getIncomesByMonth, getTotalIncomeByMonth }
}
