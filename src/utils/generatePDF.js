export async function generateMonthlyPDF(element, now) {
  // Carga diferida — solo se descarga cuando el usuario hace clic en "Exportar"
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf     = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW   = pdf.internal.pageSize.getWidth()
  const pageH   = pdf.internal.pageSize.getHeight()
  const imgH    = (canvas.height * pageW) / canvas.width

  let posY      = 0
  let remaining = imgH

  pdf.addImage(imgData, 'PNG', 0, posY, pageW, imgH)
  remaining -= pageH

  while (remaining > 0) {
    posY -= pageH
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, posY, pageW, imgH)
    remaining -= pageH
  }

  const monthSlug = now
    .toLocaleDateString('es-CO', { month: 'long' })
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  pdf.save(`reporte-financeapp-${monthSlug}-${now.getFullYear()}.pdf`)
}
