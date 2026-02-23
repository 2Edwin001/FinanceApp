import { useLocalStorage } from './useLocalStorage'

function generateId() {
  return `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function useGoals() {
  const [goals, setGoals] = useLocalStorage('goals', [])

  function addGoal({ name, emoji, target, deadline }) {
    const goal = {
      id: generateId(),
      name,
      emoji: emoji || '🎯',
      target: Number(target),
      current: 0,
      deadline,
    }
    setGoals(prev => [...prev, goal])
  }

  function deleteGoal(id) {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  function addContribution(goalId, amount) {
    setGoals(prev =>
      prev.map(g =>
        g.id === goalId
          ? { ...g, current: Math.min(g.current + Number(amount), g.target) }
          : g
      )
    )
  }

  return { goals, addGoal, deleteGoal, addContribution }
}
