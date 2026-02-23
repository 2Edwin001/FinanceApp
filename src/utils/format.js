export function formatCurrency(n) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatDate(str) {
  // Append T12:00:00 to avoid UTC-midnight-to-previous-day bugs in timezones behind UTC
  const d = new Date(str + 'T12:00:00')
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}
