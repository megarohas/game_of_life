const paintCell = ({ cellHtmlElement, cellParams }) => {
  const cellSizes = globalThis.cellSizes;

  if (cellHtmlElement) {
    cellHtmlElement.setAttribute("class", "cell");
    cellHtmlElement.style.setProperty("width", `${cellSizes.w}px`);
    cellHtmlElement.style.setProperty("height", `${cellSizes.h}px`);
    cellHtmlElement.style.setProperty(
      "background-color",
      // use code below to turn off forecast showing
      // cellParams.state ? "#9d8d8f" : cellParams.isForecasted ? "#5a5560" : "#5a5560"
      cellParams.state
        ? "#9d8d8f"
        : cellParams.isForecasted
        ? "#46344e"
        : "#5a5560"
    );
    cellHtmlElement.setAttribute(
      "title",
      `(${cellParams.id}) Click to change state`
    );
  }
};

const drawBoard = ({ shouldPrescrollH = false, shouldPrescrollW = false }) => {
  // only part (frame) of cells are drawen because of preformace and usability issues
  const zeroH = globalThis.frameZero.h;
  const zeroW = globalThis.frameZero.w;
  const height = globalThis.frameZero.h + globalThis.frame.h;
  const width = globalThis.frameZero.w + globalThis.frame.w;
  const frameH = globalThis.frame.h;
  const frameW = globalThis.frame.w;

  const population = globalThis.population;

  const board = document.getElementById("board");
  //clear the board
  board.innerHTML = "";
  //change styles based on frame sizes
  board.style.setProperty("grid-template-rows", `repeat(${frameH}, 1fr)`);
  board.style.setProperty("grid-template-columns", `repeat(${frameW}, 1fr)`);

  for (let i = zeroH; i < height; i++) {
    setTimeout(() => {
      for (let j = zeroW; j < width; j++) {
        const cellHtmlElement = board.appendChild(
          document.createElement("div")
        );
        const cellParams = population[`${i},${j}`];
        if (cellHtmlElement && cellParams) {
          cellHtmlElement.onclick = () => {
            changeCellState(cellParams.id);
          };
          cellHtmlElement.id = cellParams.id;
          paintCell({ cellHtmlElement, cellParams });
        }
      }
    }, 0);
  }
  // setTimeout(() => {
  //   iterateForecast();
  // }, 0);
};

const redrawBoard = () => {
  const population = globalThis.population;
  const currentAlives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");
  const previousAlives =
    globalThis.alivesHistory.length > 1
      ? globalThis.alivesHistory[globalThis.alivesHistory.length - 2].split(";")
      : undefined;
  const lastForecast = globalThis.lastForecast;

  //finding the all cells that should be checked, there is no necessary to redraw all
  let toDraw = previousAlives
    ? [...lastForecast, ...currentAlives, ...previousAlives]
    : [...lastForecast, ...currentAlives];
  toDraw = toDraw.filter(onlyUnique).sort();

  for (let p = 0; p < toDraw.length; p++) {
    const i = parseInt(toDraw[p].split(",")[0]);
    const j = parseInt(toDraw[p].split(",")[1]);
    const cellHtmlElement = document.getElementById(`${i},${j}`);
    const cellParams = population[`${i},${j}`];
    paintCell({ cellHtmlElement, cellParams });
  }
};
