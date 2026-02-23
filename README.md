# 💰 FinanceApp — Dashboard de Finanzas Personales

Aplicación web de finanzas personales construida con React + Vite. Permite registrar gastos e ingresos, gestionar presupuestos por categoría, crear metas de ahorro, visualizar el historial completo y **exportar un reporte mensual en PDF**. **Todos los datos se guardan localmente en el navegador** (localStorage), sin backend ni base de datos.

---

## Características

### Dashboard
- 5 tarjetas de resumen: total gastado (con % del ingreso), balance del mes, % de presupuesto usado, metas activas, días restantes
- Tarjeta "Balance del mes" en verde si positivo, rojo si negativo
- Gráfica de barras con los gastos de los últimos 6 meses
- Gráfica de dona con la distribución por categoría del mes actual
- Últimas 5 transacciones con enlace al historial completo
- Resumen de metas activas con barra de progreso mini
- Skeleton loader de 800 ms en la carga inicial
- **Botón "Exportar reporte"** → genera un PDF mensual en A4

### Ingresos
- Formulario para registrar ingresos (monto, descripción, fecha, tipo)
- Tipos: Salario · Freelance · Ingreso Pasivo · Otro
- Tarjeta resumen del mes: total ingresos, total gastos, balance neto, % del ingreso gastado con barra visual
- Lista de ingresos del mes con badge de tipo coloreado y eliminación inline

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
- Toggle **Gastos / Ingresos** — cambia la fuente de datos y el filtro de categoría/tipo
- Filtros combinados: mes (últimos 12), categoría o tipo, búsqueda por texto
- Tabla ordenable por Categoría, Fecha y Monto (clic en columna para alternar)
- Filas de ingreso en verde con ícono propio; filas de gasto en rojo
- Ícono de eliminación siempre visible en mobile, visible al hover en desktop; confirmación inline por fila
- Resumen al pie: total del período, categoría con mayor gasto, promedio por transacción
- **Exportación a CSV** respetando el tipo activo (gastos o ingresos) y los filtros, compatible con Excel (BOM UTF-8)

### Reporte mensual PDF
- Generado con jsPDF + html2canvas, **carga diferida** (no impacta el tiempo de carga inicial)
- Archivo: `reporte-financeapp-{mes}-{año}.pdf` · Tamaño A4, fondo blanco
- Contenido:
  1. Resumen financiero: ingresos, gastos, balance neto, % gastado
  2. Gastos por categoría: tabla con gastado, límite y % usado
  3. Metas de ahorro activas: ahorrado, objetivo y progreso
  4. Top 5 gastos del mes

### UX / Polish
- Toasts de confirmación (abajo a la derecha, 3 s):
  - ✅ Verde: gasto/ingreso agregado, aportación registrada, meta creada
  - 🗑️ Rojo suave: transacción/ingreso/meta eliminados
- Sidebar responsive: drawer en mobile, fijo en desktop
- Inputs de montos con separadores de miles en tiempo real (ej: `100.000` en vez de `100000`)
- Teclado numérico en mobile para todos los campos de monto (`inputMode="numeric"`)
- Título del tab dinámico por vista
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
| jsPDF | 4.2 | Generación de PDF |
| html2canvas | 1.4 | Captura del contenido para el PDF |
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

Al abrir la app por primera vez se inicializan los presupuestos por defecto y 5 ingresos de ejemplo distribuidos en 3 meses (salario fijo + freelance + ingreso pasivo). Las transacciones y metas empiezan vacías.

