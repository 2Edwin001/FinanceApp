// Incrementar DATA_VERSION para forzar reset del localStorage en todos los usuarios
const DATA_VERSION = '4'

export const DEFAULT_BUDGETS = {
  Alimentación:  800000,
  Transporte:    280000,
  Ocio:          200000,
  Salud:         250000,
  Hogar:        1500000,
  Educación:     350000,
  Otros:         180000,
}

// Helper: genera una fecha relativa al mes actual
function seedDate(monthOffset, day) {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() + monthOffset)
  const maxDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  d.setDate(Math.min(day, maxDay))
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${da}`
}

const SEED_INCOMES = [
  // Mes actual
  { id: 'inc-s1', amount: 4500000, description: 'Salario mensual',          date: seedDate(0,  5), type: 'salario'   },
  // Mes anterior
  { id: 'inc-s2', amount: 4500000, description: 'Salario mensual',          date: seedDate(-1, 5), type: 'salario'   },
  { id: 'inc-s3', amount: 750000,  description: 'Proyecto web freelance',   date: seedDate(-1,18), type: 'freelance' },
  // Hace 2 meses
  { id: 'inc-s4', amount: 4500000, description: 'Salario mensual',          date: seedDate(-2, 5), type: 'salario'   },
  { id: 'inc-s5', amount: 140000,  description: 'Dividendos fondo inversión', date: seedDate(-2,22), type: 'pasivo'  },
]

export function initializeSeedData() {
  // Si la versión no coincide, borra todos los datos anteriores
  if (localStorage.getItem('_dataVersion') !== DATA_VERSION) {
    localStorage.removeItem('transactions')
    localStorage.removeItem('budgets')
    localStorage.removeItem('goals')
    localStorage.removeItem('incomes')
    localStorage.setItem('_dataVersion', DATA_VERSION)
  }

  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([]))
  }
  if (!localStorage.getItem('budgets')) {
    localStorage.setItem('budgets', JSON.stringify(DEFAULT_BUDGETS))
  }
  if (!localStorage.getItem('goals')) {
    localStorage.setItem('goals', JSON.stringify([]))
  }
  if (!localStorage.getItem('incomes')) {
    localStorage.setItem('incomes', JSON.stringify(SEED_INCOMES))
  }
}
