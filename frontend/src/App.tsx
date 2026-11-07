import { useState } from 'react'
import { Chessboard } from './components/Chessboard'
import { ChallengePanel, type Difficulty } from './components/ChallengePanel'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ThemeToggle } from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermedio')
  const [started, setStarted] = useState(false)

  return (
    <div className="app-shell" data-theme={theme}>
      <Sidebar />
      <main className="main-content" id="inicio">
        <div className="topbar">
          <span className="breadcrumb">Portfolio <span>/</span> Inicio</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <Header />
        <section className="challenge-layout" aria-label="Reto de ajedrez">
          <div className="board-card">
            <div className="board-heading">
              <div>
                <p className="eyebrow">EL RETO DE HOY</p>
                <h2>Una jugada a la vez</h2>
              </div>
              <span className="live-badge"><span /> Posición inicial</span>
            </div>
            <Chessboard />
            <div className="board-footer">
              <span><span className="turn-dot" /> Juegan blancas</span>
              <span className="notation">♙ &nbsp; e4 para empezar</span>
            </div>
          </div>
          <ChallengePanel
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            started={started}
            onStart={() => setStarted(true)}
          />
        </section>
        <footer className="page-footer">
          <span>Diseñado con estrategia y propósito.</span>
          <span>© 2025 · Portfolio personal</span>
        </footer>
      </main>
    </div>
  )
}

export default App
