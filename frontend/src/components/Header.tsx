export function Header() {
  return (
    <header className="welcome-header">
      <div className="intro-copy">
        <h1>Pienso el código<br className="desktop-break" /> como una partida de <span>ajedrez.</span></h1>
        <p>Desbloquea mi perfil resolviendo retos en el tablero.</p>
        <span className="intro-underline" />
      </div>
      <div className="hero-chess-art" aria-hidden="true">
        <span className="hero-king">♚</span>
        <span className="hero-knight">♞</span>
        <span className="hero-checks" />
      </div>
    </header>
  )
}
