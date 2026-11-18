# Importación de puzzles de Lichess

El importador lee un CSV oficial de Lichess por `stdin`, valida FEN y todos los movimientos con `chess.js`, conserva los metadatos y escribe únicamente los registros elegidos en `public/data/puzzles.json`. El informe detallado se escribe en `public/data/puzzle-import-report.json`.

Descarga el archivo de la [Lichess Open Database](https://database.lichess.org/) por separado y descomprímelo hacia el proceso, sin guardarlo en el repositorio. Para un `.zst`, desde la carpeta `frontend`:

```sh
zstd -dc ruta/al/lichess_db_puzzle.csv.zst | npm run import:puzzles
```

También se puede enviar un CSV ya descomprimido con `Get-Content -Raw`/`cat` o redirección de entrada. El proceso es repetible. Los filtros se pueden ajustar con `MIN_POPULARITY`, `MIN_PLAYS` y `MAX_RATING_DEVIATION`; los valores por defecto son 70, 100 y 100. Si la selección no llega a 50 puzzles por grupo, el comando devuelve código 2 y deja el informe con cantidades por grupo. No completa el archivo con problemas ficticios.

Los rangos que se solapan se asignan determinísticamente al grupo elegible con menor número de registros observados; los empates se resuelven por el identificador de grupo. El importador mantiene hasta 1.200 candidatos de mayor popularidad y partidas por grupo para limitar memoria, y elimina PuzzleId repetidos.

La primera jugada UCI de `Moves` se aplica al FEN antes de mostrar el tablero. El visitante empieza con la segunda jugada; las respuestas siguientes se reproducen automáticamente. La UI utiliza la secuencia completa para validar las respuestas.

## Estado de los datos en este checkout

No se incluye el CSV de Lichess ni `public/data/puzzles.json`. Por tanto, no se ha generado ni validado aquí una colección de 400 problemas. Ejecuta el comando con una copia del dataset oficial para crear el informe real.
