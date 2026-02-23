/**
 * Exporta un array de transacciones a un archivo CSV con BOM UTF-8
 * para que Excel lo abra correctamente.
 */
export function exportToCSV(transactions, filename) {
  const header = ['Fecha', 'Categoría', 'Nota', 'Monto']

  const rows = transactions.map(tx => [
    tx.date,
    tx.category,
    `"${(tx.note || '').replace(/"/g, '""')}"`,
    tx.amount,
  ])

  const csv = [header, ...rows].map(row => row.join(',')).join('\n')

  // BOM (\uFEFF) para que Excel interprete UTF-8 correctamente
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
