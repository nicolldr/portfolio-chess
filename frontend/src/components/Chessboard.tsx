type Piece = { symbol: string; color: 'white' | 'black' }

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const puzzlePieces: Record<string, Piece> = {
  h8: { symbol: '♚', color: 'black' },
  h7: { symbol: '♟', color: 'black' },
  h6: { symbol: '♛', color: 'black' },
  h1: { symbol: '♔', color: 'white' },
}

export function Chessboard() {
  return (
    <section className="board-card" aria-label="Reto visual de ajedrez">
      <div className="board-heading">
        <div className="move-title"><span className="move-icon" aria-hidden="true">✣</span><h2>Movimiento 1 de 5</h2></div>
        <div className="move-dots" aria-label="Movimiento 1 de 5">
          {Array.from({ length: 5 }, (_, index) => <span className={index === 0 ? 'current' : ''} key={index} />)}
        </div>
      </div>
      <div className="board-with-coordinates">
        <div className="rank-labels" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index}>{8 - index}</span>)}</div>
        <div className="board-column">
          <div className="chessboard" role="img" aria-label="Tablero estático: rey negro en h8, peón negro en h7, dama negra en h6 y rey blanco en h1. Casilla h4 resaltada.">
            {Array.from({ length: 64 }, (_, index) => {
              const rank = Math.floor(index / 8)
              const file = index % 8
              const square = `${files[file]}${8 - rank}`
              const piece = puzzlePieces[square]
              const color = (rank + file) % 2 === 0 ? 'light-square' : 'dark-square'
              return <div className={`square ${color}${square === 'h4' ? ' highlighted-square' : ''}`} key={square}>{piece && <span className={`piece ${piece.color}-piece`}>{piece.symbol}</span>}</div>
            })}
          </div>
          <div className="file-labels" aria-hidden="true">{files.map((file) => <span key={file}>{file}</span>)}</div>
        </div>
      </div>
    </section>
  )
}
