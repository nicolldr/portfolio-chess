import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  CircleHelp,
  CodeXml,
  GraduationCap,
  Lightbulb,
  Moon,
  RotateCcw,
  Sun,
  Unlock,
  X,
} from "lucide-react";
import { Chess, type Square } from "chess.js";
import { SocialLinks } from "./components/SocialLinks";
import avatar from "./assets/avatar.svg";
import "./App.css";

type Screen = "welcome" | "levels" | "challenge" | "unlock" | "portfolio";
type Level = { id: string; name: string; rating: string; icon: string };
const levels: Level[] = [
  { id: "beginner", name: "Principiante", rating: "< 1200", icon: "♟" },
  { id: "amateur", name: "Aficionado", rating: "1200 – 1599", icon: "♞" },
  { id: "club", name: "Jugador de club", rating: "1600 – 1999", icon: "♜" },
  { id: "expert", name: "Experto", rating: "2000 – 2199", icon: "♝" },
  { id: "advanced", name: "Nivel avanzado", rating: "2200 – 2299", icon: "♛" },
  { id: "master", name: "Maestro", rating: "2300 – 2399", icon: "♚" },
  {
    id: "strong-master",
    name: "Maestro fuerte",
    rating: "2400 – 2499",
    icon: "♜",
  },
  { id: "grandmaster", name: "Gran Maestro", rating: "2500+", icon: "♞" },
];
const storageKey = "nicoll-chess:v1";
type Persisted = {
  theme: "light" | "dark";
  level: string;
  unlocked: boolean;
  completed: string[];
  recent: string[];
  session: string[];
  screen: Screen;
};
type Puzzle = {
  puzzleId: string;
  fen: string;
  moves: string;
  rating: number;
  ratingDeviation: number;
  popularity: number;
  nbPlays: number;
  themes: string[];
  gameUrl: string;
  group: string;
  metadata: { openingTags: string[] };
};
function readState(): Persisted {
  const defaults: Persisted = {
    theme: "light",
    level: "beginner",
    unlocked: false,
    completed: [],
    recent: [],
    session: [],
    screen: "welcome",
  };
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaults;
    const value = JSON.parse(raw) as Partial<Persisted>;
    return {
      ...defaults,
      ...value,
      theme: value.theme === "dark" ? "dark" : "light",
      level: levels.some((level) => level.id === value.level)
        ? value.level!
        : "beginner",
      completed: Array.isArray(value.completed) ? value.completed : [],
      recent: Array.isArray(value.recent) ? value.recent : [],
      session: Array.isArray(value.session) ? value.session : [],
    };
  } catch {
    return defaults;
  }
}

