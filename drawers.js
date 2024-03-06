const paintCell = ({ cellHtmlElement, cellParams }) => {
  cellHtmlElement &&
    cellHtmlElement.style.setProperty(
      "background-color",
      // cellParams.state ? "green" : cellParams.isForecasted ? "grey" : "grey"
      cellParams.state ? "green" : cellParams.isForecasted ? "blue" : "grey"
    );
  cellHtmlElement && cellHtmlElement.style.setProperty("font-size", `5px`);
  cellHtmlElement && cellHtmlElement.style.setProperty("display", `flex`);
  cellHtmlElement && cellHtmlElement.style.setProperty("align-items", `center`);
  cellHtmlElement && cellHtmlElement.style.setProperty("overflow", `hidden`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("outline", `0.5px solid black`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("outline-offset", `-0.5px`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("justify-content", `center`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("width", `${globalThis.cellSizes.w}px`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("height", `${globalThis.cellSizes.h}px`);
};

const drawBoard = ({
  shouldPrescrollH = false,
  shouldPrescrollW = false,
  mustScrollH = undefined, // TODO
  mustScrollW = undefined, // TODO
}) => {
  const zeroH = globalThis.frameZero.h;
  const zeroW = globalThis.frameZero.w;

  const height = globalThis.frameZero.h + globalThis.frame.h;
  const width = globalThis.frameZero.w + globalThis.frame.w;

  const population = globalThis.population;
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.setProperty(
    "grid-template-rows",
    `repeat(${globalThis.frame.h}, 1fr)`
  );
  board.style.setProperty(
    "grid-template-columns",
    `repeat(${globalThis.frame.w}, 1fr)`
  );
  for (let i = zeroH; i < height; i++) {
    setTimeout(() => {
      for (let j = zeroW; j < width; j++) {
        const cellHtmlElement = board.appendChild(
          document.createElement("div")
        );
        const cellParams = population[`${i},${j}`];
        if (cellHtmlElement && cellParams) {
          cellHtmlElement.id = cellParams.id;
          // cellHtmlElement.textContent = cellParams.text;
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
