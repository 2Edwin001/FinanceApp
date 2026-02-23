import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CheckCircle, Trash2, X } from 'lucide-react'

const ToastContext = createContext(null)

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Un tick de espera para que la transición CSS funcione al montar
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const isSuccess = toast.type === 'success'
  const Icon = isSuccess ? CheckCircle : Trash2

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl
        max-w-sm transition-all duration-300 cursor-default
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}
        ${isSuccess
          ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-300'
          : 'bg-red-950/95 border-red-500/40 text-red-300'
        }
      `}
    >
      <Icon size={15} className="flex-shrink-0" />
      <span className="text-sm flex-1 leading-tight">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-current opacity-40 hover:opacity-100 transition-opacity ml-1 flex-shrink-0"
      >
        <X size={13} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type = 'success' }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Contenedor de toasts — abajo a la derecha, encima de todo */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return ctx
}
