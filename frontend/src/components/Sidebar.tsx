import { SocialLinks } from './SocialLinks'

const navigation = [
  { label: 'Inicio', icon: '⌂', href: '#inicio', active: true },
  { label: 'Proyectos', icon: '✣', href: '#proyectos' },
  { label: 'Formación', icon: '◆', href: '#formacion' },
  { label: 'Experiencia', icon: '▣', href: '#experiencia' },
  { label: 'Contacto', icon: '✉', href: '#contacto' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <a className="brand-mark" href="#inicio" aria-label="Volver al inicio">♘</a>
        <h2>Nicoll Díaz</h2>
        <p>Junior Backend<br />Developer</p>
      </div>
      <nav className="primary-nav" aria-label="Navegación principal">
        {navigation.map((item) => (
          <a className={`nav-link${item.active ? ' is-active' : ''}`} href={item.href} key={item.label}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <SocialLinks className="sidebar-socials" />
    </aside>
  )
}

