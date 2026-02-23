export default function StatCard({ icon: Icon, label, value, sub, iconBg, iconText, valueColor }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={22} className={iconText} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 leading-tight">{label}</p>
        <p className={`text-xl font-bold font-mono mt-1 leading-none ${valueColor ?? 'text-white'}`}>{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      </div>
    </div>
  )
}
