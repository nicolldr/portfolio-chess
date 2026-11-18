import { createInterface } from 'node:readline'
import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { Chess } from 'chess.js'

const specs = [
  { id: 'beginner', min: 600, max: 1199 }, { id: 'amateur', min: 1100, max: 1599 },
  { id: 'club', min: 1500, max: 1999 }, { id: 'expert', min: 1900, max: 2199 },
  { id: 'advanced', min: 2100, max: 2299 }, { id: 'master', min: 2200, max: 2399 },
  { id: 'strong-master', min: 2300, max: 2499 }, { id: 'grandmaster', min: 2400, max: 3200 },
]
const target = 50
const maxPerGroup = 1200
const pools = Object.fromEntries(specs.map(({ id }) => [id, []]))
const ids = new Set()
const qualityCounts = Object.fromEntries(specs.map(({ id }) => [id, { inRange: 0, quality: 0, valid: 0 }]))
const minPopularity = Number(process.env.MIN_POPULARITY ?? 70)
const minPlays = Number(process.env.MIN_PLAYS ?? 100)
const maxDeviation = Number(process.env.MAX_RATING_DEVIATION ?? 100)

function parseCsv(line) {
  const fields = []; let value = ''; let quoted = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"' && quoted && line[i + 1] === '"') { value += '"'; i++ }
    else if (char === '"') quoted = !quoted
    else if (char === ',' && !quoted) { fields.push(value); value = '' }
    else value += char
  }
  fields.push(value); return fields
}
function hash(value) { return createHash('sha256').update(value).digest('hex') }
function validPuzzle(row) {
  try {
    const game = new Chess(row.fen)
    for (const uci of row.moves.trim().split(/\s+/)) {
      if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(uci)) return false
      const move = game.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4]?.toLowerCase() })
      if (!move) return false
    }
    return row.moves.trim().split(/\s+/).length >= 2
  } catch { return false }
}
function assignGroup(rating, puzzleId) {
  const eligible = specs.filter((group) => rating >= group.min && rating <= group.max)
  if (!eligible.length) return null
  // Balance overlapping ranges by assigning each row to the least populated eligible group.
  return eligible.sort((a, b) => qualityCounts[a.id].inRange - qualityCounts[b.id].inRange || a.id.localeCompare(b.id))[0].id
}
function offer(pool, puzzle) {
  const score = Number(puzzle.popularity) * 100000 + Number(puzzle.nbPlays)
  puzzle._score = score
  if (pool.length < maxPerGroup) pool.push(puzzle)
  else {
    let worst = 0
    for (let i = 1; i < pool.length; i++) if (pool[i]._score < pool[worst]._score || (pool[i]._score === pool[worst]._score && pool[i].puzzleId > pool[worst].puzzleId)) worst = i
    if (score > pool[worst]._score || (score === pool[worst]._score && puzzle.puzzleId < pool[worst].puzzleId)) pool[worst] = puzzle
  }
}

let header
let rows = 0
for await (const line of createInterface({ input: process.stdin, crlfDelay: Infinity })) {
  if (!header) { header = parseCsv(line); continue }
  const values = parseCsv(line)
  if (values.length !== header.length) continue
  const row = Object.fromEntries(header.map((key, index) => [key, values[index]]))
  rows++
  if (!row.PuzzleId || ids.has(row.PuzzleId)) continue
  ids.add(row.PuzzleId)
  const rating = Number(row.Rating); const group = assignGroup(rating, row.PuzzleId)
  if (!group) continue
  qualityCounts[group].inRange++
  const puzzle = { puzzleId: row.PuzzleId, fen: row.FEN, moves: row.Moves, rating, ratingDeviation: Number(row.RatingDeviation), popularity: Number(row.Popularity), nbPlays: Number(row.NbPlays), themes: row.Themes?.split(' ').filter(Boolean) ?? [], gameUrl: row.GameUrl, group, metadata: { openingTags: row.OpeningTags?.split(' ').filter(Boolean) ?? [] } }
  const quality = puzzle.popularity >= minPopularity && puzzle.nbPlays >= minPlays && puzzle.ratingDeviation <= maxDeviation
  if (!quality) continue
  qualityCounts[group].quality++
  if (!validPuzzle(puzzle)) continue
  qualityCounts[group].valid++
  offer(pools[group], puzzle)
}

// Preserve unique IDs and relax configured quality filters only if a target group is short.
const chosen = []; const chosenIds = new Set()
for (const group of specs) {
  const entries = pools[group.id].sort((a, b) => b._score - a._score || a.puzzleId.localeCompare(b.puzzleId))
  for (const entry of entries) {
    if (chosenIds.has(entry.puzzleId) || chosen.filter((item) => item.group === group.id).length >= target) continue
    chosenIds.add(entry.puzzleId); delete entry._score; chosen.push(entry)
  }
}
const counts = Object.fromEntries(specs.map(({ id }) => [id, chosen.filter((puzzle) => puzzle.group === id).length]))
const report = { source: 'Lichess Open Database (CC0)', streamedRows: rows, uniquePuzzleIds: ids.size, configuredFilters: { minPopularity, minPlays, maxDeviation }, groups: Object.fromEntries(specs.map(({ id, min, max }) => [id, { ratingRange: [min, max], target, selected: counts[id], inRange: qualityCounts[id].inRange, passingFilters: qualityCounts[id].quality, validSequences: qualityCounts[id].valid }])) }
const outputDirectory = new URL('../public/data/', import.meta.url)
await mkdir(outputDirectory, { recursive: true })
await writeFile(new URL('puzzles.json', outputDirectory), `${JSON.stringify({ source: report.source, puzzles: chosen }, null, 2)}\n`)
await writeFile(new URL('puzzle-import-report.json', outputDirectory), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
if (chosen.length !== 400 || Object.values(counts).some((count) => count !== 50)) process.exitCode = 2
