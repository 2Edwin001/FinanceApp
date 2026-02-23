# 💰 FinanceApp — Dashboard de Finanzas Personales

Aplicación web de finanzas personales construida con React + Vite. Permite registrar gastos, gestionar presupuestos por categoría, crear metas de ahorro y visualizar el historial completo. **Todos los datos se guardan localmente en el navegador** (localStorage), sin backend ni base de datos.

---

## Características

### Dashboard
- Tarjetas de resumen: total gastado del mes, % de presupuesto usado, metas activas, días restantes del mes
- Gráfica de barras con los gastos de los últimos 6 meses
- Gráfica de dona con la distribución por categoría del mes actual
- Últimas 5 transacciones con enlace al historial completo
- Resumen de metas activas con barra de progreso mini
- Skeleton loader de 800 ms en la carga inicial

### Gastos & Presupuesto
- Formulario para registrar gastos (monto, categoría, fecha, nota)
- Barras de presupuesto por categoría con animación de entrada
  - Verde `< 70%` · Amarillo `70–90%` · Rojo `≥ 90%`
- Edición inline del límite de presupuesto (Enter = guardar, Esc = cancelar)
- Lista de transacciones del mes con filtro por categoría y total acumulado
- Eliminación con confirmación inline (sin `alert()` del navegador)

### Metas de Ahorro
- Formulario para crear metas (nombre, emoji, monto objetivo, fecha límite)
- Validación: nombre requerido, monto > 0, fecha futura obligatoria
- Cards de meta con barra de progreso animada
  - Azul `< 70%` · Verde `≥ 70%` · Verde brillante al `100%`
- Badge "¡Meta alcanzada! 🎉" al completar
- Aportaciones inline (Enter para confirmar, Esc para cancelar)
- Eliminación con confirmación inline

### Historial
- Filtros combinados: mes (últimos 12), categoría, búsqueda por texto
- Tabla ordenable por Categoría, Fecha y Monto (clic en columna para alternar)
- Ícono de eliminación visible al hover, confirmación inline por fila
- Resumen al pie: total del período, categoría con mayor gasto, promedio por transacción
- **Exportación a CSV** respetando los filtros activos, compatible con Excel (BOM UTF-8)

### UX / Polish
- Toasts de confirmación (abajo a la derecha, 3 s):
  - ✅ Verde: gasto agregado, aportación registrada, meta creada
  - 🗑️ Rojo suave: transacción eliminada, meta eliminada
- Sidebar responsive: drawer en mobile, fijo en desktop
- Título del tab dinámico por vista: `Dashboard · FinanceApp`, `Gastos · FinanceApp`, etc.
- Favicon 💰 como SVG emoji inline
- Scroll suave global

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI y estado |
| Vite | 7 | Bundler y servidor de desarrollo |
| Tailwind CSS v4 | 4.2 | Estilos (via plugin Vite, sin `tailwind.config.js`) |
| Recharts | 3.7 | Gráficas de barras y dona |
| Lucide React | 0.575 | Íconos |
| React Router DOM | 7 | Navegación SPA (BrowserRouter) |
| localStorage | — | Persistencia de datos sin backend |

**Fuentes:** Inter (UI) · JetBrains Mono (números y montos)

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd FinancialApp

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Build de producción
npm run build

