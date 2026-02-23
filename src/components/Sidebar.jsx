import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Target,
  History,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/gastos', label: 'Gastos', icon: Wallet },
  { to: '/metas', label: 'Metas', icon: Target },
  { to: '/historial', label: 'Historial', icon: History },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
    }`

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <TrendingUp size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">FinanceApp</p>
          <p className="text-slate-500 text-xs">Personal Finance</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-800">
        <div className="px-4 py-2">
          <p className="text-xs text-slate-600">Datos guardados localmente</p>
          <p className="text-xs text-slate-700">localStorage · sin backend</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 p-4 flex flex-col transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="self-end w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white mb-2"
        >
          <X size={18} />
        </button>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-slate-900 border-r border-slate-800 p-4 fixed top-0 left-0">
        <NavContent />
      </aside>
    </>
  )
}
