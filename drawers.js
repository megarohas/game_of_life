const paintCell = ({ cellHtmlElement, cellParams }) => {
  cellHtmlElement &&
    cellHtmlElement.style.setProperty(
      "background-color",
      // cellParams.state ? "green" : cellParams.isForecasted ? "grey" : "grey"
      cellParams.state ? "green" : cellParams.isForecasted ? "blue" : "grey"
    );
};

const drawBoard = () => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const population = globalThis.population;
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.setProperty("grid-template-rows", `repeat(${height}, 1fr)`);
  board.style.setProperty("grid-template-columns", `repeat(${width}, 1fr)`);

  for (let i = 0; i < height; i++) {
    setTimeout(() => {
      for (let j = 0; j < width; j++) {
        const cellHtmlElement = board.appendChild(
          document.createElement("div")
        );
        const cellParams = population[`${i},${j}`];
        cellHtmlElement.id = cellParams.id;
        cellHtmlElement.textContent = cellParams.text;
        paintCell({ cellHtmlElement, cellParams });
      }
    }, 0);
  }
};

const redrawBoard = () => {
  const population = globalThis.population;
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");
  const toDraw = [...globalThis.lastForecast, ...alives];

  for (let p = 0; p < toDraw.length; p++) {
    const i = parseInt(toDraw[p].split(",")[0]);
    const j = parseInt(toDraw[p].split(",")[1]);
    const cellHtmlElement = document.getElementById(`${i},${j}`);
    const cellParams = population[`${i},${j}`];
    paintCell({ cellHtmlElement, cellParams });
  }
};
