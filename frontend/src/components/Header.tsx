export function Header() {
  return (
    <header className="welcome-header" id="sobre-mi">
      <div className="intro-copy">
        <div className="welcome-label"><span>✳</span> PORTFOLIO PERSONAL</div>
        <h1>Hola, soy <span>Nicoll Díaz</span></h1>
        <p className="intro-subtitle">Desarrolladora en formación <span>·</span> Pensamiento estratégico</p>
        <p className="intro-description">
          Como en el ajedrez, cada detalle cuenta. Explora mi camino en el desarrollo,
          mis proyectos y las ideas que estoy construyendo.
        </p>
      </div>
      <div className="header-note" aria-label="Lema">
        <span className="note-piece">♘</span>
        <span>ESTRATEGIA<br />EN CADA LÍNEA</span>
      </div>
    </header>
  )
}
