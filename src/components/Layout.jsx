import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

const PAGE_TITLES = {
  '/':          'Dashboard · FinanceApp',
  '/gastos':    'Gastos · FinanceApp',
  '/metas':     'Metas · FinanceApp',
  '/historial': 'Historial · FinanceApp',
}

const PAGE_LABELS = {
  '/':          'Dashboard',
  '/gastos':    'Gastos & Presupuesto',
  '/metas':     'Metas de Ahorro',
  '/historial': 'Historial',
}

export default function Layout() {
  const location = useLocation()

  // Cambia el título del tab según la vista activa
  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? 'FinanceApp'
  }, [location.pathname])

  const pageLabel = PAGE_LABELS[location.pathname] ?? 'FinanceApp'

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      {/* Main content — offset para dejar espacio al sidebar en desktop */}
      <div className="flex-1 lg:ml-60 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-slate-800/60 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <span className="ml-10 lg:ml-0 text-white font-semibold text-lg">{pageLabel}</span>
            <span className="text-slate-400 text-sm capitalize">
              {new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