# 5. Vista previa del build
npm run preview
```

Al abrir la app por primera vez se cargan datos de ejemplo (seed data) con transacciones en COP de los últimos 3 meses, listos para explorar todas las funcionalidades sin ingresar datos manualmente.

> Para resetear los datos de ejemplo, abre DevTools → Application → Local Storage → elimina las claves `transactions`, `budgets`, `goals` y `_dataVersion`, luego recarga la página.

---

## Estructura del proyecto

```
src/
├── App.jsx                          # Router + ToastProvider
├── main.jsx                         # Punto de entrada + initializeSeedData()
├── index.css                        # Tailwind + design tokens (@theme)
│
├── context/
│   └── ToastContext.jsx             # Sistema de toasts — useToast()
│
├── data/
│   ├── categories.js                # 7 categorías con ícono, colores Tailwind y hex
│   └── seedData.js                  # Datos de ejemplo en COP + initializeSeedData()
│
├── hooks/
│   ├── useLocalStorage.js           # Hook genérico con soporte de actualización funcional
│   ├── useTransactions.js           # CRUD de transacciones + filtros por mes/categoría
│   ├── useBudgets.js                # CRUD de presupuestos + getBudgetUsage()
│   └── useGoals.js                  # CRUD de metas + addContribution()
│
├── utils/
│   ├── format.js                    # formatCurrency (COP / es-CO) + formatDate
│   └── csvExport.js                 # Exportador CSV con BOM UTF-8
│
├── components/
│   ├── Layout.jsx                   # Shell: sidebar + header sticky + Outlet
│   ├── Sidebar.jsx                  # Navegación — fija en desktop, drawer en mobile
│   │
│   ├── dashboard/
│   │   ├── StatCard.jsx             # Tarjeta de métrica con ícono
│   │   ├── SpendingBarChart.jsx     # Barras: gastos últimos 6 meses
│   │   ├── CategoryDonutChart.jsx   # Dona: distribución por categoría
│   │   ├── RecentTransactions.jsx   # Últimas 5 transacciones
│   │   ├── GoalsSummary.jsx         # Top 3 metas activas con mini barra
│   │   └── SkeletonDashboard.jsx    # Placeholder animado (800 ms)
│   │
│   ├── gastos/
│   │   ├── ExpenseForm.jsx          # Formulario de registro de gasto
│   │   ├── BudgetCard.jsx           # Card de categoría con barra + edición inline
│   │   ├── BudgetList.jsx           # Grid de BudgetCards
│   │   ├── TransactionItem.jsx      # Fila de transacción + eliminar inline
│   │   └── TransactionList.jsx      # Lista filtrada del mes + total
│   │
│   ├── metas/
│   │   ├── GoalForm.jsx             # Formulario nueva meta con validación
│   │   └── GoalCard.jsx             # Card de meta + aportación + eliminar
│   │
│   └── historial/
│       ├── HistoryFilters.jsx       # Filtros + contador + botón CSV
│       ├── HistoryTable.jsx         # Tabla sortable + eliminación inline
│       └── HistorySummary.jsx       # Total, mayor categoría, promedio
│
└── views/
    ├── Dashboard.jsx                # Vista principal con skeleton loader
    ├── Expenses.jsx                 # Gastos & Presupuesto
    ├── Goals.jsx                    # Metas de Ahorro
    └── History.jsx                  # Historial con filtros y exportación
```

---

## Rutas

| Path | Vista |
|---|---|
| `/` | Dashboard |
| `/gastos` | Gastos & Presupuesto |
| `/metas` | Metas de Ahorro |
| `/historial` | Historial |

---

## Esquema de datos (localStorage)

```json
// Clave: "transactions"
[
  {
    "id": "tx-1234-abc",
    "amount": 285000,
    "category": "Alimentación",
    "date": "2026-02-14",
    "note": "Supermercado",
    "type": "expense"
  }
]

// Clave: "budgets"
{
  "Alimentación": 800000,
  "Transporte": 280000,
  "Ocio": 200000,
  "Salud": 250000,
  "Hogar": 1500000,
  "Educación": 350000,
  "Otros": 180000
}

// Clave: "goals"
[
  {
    "id": "goal-1234-abc",
    "name": "Fondo de emergencia",
    "emoji": "🛡️",
    "target": 10000000,
    "current": 2800000,
    "deadline": "2026-12-31"
  }
]
```

**Categorías:** `Alimentación` · `Transporte` · `Ocio` · `Salud` · `Hogar` · `Educación` · `Otros`

---

## Design tokens

Definidos en `src/index.css` usando la directiva `@theme` de Tailwind v4:

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#6366f1` | Indigo — acción principal |
| `--color-accent-green` | `#10b981` | Éxito, metas completadas |
| `--color-accent-red` | `#ef4444` | Gastos, alertas |
| `--color-accent-yellow` | `#f59e0b` | Advertencias de presupuesto |
| `--color-surface` | `#0f172a` | Fondo principal |
| `--color-surface-2` | `#1e293b` | Fondo de cards |
| `--color-surface-3` | `#334155` | Bordes y separadores |

---

## Notas técnicas

- **Sin backend ni autenticación** — toda la persistencia es localStorage.
- **Seed data con versionado** — `_dataVersion` en localStorage garantiza que los datos de ejemplo se actualizan automáticamente si cambia el seed, sin necesidad de limpiar el storage a mano.
- **Timezone-safe** — todas las fechas se parsean con `T12:00:00` para evitar el bug de UTC-medianoche en Colombia (UTC−5) y otras zonas detrás de UTC.
- **Code splitting** — Recharts se empaqueta en un chunk separado (`charts.js`) para reducir el tiempo de carga inicial.
- **Toasts globales** — `useToast()` disponible en cualquier componente dentro de `<ToastProvider>` (envuelve el router en `App.jsx`).
