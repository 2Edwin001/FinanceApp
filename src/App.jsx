import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import Layout from './components/Layout'
import Dashboard from './views/Dashboard'
import Expenses from './views/Expenses'
import Goals from './views/Goals'
import HistoryView from './views/History'
import Incomes from './views/Incomes'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gastos" element={<Expenses />} />
            <Route path="/ingresos" element={<Incomes />} />
            <Route path="/metas" element={<Goals />} />
            <Route path="/historial" element={<HistoryView />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
