// Incrementar DATA_VERSION para forzar reset del localStorage en todos los usuarios
const DATA_VERSION = '3'

export const DEFAULT_BUDGETS = {
  Alimentación:  800000,
  Transporte:    280000,
  Ocio:          200000,
  Salud:         250000,
  Hogar:        1500000,
  Educación:     350000,
  Otros:         180000,
}

export function initializeSeedData() {
  // Si la versión no coincide, borra todos los datos anteriores
  if (localStorage.getItem('_dataVersion') !== DATA_VERSION) {
    localStorage.removeItem('transactions')
    localStorage.removeItem('budgets')
    localStorage.removeItem('goals')
    localStorage.setItem('_dataVersion', DATA_VERSION)
  }

  // Solo inicializa los presupuestos por defecto — sin transacciones ni metas de prueba
  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([]))
  }
  if (!localStorage.getItem('budgets')) {
    localStorage.setItem('budgets', JSON.stringify(DEFAULT_BUDGETS))
  }
  if (!localStorage.getItem('goals')) {
    localStorage.setItem('goals', JSON.stringify([]))
  }
}
