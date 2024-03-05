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
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("justify-content", `center`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("width", `${globalThis.cellSizes.w}px`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("height", `${globalThis.cellSizes.h}px`);
};

const drawBoard = ({ shouldPrescrollH = false, shouldPrescrollW = false }) => {
  const zeroH = globalThis.sceneZero.h;
  const zeroW = globalThis.sceneZero.w;
  const height = globalThis.sceneZero.h + globalThis.scene;
  const width = globalThis.sceneZero.w + globalThis.scene;
  const population = globalThis.population;
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.setProperty(
    "grid-template-rows",
    `repeat(${globalThis.scene}, 1fr)`
  );
  board.style.setProperty(
    "grid-template-columns",
    `repeat(${globalThis.scene}, 1fr)`
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
          cellHtmlElement.textContent = cellParams.text;
          paintCell({ cellHtmlElement, cellParams });
        }
      }
    }, 0);
  }
  setTimeout(() => {
    const boardWrapper = document.getElementById("boardWrapper");
    boardWrapper.scrollTo(
      globalThis.sceneZero.w > 0 || shouldPrescrollW
        ? (globalThis.cellSizes.w * (globalThis.scene - globalThis.frame.w)) / 2
        : 0,
      globalThis.sceneZero.h > 0 || shouldPrescrollH
        ? (globalThis.cellSizes.h * (globalThis.scene - globalThis.frame.h)) / 2
        : 0
    );
  }, 0);
};

const addScrollListener = () => {
  const boardWrapper = document.getElementById("boardWrapper");
  boardWrapper.addEventListener("scroll", (params) => {
    const tempH = Math.ceil(boardWrapper.scrollTop / globalThis.cellSizes.h);
    const tempW = Math.ceil(boardWrapper.scrollLeft / globalThis.cellSizes.w);

    if (
      tempW !== globalThis.cellSizes.w &&
      tempW === 0 &&
      globalThis.sceneZero.w !== 0
    ) {
      const tempSceneZeroW =
        globalThis.sceneZero.w -
        globalThis.frame.w -
        Math.floor(globalThis.frame.w + globalThis.frame.w / 2);

      globalThis.sceneZero.w = tempSceneZeroW > 0 ? tempSceneZeroW : 0;

      drawBoard({ shouldPrescrollW: true });
    }

    if (
      tempW !== globalThis.cellSizes.w &&
      tempW >= globalThis.scene - globalThis.frame.w - 1
    ) {
      globalThis.sceneZero.w =
        globalThis.sceneZero.w +
        tempW -
        Math.floor(globalThis.frame.w + globalThis.frame.w / 2);
      drawBoard({ shouldPrescrollW: true });
    }

    if (
      tempH !== globalThis.cellSizes.h &&
      tempH === 0 &&
      globalThis.sceneZero.h !== 0
    ) {
      const tempSceneZeroH =
        globalThis.sceneZero.h -
        globalThis.frame.h -
        Math.floor(globalThis.frame.h + globalThis.frame.h / 2);

      globalThis.sceneZero.h = tempSceneZeroH > 0 ? tempSceneZeroH : 0;

      drawBoard({ shouldPrescrollH: true });
    }

    if (
      tempH !== globalThis.cellSizes.h &&
      tempH >= globalThis.scene - globalThis.frame.h - 1
    ) {
      globalThis.sceneZero.h =
        globalThis.sceneZero.h +
        tempH -
        Math.floor(globalThis.frame.h + globalThis.frame.h / 2);
      drawBoard({ shouldPrescrollH: true });
    }
  });
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
