import { Target } from 'lucide-react'
import { useGoals } from '../hooks/useGoals'
import { useToast } from '../context/ToastContext'
import GoalForm from '../components/metas/GoalForm'
import GoalCard from '../components/metas/GoalCard'

export default function Goals() {
  const { goals, addGoal, deleteGoal, addContribution } = useGoals()
  const { addToast } = useToast()

  function handleAdd(data) {
    addGoal(data)
    addToast({ message: 'Meta creada correctamente', type: 'success' })
  }

  function handleDelete(id) {
    deleteGoal(id)
    addToast({ message: 'Meta eliminada', type: 'danger' })
  }

  function handleContribute(goalId, amount) {
    addContribution(goalId, amount)
    addToast({ message: 'Aportación registrada', type: 'success' })
  }

  const activeCount = goals.filter(g => g.current < g.target).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Metas de Ahorro</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          {goals.length > 0
            ? `${activeCount} meta${activeCount !== 1 ? 's' : ''} activa${activeCount !== 1 ? 's' : ''} · ${goals.length} en total`
            : 'Empieza creando tu primera meta'}
        </p>
      </div>

      <GoalForm onAdd={handleAdd} />

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
            <Target size={32} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-semibold">¡Aún no tienes metas!</p>
            <p className="text-slate-400 text-sm mt-1 max-w-xs">
              Crea tu primera meta de ahorro arriba y empieza a construir tu futuro financiero.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={handleDelete}
              onContribute={handleContribute}
            />
          ))}
        </div>
      )}
    </div>
  )
}