> Para resetear todos los datos, abre DevTools → Application → Local Storage → elimina las claves `transactions`, `budgets`, `goals`, `incomes` y `_dataVersion`, luego recarga la página.

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
│   └── seedData.js                  # Seed data (presupuestos + ingresos) + initializeSeedData()
│
├── hooks/
│   ├── useLocalStorage.js           # Hook genérico con soporte de actualización funcional
│   ├── useTransactions.js           # CRUD de transacciones + filtros por mes/categoría
│   ├── useBudgets.js                # CRUD de presupuestos + getBudgetUsage()
│   ├── useGoals.js                  # CRUD de metas + addContribution()
│   └── useIncomes.js                # CRUD de ingresos + INCOME_TYPE_MAP + getTotalIncomeByMonth()
│
├── utils/
│   ├── format.js                    # formatCurrency · formatDate · fmtInput · digitsOnly
│   ├── csvExport.js                 # Exportador CSV con BOM UTF-8
│   └── generatePDF.js               # Genera PDF mensual con jsPDF + html2canvas (lazy-loaded)
│
├── components/
│   ├── Layout.jsx                   # Shell: sidebar + header sticky + Outlet
│   ├── Sidebar.jsx                  # Navegación — fija en desktop, drawer en mobile
│   │
│   ├── dashboard/
│   │   ├── StatCard.jsx             # Tarjeta de métrica con ícono y color de valor opcional
│   │   ├── SpendingBarChart.jsx     # Barras: gastos últimos 6 meses
│   │   ├── CategoryDonutChart.jsx   # Dona: distribución por categoría
│   │   ├── RecentTransactions.jsx   # Últimas 5 transacciones
│   │   ├── GoalsSummary.jsx         # Top 3 metas activas con mini barra
│   │   ├── SkeletonDashboard.jsx    # Placeholder animado (800 ms)
│   │   └── PDFReportContent.jsx     # Div oculto con layout del PDF (capturado por html2canvas)
│   │
│   ├── gastos/
│   │   ├── ExpenseForm.jsx          # Formulario de registro de gasto
│   │   ├── BudgetCard.jsx           # Card de categoría con barra + edición inline
│   │   ├── BudgetList.jsx           # Grid de BudgetCards
│   │   ├── TransactionItem.jsx      # Fila de transacción + eliminar inline
│   │   └── TransactionList.jsx      # Lista filtrada del mes + total
│   │
│   ├── ingresos/
│   │   ├── IncomeForm.jsx           # Formulario de registro de ingreso
│   │   ├── IncomeSummary.jsx        # Resumen: ingresos, gastos, balance, % gastado
│   │   ├── IncomeItem.jsx           # Fila de ingreso con badge de tipo + eliminar inline
│   │   └── IncomeList.jsx           # Lista de ingresos del mes + total
│   │
│   ├── metas/
│   │   ├── GoalForm.jsx             # Formulario nueva meta con validación
│   │   └── GoalCard.jsx             # Card de meta + aportación + eliminar
│   │
│   └── historial/
│       ├── HistoryFilters.jsx       # Toggle gastos/ingresos + filtros + contador + CSV
│       ├── HistoryTable.jsx         # Tabla sortable + filas de ingreso/gasto + eliminación inline
│       └── HistorySummary.jsx       # Total, mayor categoría, promedio
│
└── views/
    ├── Dashboard.jsx                # Vista principal con skeleton loader + botón PDF
    ├── Expenses.jsx                 # Gastos & Presupuesto
    ├── Incomes.jsx                  # Ingresos del mes
    ├── Goals.jsx                    # Metas de Ahorro
    └── History.jsx                  # Historial con toggle gastos/ingresos y exportación
```

---

## Rutas

| Path | Vista |
|---|---|
| `/` | Dashboard |
| `/gastos` | Gastos & Presupuesto |
| `/ingresos` | Ingresos |
| `/metas` | Metas de Ahorro |
| `/historial` | Historial |

---

## Esquema de datos (localStorage)

```json
// Clave: "transactions"
[{ "id": "tx-abc", "amount": 285000, "category": "Alimentación", "date": "2026-02-14", "note": "Supermercado", "type": "expense" }]

// Clave: "incomes"
[{ "id": "inc-abc", "amount": 4500000, "description": "Salario mensual", "date": "2026-02-05", "type": "salario" }]

// Clave: "budgets"
{ "Alimentación": 800000, "Transporte": 280000, "Ocio": 200000, "Salud": 250000, "Hogar": 1500000, "Educación": 350000, "Otros": 180000 }

// Clave: "goals"
[{ "id": "goal-abc", "name": "Fondo de emergencia", "emoji": "🛡️", "target": 10000000, "current": 2800000, "deadline": "2026-12-31" }]
```

**Tipos de ingreso:** `salario` · `freelance` · `pasivo` · `otro`

**Categorías de gasto:** `Alimentación` · `Transporte` · `Ocio` · `Salud` · `Hogar` · `Educación` · `Otros`

---

## Design tokens

Definidos en `src/index.css` usando la directiva `@theme` de Tailwind v4:

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#6366f1` | Indigo — acción principal |
| `--color-accent-green` | `#10b981` | Éxito, ingresos, metas completadas |
| `--color-accent-red` | `#ef4444` | Gastos, alertas |
| `--color-accent-yellow` | `#f59e0b` | Advertencias de presupuesto |
| `--color-surface` | `#0f172a` | Fondo principal |
| `--color-surface-2` | `#1e293b` | Fondo de cards |
| `--color-surface-3` | `#334155` | Bordes y separadores |

---

## Notas técnicas

- **Sin backend ni autenticación** — toda la persistencia es localStorage.
- **Seed data con versionado** — `_dataVersion` en localStorage garantiza que los datos de ejemplo se actualizan automáticamente al cambiar el seed, sin limpiar el storage a mano. Versión actual: `4`.
- **Timezone-safe** — todas las fechas se parsean con `T12:00:00` para evitar el bug de UTC-medianoche en Colombia (UTC−5) y otras zonas detrás de UTC.
- **Code splitting** — Recharts en chunk `charts.js`; jsPDF + html2canvas se cargan mediante **dynamic import** solo cuando el usuario hace clic en "Exportar reporte", sin impacto en la carga inicial.
- **Toasts globales** — `useToast()` disponible en cualquier componente dentro de `<ToastProvider>` (envuelve el router en `App.jsx`).
- **PDF con inline styles** — `PDFReportContent` usa únicamente `style` props (no clases Tailwind) para garantizar que html2canvas capture el layout correctamente.
