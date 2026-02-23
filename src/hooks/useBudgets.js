import { useLocalStorage } from './useLocalStorage'
import { CATEGORY_NAMES } from '../data/categories'

const DEFAULT_BUDGETS = Object.fromEntries(CATEGORY_NAMES.map(name => [name, 0]))

export function useBudgets() {
  const [budgets, setBudgets] = useLocalStorage('budgets', DEFAULT_BUDGETS)

  function updateBudget(category, limit) {
    setBudgets(prev => ({ ...prev, [category]: Number(limit) }))
  }

  function getBudgetUsage(transactions) {
    return Object.fromEntries(
      CATEGORY_NAMES.map(category => {
        const limit = budgets[category] ?? 0
        const spent = transactions
          .filter(tx => tx.category === category)
          .reduce((sum, tx) => sum + tx.amount, 0)
        const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0
        return [category, { limit, spent, percentage }]
      })
    )
  }

  return { budgets, updateBudget, getBudgetUsage }
}
