import type { ReactNode } from 'react'
import avatar from '../assets/avatar.svg'

export function Sidebar() {
  return (
    <aside className="left-column" aria-label="Perfil y nivel">
      <section className="info-card profile-card">
        <CardTitle symbol={<svg viewBox="0 0 24 24"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM3 21v-2.2C3 15.6 6.6 13 12 13s9 2.6 9 5.8V21H3Z" fill="currentColor" /></svg>} title="Perfil" />
        <div className="profile-content">
          <img className="avatar" src={avatar} alt="Avatar pixel art de Nicoll Díaz Rendón" />
          <div><h2>Nicoll Díaz Rendón</h2><p>Desarrollador &amp; Ajedrecista</p></div>
        </div>
      </section>
      <section className="info-card level-card">
        <CardTitle symbol={<svg viewBox="0 0 24 24"><path d="M3 14h4v7H3zm7-5h4v12h-4zm7-6h4v18h-4z" fill="currentColor" /></svg>} title="Nivel" />
        <label className="level-control"><span aria-hidden="true">♟</span><select defaultValue="Principiante" aria-label="Nivel de ajedrez"><option>Principiante</option><option>Intermedio</option><option>Avanzado</option><option>Profesional</option></select></label>
      </section>
      <section className="info-card challenges-card">
        <CardTitle symbol={<svg viewBox="0 0 24 24"><path d="M6 3h12v2h3v4c0 3-2 5-5 5a5 5 0 0 1-3 2v3h4v2H7v-2h4v-3a5 5 0 0 1-3-2C5 14 3 12 3 9V5h3V3ZM5 7v2c0 1.5.6 2.5 2 3V7H5Zm14 0h-2v5c1.4-.5 2-1.5 2-3V7Z" fill="currentColor" /></svg>} title="Retos" />
        <div className="challenge-count"><strong>0 / 4</strong> retos completados</div>
        <div className="challenge-meter" role="img" aria-label="0 de 4 retos completados"><span /></div>
        <div className="challenge-watermark" aria-hidden="true"><span>♟</span><span>♛</span><span>♝</span><span>♞</span><span>♜</span></div>
      </section>
    </aside>
  )
}

function CardTitle({ symbol, title }: { symbol: ReactNode; title: string }) {
  return <div className="card-title"><span aria-hidden="true">{symbol}</span><h2>{title}</h2></div>
}
