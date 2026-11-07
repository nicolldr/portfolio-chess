import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}>
      <span aria-hidden="true">{isDark ? '☾' : '☼'}</span>
      <span>{isDark ? 'Modo oscuro' : 'Modo claro'}</span>
      <span className={`toggle-track${isDark ? ' on' : ''}`}><span /></span>
    </button>
  )
}
