import { SocialLinks } from './SocialLinks'

export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#inicio">
        <span className="brand-logo-slot" role="img" aria-label="Caballo de ajedrez" />
        <span>Nicoll Chess – Portfolio</span>
      </a>
      <nav className="top-navigation" aria-label="Herramientas del portfolio">
        <button className="top-button" type="button"><span className="nav-symbol">?</span>Ayuda</button>
        <button className="top-button progress-button" type="button">
          <span className="progress-symbol" aria-hidden="true">▮▮▮</span><span>Progreso</span><strong>25%</strong>
          <span className="header-progress"><i /></span>
        </button>
      </nav>
      <SocialLinks className="header-socials" />
    </header>
  )
}
