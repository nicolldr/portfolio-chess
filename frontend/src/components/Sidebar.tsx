const navigation = [
  { label: 'Inicio', icon: '⌂', href: '#inicio', active: true },
  { label: 'Sobre mí', icon: '◎', href: '#sobre-mi' },
  { label: 'Tecnologías', icon: '⌘', href: '#tecnologias' },
  { label: 'Proyectos', icon: '▧', href: '#proyectos' },
  { label: 'Experiencia', icon: '▤', href: '#experiencia' },
  { label: 'Contacto', icon: '↗', href: '#contacto' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="Inicio del portfolio">
        <span className="brand-mark">♞</span>
        <span className="brand-name">nicol<span>.</span></span>
      </a>
      <p className="nav-caption">MENÚ PRINCIPAL</p>
      <nav aria-label="Navegación principal">
        {navigation.map((item) => (
          <a className={`nav-link${item.active ? ' is-active' : ''}`} href={item.href} key={item.label}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
            {item.active && <span className="active-indicator" />}
          </a>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="availability"><span /> Disponible para colaborar</div>
        <div className="profile-mini">
          <div className="avatar">N</div>
          <div><strong>Nicoll Díaz</strong><span>Desarrolladora</span></div>
          <span className="profile-menu">···</span>
        </div>
      </div>
    </aside>
  )
}
