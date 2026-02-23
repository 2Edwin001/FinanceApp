import { forwardRef } from 'react'
import { formatCurrency } from '../../utils/format'

// Estilos inline para html2canvas (no usar Tailwind aquí)
const S = {
  root: {
    position: 'fixed', left: '-9999px', top: 0,
    width: '794px', backgroundColor: '#ffffff',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#1e293b', fontSize: '13px', lineHeight: '1.5',
    padding: '36px',
  },
  header: {
    backgroundColor: '#6366f1', borderRadius: '10px',
    padding: '22px 28px', marginBottom: '24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: '20px', fontWeight: 'bold', margin: 0 },
  headerSub: { color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginTop: '3px' },
  headerRight: { textAlign: 'right' },
  headerMonth: { color: '#fff', fontSize: '15px', fontWeight: '600', textTransform: 'capitalize' },
  headerDate: { color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '3px' },

  section: { marginBottom: '22px' },
  sectionTitle: {
    fontSize: '12px', fontWeight: '700', color: '#4338ca',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    marginBottom: '10px', paddingBottom: '5px',
    borderBottom: '2px solid #6366f1',
  },

  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' },
  summaryBox: (color) => ({
    border: `1px solid ${color}33`,
    backgroundColor: `${color}11`,
    borderRadius: '8px', padding: '10px 12px',
  }),
  summaryLabel: { fontSize: '10px', color: '#64748b', marginBottom: '4px' },
  summaryValue: (color) => ({
    fontSize: '14px', fontWeight: '700', color, fontVariantNumeric: 'tabular-nums',
  }),

  table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
  th: (right) => ({
    padding: '7px 10px', textAlign: right ? 'right' : 'left',
    fontWeight: '600', fontSize: '10px', color: '#64748b',
    backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0',
    textTransform: 'uppercase', letterSpacing: '0.04em',
  }),
  td: (right, bold, bg) => ({
    padding: '7px 10px', textAlign: right ? 'right' : 'left',
    borderBottom: '1px solid #f1f5f9', color: bold ? '#0f172a' : '#334155',
    fontWeight: bold ? '700' : '400',
    backgroundColor: bg || 'transparent',
  }),

  footer: {
    borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '16px',
    display: 'flex', justifyContent: 'space-between',
    color: '#94a3b8', fontSize: '11px',
  },
}

const PDFReportContent = forwardRef(function PDFReportContent({ data }, ref) {
  if (!data) return null

  const {
    monthLabel, generatedDate,
    incomeTotal, expenseTotal, balance, spentPct,
    budgetUsage, goals, topTransactions,
  } = data

  const totalBudget = Object.values(budgetUsage).reduce((s, b) => s + b.limit, 0)
  const totalSpent  = Object.values(budgetUsage).reduce((s, b) => s + b.spent, 0)
  const activeGoals = goals.filter(g => g.current < g.target)

  return (
    <div ref={ref} style={S.root}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <p style={S.headerTitle}>💰 FinanceApp</p>
          <p style={S.headerSub}>Reporte Mensual</p>
        </div>
        <div style={S.headerRight}>
          <p style={S.headerMonth}>{monthLabel}</p>
          <p style={S.headerDate}>Generado: {generatedDate}</p>
        </div>
      </div>

      {/* Sección 1 — Resumen financiero */}
      <div style={S.section}>
        <p style={S.sectionTitle}>Resumen Financiero</p>
        <div style={S.summaryGrid}>
          <div style={S.summaryBox('#10b981')}>
            <p style={S.summaryLabel}>Total Ingresos</p>
            <p style={S.summaryValue('#10b981')}>{formatCurrency(incomeTotal)}</p>
          </div>
          <div style={S.summaryBox('#ef4444')}>
            <p style={S.summaryLabel}>Total Gastos</p>
            <p style={S.summaryValue('#ef4444')}>{formatCurrency(expenseTotal)}</p>
          </div>
          <div style={S.summaryBox(balance >= 0 ? '#10b981' : '#ef4444')}>
            <p style={S.summaryLabel}>Balance Neto</p>
            <p style={S.summaryValue(balance >= 0 ? '#10b981' : '#ef4444')}>
              {balance >= 0 ? '+' : ''}{formatCurrency(balance)}
            </p>
          </div>
          <div style={S.summaryBox('#6366f1')}>
            <p style={S.summaryLabel}>% Gastado</p>
            <p style={S.summaryValue('#6366f1')}>
              {spentPct !== null ? `${spentPct.toFixed(0)}%` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Sección 2 — Gastos por categoría */}
      <div style={S.section}>
        <p style={S.sectionTitle}>Gastos por Categoría</p>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th(false)}>Categoría</th>
              <th style={S.th(true)}>Gastado</th>
              <th style={S.th(true)}>Límite</th>
              <th style={S.th(true)}>% Usado</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(budgetUsage).map(([cat, { spent, limit, percentage }]) => (
              <tr key={cat}>
                <td style={S.td(false)}>{cat}</td>
                <td style={S.td(true)}>{formatCurrency(spent)}</td>
                <td style={S.td(true)}>{formatCurrency(limit)}</td>
                <td style={{ ...S.td(true), color: percentage >= 90 ? '#ef4444' : percentage >= 70 ? '#f59e0b' : '#10b981' }}>
                  {percentage.toFixed(0)}%
                </td>
              </tr>
            ))}
            <tr>
              <td style={S.td(false, true, '#f8fafc')}>Total</td>
              <td style={S.td(true, true, '#f8fafc')}>{formatCurrency(totalSpent)}</td>
              <td style={S.td(true, true, '#f8fafc')}>{formatCurrency(totalBudget)}</td>
              <td style={S.td(true, true, '#f8fafc')}>
                {totalBudget > 0 ? `${((totalSpent / totalBudget) * 100).toFixed(0)}%` : '—'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección 3 — Metas de ahorro */}
      {activeGoals.length > 0 && (
        <div style={S.section}>
          <p style={S.sectionTitle}>Metas de Ahorro</p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th(false)}>Meta</th>
                <th style={S.th(true)}>Ahorrado</th>
                <th style={S.th(true)}>Objetivo</th>
                <th style={S.th(true)}>Progreso</th>
              </tr>
            </thead>
            <tbody>
              {activeGoals.map(g => {
                const pct = g.target > 0 ? Math.min((g.current / g.target) * 100, 100) : 0
                return (
                  <tr key={g.id}>
                    <td style={S.td(false)}>{g.emoji} {g.name}</td>
                    <td style={S.td(true)}>{formatCurrency(g.current)}</td>
                    <td style={S.td(true)}>{formatCurrency(g.target)}</td>
                    <td style={{ ...S.td(true), color: '#6366f1' }}>{pct.toFixed(0)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Sección 4 — Top 5 gastos */}
      {topTransactions.length > 0 && (
        <div style={S.section}>
          <p style={S.sectionTitle}>Top 5 Gastos del Mes</p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th(false)}>#</th>
                <th style={S.th(false)}>Categoría</th>
                <th style={S.th(false)}>Descripción</th>
                <th style={S.th(true)}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {topTransactions.map((tx, i) => (
                <tr key={tx.id}>
                  <td style={{ ...S.td(false), color: '#94a3b8' }}>{i + 1}</td>
                  <td style={S.td(false)}>{tx.category}</td>
                  <td style={{ ...S.td(false), color: '#64748b' }}>{tx.note || '—'}</td>
                  <td style={{ ...S.td(true), color: '#ef4444', fontWeight: '600' }}>{formatCurrency(tx.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div style={S.footer}>
        <span>Generado con FinanceApp</span>
        <span>{generatedDate}</span>
      </div>
    </div>
  )
})

export default PDFReportContent
