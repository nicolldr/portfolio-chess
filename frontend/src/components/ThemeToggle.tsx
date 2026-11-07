import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
    >
      <span className={`theme-choice${!isDark ? ' active' : ''}`} aria-hidden="true">☼</span>
      <span className="theme-divider" aria-hidden="true" />
      <span className={`theme-choice${isDark ? ' active' : ''}`} aria-hidden="true">☾</span>
    </button>
  )
}
