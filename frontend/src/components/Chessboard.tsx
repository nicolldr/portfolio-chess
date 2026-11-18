const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export function Chessboard() {
  return (
    <section className="board-frame" aria-label="Tablero de ajedrez vacío">
      <div className="board-inner">
        <div className="rank-labels" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i}>{8 - i}</span>)}</div>
        <div className="board-column">
          <div className="chessboard" role="img" aria-label="Tablero vacío de ajedrez con 64 casillas">
            {Array.from({ length: 64 }, (_, index) => {
              const row = Math.floor(index / 8)
              const file = index % 8
              const square = `${files[file]}${8 - row}`
              return <div className={`square ${(row + file) % 2 === 0 ? 'light-square' : 'dark-square'}`} data-square={square} key={square} />
            })}
          </div>
          <div className="file-labels" aria-hidden="true">{files.map((file) => <span key={file}>{file}</span>)}</div>
        </div>
      </div>
    </section>
  )
}
