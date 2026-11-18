const lockedSections = [
  { icon: 'folder', label: 'Mis Proyectos' },
  { icon: 'cap', label: 'Mi Formación' },
  { icon: 'briefcase', label: 'Mi Experiencia' },
]

export function ChallengePanel() {
  return (
    <aside className="right-column">
      <section className="info-card welcome-card">
        <div className="card-title"><span className="info-symbol" aria-hidden="true">i</span><h2>Bienvenido</h2></div>
        <div className="welcome-copy"><h3>¡Hola!</h3><p>Explora mi portfolio a través del ajedrez. Resuelve los retos para descubrir más sobre mí.</p></div>
        <div className="tip"><span className="tip-icon" aria-hidden="true">💡</span><div><h3>Consejo</h3><p>Completa los retos para desbloquear nuevas secciones de mi portfolio.</p></div></div>
      </section>
      <section className="info-card locked-card">
        <div className="card-title"><span aria-hidden="true"><LockIcon /></span><h2>Secciones bloqueadas</h2></div>
        <div className="locked-list">{lockedSections.map((section) => <div className="locked-item" key={section.label} aria-label={`${section.label}, bloqueado`}><span className="locked-icon" aria-hidden="true"><SectionIcon name={section.icon} /></span><span>{section.label}</span><span className="lock" aria-hidden="true"><LockIcon /></span></div>)}</div>
      </section>
    </aside>
  )
}

function LockIcon() {
  return <svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3h2v12H5V10h2Zm2 0h6V7a3 3 0 0 0-6 0v3Zm3 3a2 2 0 0 0-1 3.73V19h2v-2.27A2 2 0 0 0 12 13Z" fill="currentColor" /></svg>
}

function SectionIcon({ name }: { name: string }) {
  if (name === 'folder') return <svg viewBox="0 0 24 24"><path d="M2 5h8l2 2h10v12H2V5Zm2 4v8h14v-8H4Z" fill="currentColor" /></svg>
  if (name === 'cap') return <svg viewBox="0 0 24 24"><path d="m1 9 11-6 11 6-11 6L1 9Zm4 3.1 7 3.8 7-3.8V17c-3.6 3-10.4 3-14 0v-4.9ZM21 10h2v7h-2z" fill="currentColor" /></svg>
  return <svg viewBox="0 0 24 24"><path d="M8 4h8l1.5 3H22v13H2V7h4.5L8 4Zm1.3 3h5.4l-.5-1h-4.4l-.5 1ZM5 10v7h14v-7H5Zm4 1h6v2H9z" fill="currentColor" /></svg>
}
