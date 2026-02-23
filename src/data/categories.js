import { ShoppingCart, Car, Gamepad2, Heart, Home, GraduationCap, Package } from 'lucide-react'

export const CATEGORIES = [
  {
    name: 'Alimentación',
    icon: ShoppingCart,
    color: { dot: 'bg-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
    hex: '#f97316',
  },
  {
    name: 'Transporte',
    icon: Car,
    color: { dot: 'bg-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    hex: '#3b82f6',
  },
  {
    name: 'Ocio',
    icon: Gamepad2,
    color: { dot: 'bg-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    hex: '#a855f7',
  },
  {
    name: 'Salud',
    icon: Heart,
    color: { dot: 'bg-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
    hex: '#ef4444',
  },
  {
    name: 'Hogar',
    icon: Home,
    color: { dot: 'bg-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400' },
    hex: '#14b8a6',
  },
  {
    name: 'Educación',
    icon: GraduationCap,
    color: { dot: 'bg-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
    hex: '#6366f1',
  },
  {
    name: 'Otros',
    icon: Package,
    color: { dot: 'bg-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' },
    hex: '#64748b',
  },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.name, c]))
export const CATEGORY_NAMES = CATEGORIES.map(c => c.name)
export const CATEGORY_COLORS = Object.fromEntries(CATEGORIES.map(c => [c.name, c.hex]))
