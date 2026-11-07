export function ChallengePanel() {
  return (
    <aside className="challenge-panel" aria-label="Información del reto">
      <section className="challenge-intro">
        <span className="trophy-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64"><path d="M18 8h28v8h12v8c0 10-6 16-15 17-2 3-5 5-8 6v6h12v7H17v-7h12v-6c-4-1-7-3-9-6-9-1-15-7-15-17v-8h13V8Zm0 14h-7v2c0 5 2 9 7 10V22Zm35 0h-7v12c5-1 7-5 7-10v-2Z" /></svg>
        </span>
        <div><h2>¡Tu primer reto!</h2><p>Mueve la dama y da jaque mate en 1 jugada.</p></div>
      </section>
      <section className="challenge-hint">
        <h3><span className="bulb-icon" aria-hidden="true"><svg viewBox="0 0 32 40"><path d="M16 2a11 11 0 0 0-7.4 19.1c1.5 1.4 2.4 3.2 2.6 5.2h9.6c.2-2 1.1-3.8 2.6-5.2A11 11 0 0 0 16 2Z" /><path d="M11.5 30h9M12.5 34h7M14 38h4" /></svg></span> Un pequeño adelanto...</h3>
        <p>Soy una apasionada del ajedrez, la tecnología y los retos. Me encanta aprender, resolver problemas y construir soluciones eficientes.</p>
      </section>
      <section className="challenge-progress" aria-label="Progreso del reto">
        <div className="progress-copy"><strong>Tu progreso</strong><strong>1 / 5</strong></div>
        <div className="progress-track" role="img" aria-label="Progreso visual: 1 de 5"><span /></div>
      </section>
      <button className="next-button" type="button"><span aria-hidden="true">→</span> Siguiente movimiento</button>
    </aside>
  )
}
