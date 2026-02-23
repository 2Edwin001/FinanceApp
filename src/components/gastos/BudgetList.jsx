import BudgetCard from './BudgetCard'

export default function BudgetList({ budgetUsage, onUpdateLimit }) {
  return (
    <div>
      <h2 className="text-white font-semibold text-base mb-3">Presupuesto por categoría</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Object.entries(budgetUsage).map(([category, { spent, limit, percentage }]) => (
          <BudgetCard
            key={category}
            category={category}
            spent={spent}
            limit={limit}
            percentage={percentage}
            onUpdateLimit={onUpdateLimit}
          />
        ))}
      </div>
    </div>
  )
}
