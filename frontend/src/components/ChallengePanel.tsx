export type Difficulty = 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto'

type ChallengePanelProps = {
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  started: boolean
  onStart: () => void
}

const difficulties: { name: Difficulty; level: string }[] = [
  { name: 'Principiante', level: '01' },
  { name: 'Intermedio', level: '02' },
  { name: 'Avanzado', level: '03' },
  { name: 'Experto', level: '04' },
]

export function ChallengePanel({ difficulty, onDifficultyChange, started, onStart }: ChallengePanelProps) {
  return (
    <aside className="challenge-panel">
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">TU PRÓXIMO MOVIMIENTO</p>
          <h2>Elige tu nivel</h2>
        </div>
        <span className="panel-icon" aria-hidden="true">♙</span>
      </div>
      <p className="panel-description">Cada reto es una nueva oportunidad para aprender.</p>

      <div className="difficulty-list" role="group" aria-label="Seleccionar dificultad">
        {difficulties.map((item) => (
          <button
            className={`difficulty-option${difficulty === item.name ? ' selected' : ''}`}
            key={item.name}
            onClick={() => onDifficultyChange(item.name)}
            type="button"
            aria-pressed={difficulty === item.name}
          >
            <span className="difficulty-number">{item.level}</span>
            <span>{item.name}</span>
            <span className="radio-mark" />
          </button>
        ))}
      </div>

      <div className="progress-block">
        <div className="progress-copy"><span>Progreso del portfolio</span><strong>65%</strong></div>
        <div className="progress-track" role="progressbar" aria-label="Progreso del portfolio" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
          <span />
        </div>
        <span className="progress-caption">Vas por buen camino</span>
      </div>

      <button className="start-button" type="button" onClick={onStart}>
        {started ? 'Reto preparado' : 'Comenzar el reto'} <span aria-hidden="true">↗</span>
      </button>
      <p className="panel-footnote">♧ &nbsp; Sin prisa. Piensa tu siguiente jugada.</p>
    </aside>
  )
}
