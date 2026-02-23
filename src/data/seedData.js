// Incrementar DATA_VERSION para forzar reset del localStorage cuando cambian los datos
const DATA_VERSION = '2'

export const DEFAULT_BUDGETS = {
  Alimentación:  800000,
  Transporte:    280000,
  Ocio:          200000,
  Salud:         250000,
  Hogar:        1500000,
  Educación:     350000,
  Otros:         180000,
}

// 20 transacciones en dic 2025, ene 2026 y feb 2026 — montos en COP
export const SEED_TRANSACTIONS = [
  // Diciembre 2025
  { id: 'seed-1',  amount: 285000, category: 'Alimentación', date: '2025-12-03', note: 'Supermercado',      type: 'expense' },
  { id: 'seed-2',  amount:  95000, category: 'Transporte',   date: '2025-12-05', note: 'Gasolina',           type: 'expense' },
  { id: 'seed-3',  amount:  75000, category: 'Ocio',         date: '2025-12-10', note: 'Cine y cena',        type: 'expense' },
  { id: 'seed-4',  amount: 420000, category: 'Hogar',        date: '2025-12-12', note: 'Servicios',          type: 'expense' },
  { id: 'seed-5',  amount:  42000, category: 'Salud',        date: '2025-12-15', note: 'Farmacia',           type: 'expense' },
  { id: 'seed-6',  amount: 180000, category: 'Alimentación', date: '2025-12-20', note: 'Cena navideña',      type: 'expense' },
  { id: 'seed-7',  amount:  65000, category: 'Educación',    date: '2025-12-22', note: 'Libros',             type: 'expense' },
  // Enero 2026
  { id: 'seed-8',  amount: 310000, category: 'Alimentación', date: '2026-01-04', note: 'Supermercado',       type: 'expense' },
  { id: 'seed-9',  amount:  88000, category: 'Transporte',   date: '2026-01-07', note: 'Gasolina',           type: 'expense' },
  { id: 'seed-10', amount: 240000, category: 'Hogar',        date: '2026-01-10', note: 'Reparación',         type: 'expense' },
  { id: 'seed-11', amount:  52000, category: 'Ocio',         date: '2026-01-14', note: 'Streaming y apps',   type: 'expense' },
  { id: 'seed-12', amount: 130000, category: 'Salud',        date: '2026-01-18', note: 'Consulta médica',    type: 'expense' },
  { id: 'seed-13', amount: 290000, category: 'Educación',    date: '2026-01-22', note: 'Curso online',       type: 'expense' },
  // Febrero 2026
  { id: 'seed-14', amount: 275000, category: 'Alimentación', date: '2026-02-01', note: 'Supermercado',       type: 'expense' },
  { id: 'seed-15', amount:  92000, category: 'Transporte',   date: '2026-02-05', note: 'Gasolina',           type: 'expense' },
  { id: 'seed-16', amount:  95000, category: 'Ocio',         date: '2026-02-08', note: 'Concierto',          type: 'expense' },
  { id: 'seed-17', amount:  38000, category: 'Salud',        date: '2026-02-10', note: 'Medicamentos',       type: 'expense' },
  { id: 'seed-18', amount: 850000, category: 'Hogar',        date: '2026-02-12', note: 'Arriendo',           type: 'expense' },
  { id: 'seed-19', amount:  65000, category: 'Otros',        date: '2026-02-15', note: 'Varios',             type: 'expense' },
  { id: 'seed-20', amount: 145000, category: 'Alimentación', date: '2026-02-18', note: 'Restaurante',        type: 'expense' },
]

export const SEED_GOALS = [
  { id: 'goal-1', name: 'Fondo de emergencia', emoji: '🛡️', target: 10000000, current: 2800000, deadline: '2026-12-31' },
  { id: 'goal-2', name: 'Vacaciones',          emoji: '✈️', target:  3500000, current: 1150000, deadline: '2026-07-15' },
  { id: 'goal-3', name: 'Laptop nueva',        emoji: '💻', target:  5200000, current: 3100000, deadline: '2026-06-30' },
]

export function initializeSeedData() {
  // Si la versión no coincide, borra los datos anteriores y re-siembra
  if (localStorage.getItem('_dataVersion') !== DATA_VERSION) {
    localStorage.removeItem('transactions')
    localStorage.removeItem('budgets')
    localStorage.removeItem('goals')
    localStorage.setItem('_dataVersion', DATA_VERSION)
  }

  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify(SEED_TRANSACTIONS))
  }
  if (!localStorage.getItem('budgets')) {
    localStorage.setItem('budgets', JSON.stringify(DEFAULT_BUDGETS))
  }
  if (!localStorage.getItem('goals')) {
    localStorage.setItem('goals', JSON.stringify(SEED_GOALS))
  }
}