const portfolioSections = [
  {
    id: "projects",
    title: "Mis proyectos",
    copy: "Descubre mis trabajos y proyectos de desarrollo.",
    icon: CodeXml,
  },
  {
    id: "education",
    title: "Mi formación",
    copy: "Conoce mi formación y aprendizaje continuo.",
    icon: GraduationCap,
  },
  {
    id: "experience",
    title: "Mi experiencia",
    copy: "Mi trayectoria profesional en el mundo tech.",
    icon: BriefcaseBusiness,
  },
];
function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function App() {
  const [saved, setSaved] = useState<Persisted>(readState);
  const [screen, setScreen] = useState<Screen>(
    saved.unlocked
      ? "portfolio"
      : saved.screen === "challenge"
        ? "challenge"
        : "welcome",
  );
  const [board, setBoard] = useState(() => new Chess());
  const [selected, setSelected] = useState<Square | null>(null);
  const [section, setSection] = useState("");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const [hint, setHint] = useState(false);
  const [freePlay, setFreePlay] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [solutionIndex, setSolutionIndex] = useState(1);
  const level = levels.find((item) => item.id === saved.level) ?? levels[0];

  function setPuzzlePosition(puzzle: Puzzle) {
    const game = new Chess(puzzle.fen);
    const moves = puzzle.moves.split(/\s+/);
    game.move({
      from: moves[0].slice(0, 2),
      to: moves[0].slice(2, 4),
      promotion: moves[0][4],
    });
    setBoard(game);
    setSolutionIndex(1);
    setHint(false);
    setSelected(null);
  }

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ...saved, screen }));
    } catch {
      /* Storage may be unavailable. */
    }
  }, [saved, screen]);
  useEffect(() => {
    document.documentElement.dataset.theme = saved.theme;
  }, [saved.theme]);
  useEffect(() => {
    fetch("/data/puzzles.json")
      .then((response) =>
        response.ok
          ? (response.json() as Promise<{ puzzles: Puzzle[] }>)
          : Promise.reject(),
      )
      .then((data) => {
        setPuzzles(data.puzzles);
        if (saved.screen !== "challenge" || !saved.session.length) return;
        const pending = saved.session.findIndex(
          (id) => !saved.completed.includes(id),
        );
        if (pending < 0) return;
        const oldId = saved.session[pending];
        const replacement =
          shuffle(
            data.puzzles.filter(
              (puzzle) =>
                puzzle.group === saved.level &&
                !saved.completed.includes(puzzle.puzzleId) &&
                !saved.session.includes(puzzle.puzzleId) &&
                !saved.recent.includes(puzzle.puzzleId),
            ),
          )[0] ??
          data.puzzles.find(
            (puzzle) =>
              puzzle.group === saved.level && puzzle.puzzleId !== oldId,
          );
        const current = data.puzzles.find(
          (puzzle) => puzzle.puzzleId === oldId,
        );
        if (replacement) {
          const session = [...saved.session];
          session[pending] = replacement.puzzleId;
          setSaved((value) => ({
            ...value,
            session,
            recent: [...value.recent, replacement.puzzleId].slice(-60),
          }));
          setChallengeIndex(pending);
          setPuzzlePosition(replacement);
        } else if (current) {
          setChallengeIndex(pending);
          setPuzzlePosition(current);
        }
      })
      .catch(() => setPuzzles([]));
    // The library loads once and restores the saved in-progress challenge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const legal = useMemo(
    () =>
      selected
        ? board
            .moves({ square: selected, verbose: true })
            .map((move) => move.to)
        : [],
    [board, selected],
  );
  const go = (next: Screen) => {
    setScreen(next);
    setNotice("");
    setSelected(null);
  };
  const selectLevel = (id: string) =>
    setSaved((current) => ({ ...current, level: id }));
  const startChallenges = () => {
    const available = puzzles.filter(
      (puzzle) =>
        puzzle.group === saved.level &&
        !saved.completed.includes(puzzle.puzzleId),
    );
    const recentSafe = available.filter(
      (puzzle) => !saved.recent.includes(puzzle.puzzleId),
    );
    const pool = shuffle(recentSafe.length >= 3 ? recentSafe : available);
    if (pool.length < 3) {
      setNotice(
        puzzles.length
          ? "No hay tres ejercicios válidos disponibles para este nivel."
          : "La biblioteca de ejercicios aún no está cargada. Ejecuta el importador con el CSV oficial de Lichess.",
      );
      go("levels");
      return;
    }
    const selectedPuzzles = pool.slice(0, 3);
    setSaved((current) => ({
      ...current,
      session: selectedPuzzles.map((puzzle) => puzzle.puzzleId),
      recent: [
        ...current.recent,
        ...selectedPuzzles.map((puzzle) => puzzle.puzzleId),
      ].slice(-60),
      screen: "challenge",
    }));
    setChallengeIndex(0);
    setFreePlay(false);
    setPuzzlePosition(selectedPuzzles[0]);
    go("challenge");
  };
  const advanceChallenge = () => {
    const completed = Array.from(
      new Set([...saved.completed, saved.session[challengeIndex]]),
    );
    if (challengeIndex === 2) {
      setSaved((current) => ({ ...current, completed, unlocked: true }));
      go("unlock");
    } else {
      const nextIndex = challengeIndex + 1;
      const next = puzzles.find(
        (puzzle) => puzzle.puzzleId === saved.session[nextIndex],
      );
      setSaved((current) => ({ ...current, completed }));
      setChallengeIndex(nextIndex);
      if (next) setPuzzlePosition(next);
      setNotice("¡Reto completado! Vamos con el siguiente.");
    }
  };
  const attemptMove = (from: Square, to: Square) => {
    const game = new Chess(board.fen());
    if (!freePlay) {
      const puzzle = puzzles.find(
        (item) => item.puzzleId === saved.session[challengeIndex],
      );
      const moves = puzzle?.moves.split(/\s+/) ?? [];
      const expected = moves[solutionIndex];
      const attempted = `${from}${to}`;
      if (
        !expected ||
        attempted !== expected.slice(0, 4) ||
        (expected.length === 5 && expected[4] !== "q")
      ) {
        setNotice(
          "Ese movimiento no resuelve el ejercicio. Puedes volver a intentarlo.",
        );
        return;
      }
      const userMove = game.move({ from, to, promotion: expected[4] });
      if (!userMove) {
        setNotice("No se pudo validar ese movimiento. Vuelve a intentarlo.");
        return;
      }
      let nextIndex = solutionIndex + 1;
      if (nextIndex < moves.length) {
        const reply = moves[nextIndex];
        game.move({
          from: reply.slice(0, 2),
          to: reply.slice(2, 4),
          promotion: reply[4],
        });
        nextIndex++;
      }
      setBoard(game);
      setSelected(null);
      setSolutionIndex(nextIndex);
      if (nextIndex >= moves.length) advanceChallenge();
      else setNotice("Correcto. Busca la siguiente jugada.");
      return;
    }
    const move = game.move({ from, to, promotion: "q" });
    if (!move) {
      setNotice("Ese movimiento no es legal. Prueba otra casilla.");
      setSelected(null);
      return;
    }
    setSelected(null);
    if (freePlay) {
      setBoard(game);
      setNotice(game.isCheckmate() ? "Jaque mate." : "");
      return;
    }
  };
  const clickSquare = (square: Square) => {
    if (selected && legal.includes(square)) {
      attemptMove(selected, square);
      return;
    }
    if (selected === square) {
      setSelected(null);
      return;
    }
    if (board.get(square)?.color === board.turn()) setSelected(square);
    else if (selected) {
      setSelected(null);
      setNotice("Selecciona una pieza de tu color y una casilla legal.");
    }
  };
  const resetProgress = () => {
    if (
      !window.confirm(
        "¿Quieres reiniciar el progreso de los retos? El tema visual se conservará.",
      )
    )
      return;
    setSaved((current) => ({
      ...current,
      unlocked: false,
      completed: [],
      session: [],
      recent: [],
    }));
    go("welcome");
  };
  const startFreePlay = () => {
    setFreePlay(true);
    setBoard(new Chess());
    setNotice("Juega libremente. Las partidas no afectan a tu progreso.");
    go("challenge");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => go("welcome")}
          aria-label="Ir al inicio"
        >
          <span className="brand-knight">♞</span>
          <span>Nicoll Chess</span>
        </button>
        <div className="top-actions">
          <button
            className="icon-button"
            onClick={() => setHelpOpen(true)}
            aria-label="Ayuda"
          >
            <CircleHelp />
          </button>
          <button
            className="theme-switch"
            onClick={() =>
              setSaved((value) => ({
                ...value,
                theme: value.theme === "light" ? "dark" : "light",
              }))
            }
            aria-label="Cambiar tema"
          >
            {saved.theme === "light" ? <Sun /> : <Moon />}
            <span className="theme-knob">
              {saved.theme === "light" ? <Moon /> : <Sun />}
            </span>
          </button>
          <SocialLinks className="header-socials" />
        </div>
      </header>

      {screen === "welcome" && (
        <main className="welcome-screen">
          <div className="welcome-content">
            <div className="accent-line" />
            <h1>
              Para conocer mi trayectoria,
              <br />
              debes resolver 3 retos de ajedrez.
            </h1>
            <p>
              Demuestra tu habilidad en el tablero y descubre
              <br className="desktop-break" /> mis proyectos, formación y
              experiencia.
            </p>
            <div className="welcome-actions">
              <button className="primary-button" onClick={() => go("levels")}>
                Sí, quiero el reto <ArrowRight />
              </button>
              <button
                className="secondary-button"
                onClick={() => {
                  setSaved((value) => ({ ...value, unlocked: true }));
                  go("portfolio");
                }}
              >
                No, gracias <ArrowRight />
              </button>
            </div>
          </div>
        </main>
      )}

      {screen === "levels" && (
        <main className="levels-screen">
          <button className="back-button" onClick={() => go("welcome")}>
            <ArrowLeft /> Volver
          </button>
          <div className="levels-content">
            <div className="accent-line" />
            <h1>Selecciona tu nivel de ajedrez</h1>
            <p>
              Elige el nivel que mejor se adapte a tu experiencia. Los retos se
              ajustarán a tu nivel.
            </p>
            <div className="level-grid">
              {levels.map((item) => (
                <button
                  key={item.id}
                  className={`level-card ${saved.level === item.id ? "is-selected" : ""}`}
                  onClick={() => selectLevel(item.id)}
                  aria-pressed={saved.level === item.id}
                >
                  <span className="level-piece">{item.icon}</span>
                  <strong>{item.name}</strong>
                  <span className="level-rating">{item.rating}</span>
                  {saved.level === item.id && (
                    <span className="selected-check">
                      <Check />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              className="primary-button levels-submit"
              onClick={startChallenges}
            >
              Comenzar los retos <ArrowRight />
            </button>
            <small>
              Los rangos son orientativos y no representan títulos oficiales de
              la FIDE.
            </small>
          </div>
        </main>
      )}

      {screen === "challenge" && (
        <main className="challenge-screen">
          <div className="challenge-progress">
            <span>Reto {challengeIndex + 1} de 3</span>
            <div className="progress-track">
              {[0, 1, 2].map((item) => (
                <i
                  key={item}
                  className={
                    item < saved.session.length
                      ? "done"
                      : item === challengeIndex
                        ? "active"
                        : ""
                  }
                />
              ))}
            </div>
            <span>Progreso: {saved.session.length} / 3</span>
          </div>
          <div className="challenge-layout">
            <div className="board-frame">
              <div className="board-inner">
                <div
                  className="chessboard"
                  role="grid"
                  aria-label="Tablero de ajedrez"
                >
                  {Array.from({ length: 64 }, (_, index) => {
                    const rank = 7 - Math.floor(index / 8);
                    const file = index % 8;
                    const square = `${"abcdefgh"[file]}${rank + 1}` as Square;
                    const piece = board.get(square);
                    const isLight = (rank + file) % 2 === 1;
                    return (
                      <button
                        key={square}
                        role="gridcell"
                        className={`square ${isLight ? "light-square" : "dark-square"} ${selected === square ? "selected-square" : ""} ${legal.includes(square) ? "legal-square" : ""}`}
                        aria-label={`${square}${piece ? `, pieza ${piece.type}` : ""}`}
                        onClick={() => clickSquare(square)}
                      >
                        <span className="piece" data-color={piece?.color}>
                          {piece ? pieceGlyph(piece.color, piece.type) : ""}
                        </span>
                        {file === 0 && (
                          <small className="rank-coordinate">{rank + 1}</small>
                        )}
                        {rank === 0 && (
                          <small className="file-coordinate">
                            {"abcdefgh"[file]}
                          </small>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <section className="challenge-info">
              <div className="challenge-label">
                {freePlay
                  ? "JUEGO LIBRE"
                  : `RETO ${challengeIndex + 1} · ${level.name.toUpperCase()}`}
              </div>
              <h2>
                {freePlay
                  ? "Una partida a tu ritmo"
                  : "Encuentra la mejor jugada"}
              </h2>
              <p>
                {freePlay
                  ? "Juegan las blancas. Cada movimiento se valida con chess.js."
                  : "La biblioteca de ejercicios Lichess está preparada para integrarse."}
              </p>
              <div className="challenge-divider" />
              <div className="hint-block">
                <Lightbulb />
                <div>
                  <h3>Consejo</h3>
                  <p>
                    {hint
                      ? "Selecciona una pieza para ver los movimientos legales disponibles."
                      : "Piensa con calma. Puedes solicitar una pista cuando la necesites."}
                  </p>
                </div>
              </div>
              <p className="notice" aria-live="polite">
                {notice}
              </p>
              <div className="challenge-actions">
                <button
                  className="secondary-button compact"
                  onClick={() => setHint(true)}
                >
                  <Lightbulb /> Pista
                </button>
                <button
                  className="secondary-button compact"
                  onClick={() => {
                    setBoard(new Chess());
                    setNotice("Posición reiniciada.");
                    setSelected(null);
                  }}
                >
                  <RotateCcw /> Reintentar
                </button>
              </div>
              {freePlay && (
                <button className="text-button" onClick={() => go("portfolio")}>
                  Volver al portfolio
                </button>
              )}
              {!freePlay && (
                <button
                  className="text-button"
                  onClick={() => {
                    setNotice(
                      "Aún no hay una colección de ejercicios cargada. Ejecuta el importador cuando tengas el CSV Lichess.",
                    );
                  }}
                >
                  Continuar
                </button>
              )}
            </section>
          </div>
        </main>
      )}

      {screen === "unlock" && (
        <main className="unlock-screen">
          <div className="accent-line" />
          <div className="unlock-icon">
            <Unlock />
          </div>
          <h1>¡Portfolio desbloqueado!</h1>
          <p>
            Has completado los tres retos. Ya puedes conocer mi trayectoria.
          </p>
          <button
            className="primary-button"
            onClick={() => {
              setSaved((value) => ({ ...value, unlocked: true }));
              go("portfolio");
            }}
          >
            Explorar portfolio <ArrowRight />
          </button>
        </main>
      )}

      {screen === "portfolio" && (
        <main className="portfolio-screen">
          <aside className="profile-panel">
            <img src={avatar} alt="Avatar de Nicoll Díaz Rendón" />
            <h2>Nicoll Díaz Rendón</h2>
            <p className="profile-role">Backend Developer</p>
            <p className="profile-summary">
              Desarrolladora de software y ajedrecista, orientada al desarrollo
              backend y la inteligencia artificial.
            </p>
            <div className="profile-separator" />
            <div className="profile-level">
              <span>♟</span>
              <div>
                <strong>Nivel de ajedrez</strong>
                <small>{level.name}</small>
              </div>
            </div>
            <div className="profile-tools">
              <button onClick={startFreePlay}>
                <span>♞</span> Tablero libre
              </button>
              <button
                onClick={() => {
                  if (saved.session.length) startChallenges();
                  else go("levels");
                }}
              >
                <RotateCcw /> Repetir retos
              </button>
            </div>
          </aside>
          <section className="portfolio-main">
            <button
              className="back-button portfolio-back"
              onClick={() => go("welcome")}
            >
              <ArrowLeft /> Inicio
            </button>
            <h1>
              {section
                ? portfolioSections.find((item) => item.id === section)?.title
                : "Mi portfolio"}
            </h1>
            <p className="portfolio-intro">
              Explora mis proyectos, formación y experiencia.
            </p>
            {section ? (
              <SectionContent id={section} onBack={() => setSection("")} />
            ) : (
              <div className="portfolio-cards">
                {portfolioSections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      className="portfolio-card"
                      key={item.id}
                      onClick={() => setSection(item.id)}
                    >
                      <Icon />
                      <h2>{item.title}</h2>
                      <p>{item.copy}</p>
                      <span>
                        Ver{" "}
                        {item.id === "projects"
                          ? "proyectos"
                          : item.id === "education"
                            ? "formación"
                            : "experiencia"}{" "}
                        <ArrowRight />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="portfolio-footer">
              <button className="text-button" onClick={resetProgress}>
                Reiniciar progreso
              </button>
              <button className="text-button" onClick={startFreePlay}>
                Abrir tablero libre <ArrowRight />
              </button>
            </div>
          </section>
        </main>
      )}

      {helpOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setHelpOpen(false);
          }}
        >
          <section
            className="help-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
          >
            <button
              className="modal-close"
              onClick={() => setHelpOpen(false)}
              aria-label="Cerrar"
            >
              <X />
            </button>
            <CircleHelp />
            <h2 id="help-title">¿Cómo funciona?</h2>
            <p>
              Elige tu nivel, resuelve tres ejercicios de ajedrez y descubre los
              proyectos, la formación y la experiencia de Nicoll.
            </p>
            <p>
              También puedes acceder directamente al portfolio y usar el tablero
              libre.
            </p>
            <button
              className="primary-button"
              onClick={() => setHelpOpen(false)}
            >
              Entendido
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function pieceGlyph(color: "w" | "b", type: "p" | "n" | "b" | "r" | "q" | "k") {
  const glyphs = {
    w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
    b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
  };
  return glyphs[color][type];
}

function SectionContent({ id, onBack }: { id: string; onBack: () => void }) {
  const content =
    id === "projects" ? (
      <>
        <h2>Proyectos</h2>
        <ul>
          <li>
            <strong>SpendControl</strong>
            <span>Proyecto personal o académico.</span>
          </li>
          <li>
            <strong>Nicoll Chess</strong>
            <span>Portfolio interactivo con ajedrez.</span>
          </li>
        </ul>
      </>
    ) : id === "education" ? (
      <>
        <h2>Formación</h2>
        <ul>
          <li>
            <strong>Desarrollo de Aplicaciones Web</strong>
          </li>
          <li>
            <strong>Ingeniería Informática · UOC</strong>
          </li>
          <li>
            <strong>Formación complementaria</strong>
          </li>
        </ul>
      </>
    ) : (
      <>
        <h2>Experiencia</h2>
        <ul>
          <li>
            <strong>SIDEAR</strong>
          </li>
          <li>
            <strong>Consultora Helpdesk · a3ERP</strong>
          </li>
        </ul>
      </>
    );
  return (
    <div className="section-content">
      {content}
      <button className="text-button" onClick={onBack}>
        <ChevronLeft /> Todas las secciones
      </button>
    </div>
  );
}

export default App;
