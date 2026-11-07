const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const backRank = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
const pawnRank = ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟']

function pieceAt(rank: number, file: number) {
  if (rank === 0) return backRank[file]
  if (rank === 1) return pawnRank[file]
  if (rank === 6) return pawnRank[file]
  if (rank === 7) return backRank[file]
  return ''
}

function isWhitePiece(rank: number) {
  return rank >= 6
}

export function Chessboard() {
  return (
    <div className="board-frame">
      <div className="chessboard" role="img" aria-label="Tablero de ajedrez en posición inicial">
        {Array.from({ length: 64 }, (_, index) => {
          const rank = Math.floor(index / 8)
          const file = index % 8
          const piece = pieceAt(rank, file)
          const squareColor = (rank + file) % 2 === 0 ? 'light-square' : 'dark-square'
          return (
            <div className={`square ${squareColor}`} key={`${rank}-${file}`}>
              {file === 0 && <span className="rank-label">{8 - rank}</span>}
              {rank === 7 && <span className="file-label">{files[file]}</span>}
              {piece && <span className={`piece ${isWhitePiece(rank) ? 'white-piece' : 'black-piece'}`}>{piece}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
