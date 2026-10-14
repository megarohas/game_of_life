# Game of Life

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
in plain JavaScript, HTML and CSS — no frameworks, no build step.

**[Live demo](https://megarohas.github.io/game_of_life/)** · [Video demo (YouTube)](https://youtu.be/hnVd1vis9KM)

## How to play

- **Start / Stop** runs or pauses the simulation.
- **Click a cell** to toggle it between alive and dead (works while running too).
- **↑ ↓ ← →** move the visible window around the board, 10 cells per click.
- **Settings** — board height and width (in cells, default 1000 × 1000) and
  cell size (in px, default 5). New values apply when you generate a board:
  - *Generate default board* — a small starting pattern near the top-left corner;
  - *Generate random board* — about 1000 random live cells in the top-left
    100 × 100 area.

Live cells are light; darker purple cells are the "forecast" — dead neighbours
of live cells, the only places where something can be born next. The timer
above the board shows a rough estimate of how long the next generation will
take. The simulation stops by itself when everything dies or a state repeats.
The board wraps around at the edges.

## How it works

- The board can be large (a million cells by default), so only the visible
  frame (500 × 500 px) is rendered as a CSS grid of `div`s.
- Each generation checks only live cells and their neighbours instead of the
  whole board, and only cells that may have changed are repainted.
- Long loops are split with `setTimeout` so the page stays responsive while a
  board is being generated.

## Run locally

Open `index.html` in a browser. That's it.

```
index.html          markup: settings panel, board, controls
index.css           styles
scripts/methods.js  board setup, iteration, forecast, navigation
scripts/drawers.js  rendering of the visible frame
scripts/helpers.js  neighbours, random seeding, timing estimate
scripts/index.js    start / stop
```

## Ideas

- Draw the board on a canvas
- Mouse navigation
- A better time prediction algorithm
- UI improvements
- Further debugging and optimisation of the core algorithm

Built in March 2024.
