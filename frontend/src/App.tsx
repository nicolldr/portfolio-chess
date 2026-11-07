import { Chessboard } from './components/Chessboard'
import { ChallengePanel } from './components/ChallengePanel'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { SocialLinks } from './components/SocialLinks'
import { ThemeToggle } from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app-shell" data-theme={theme}>
      <Sidebar />
      <main className="main-content" id="inicio">
        <div className="mobile-toolbar">
          <button className="menu-button" type="button" aria-label="Menú"><span /><span /><span /></button>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <div className="desktop-toolbar"><ThemeToggle theme={theme} onToggle={toggleTheme} /></div>
        <Header />
        <section className="challenge-layout" aria-label="Portfolio y reto de ajedrez">
          <Chessboard />
          <ChallengePanel />
        </section>
        <footer className="page-footer">
          <span className="footer-rule" />
          <SocialLinks className="social-links" />
          <span className="footer-rule" />
        </footer>
      </main>
    </div>
  )
}

export default App
