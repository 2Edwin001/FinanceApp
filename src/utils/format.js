export function formatCurrency(n) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

// Para inputs de dinero: guarda solo dígitos en el estado y muestra con separadores de miles
export function fmtInput(digits) {
  if (!digits) return ''
  return Number(digits).toLocaleString('es-CO')
}

export function digitsOnly(str) {
  return str.replace(/\D/g, '')
}

export function formatDate(str) {
  // Append T12:00:00 to avoid UTC-midnight-to-previous-day bugs in timezones behind UTC
  const d = new Date(str + 'T12:00:00')
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}
