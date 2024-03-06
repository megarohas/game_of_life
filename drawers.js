const paintCell = ({ cellHtmlElement, cellParams }) => {
  if (cellHtmlElement) {
    cellHtmlElement.setAttribute("class", "cell");
    cellHtmlElement.style.setProperty(
      "background-color",
      // cellParams.state ? "green" : cellParams.isForecasted ? "grey" : "grey"
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
    // cellHtmlElement.style.setProperty("font-size", `5px`);
    // cellHtmlElement.style.setProperty("display", `flex`);
    // cellHtmlElement.style.setProperty("align-items", `center`);
    // cellHtmlElement.style.setProperty("overflow", `hidden`);
    //
    // cellHtmlElement.style.setProperty("outline", `0.5px solid black`);
    //
    // cellHtmlElement.style.setProperty("outline-offset", `-0.5px`);
    //
    // cellHtmlElement.style.setProperty("justify-content", `center`);

    cellHtmlElement.style.setProperty("width", `${globalThis.cellSizes.w}px`);

    cellHtmlElement.style.setProperty("height", `${globalThis.cellSizes.h}px`);
  }
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
          cellHtmlElement.onclick = () => {
            // console.log(cellParams.id);
            changeCellState(cellParams.id);
          };
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
  const toDraw =
    globalThis.alivesHistory.length > 1
      ? [
          ...globalThis.lastForecast,
          ...alives,
          ...globalThis.alivesHistory[
            globalThis.alivesHistory.length - 2
          ].split(";"),
        ]
          .filter(onlyUnique)
          .sort()
      : [...globalThis.lastForecast, ...alives].filter(onlyUnique).sort();

  // console.log("toDraw", toDraw);
  for (let p = 0; p < toDraw.length; p++) {
    const i = parseInt(toDraw[p].split(",")[0]);
    const j = parseInt(toDraw[p].split(",")[1]);
    const cellHtmlElement = document.getElementById(`${i},${j}`);
    const cellParams = population[`${i},${j}`];
    paintCell({ cellHtmlElement, cellParams });
  }
};
