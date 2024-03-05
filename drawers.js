const paintCell = ({ cellHtmlElement, cellParams }) => {
  cellHtmlElement &&
    cellHtmlElement.style.setProperty(
      "background-color",
      // cellParams.state ? "green" : cellParams.isForecasted ? "grey" : "grey"
      cellParams.state ? "green" : cellParams.isForecasted ? "blue" : "grey"
    );
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("width", `${globalThis.cellSizes.w}px`);
  cellHtmlElement &&
    cellHtmlElement.style.setProperty("height", `${globalThis.cellSizes.h}px`);
};

const drawBoard = () => {
  const zeroH = globalThis.frameZero.h;
  const zeroW = globalThis.frameZero.w;
  const height = globalThis.frameZero.h + globalThis.frame;
  const width = globalThis.frameZero.w + globalThis.frame;
  const population = globalThis.population;
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.setProperty(
    "grid-template-rows",
    `repeat(${globalThis.frame}, 1fr)`
  );
  board.style.setProperty(
    "grid-template-columns",
    `repeat(${globalThis.frame}, 1fr)`
  );
  for (let i = zeroH; i < height; i++) {
    setTimeout(() => {
      for (let j = zeroW; j < width; j++) {
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
  setTimeout(() => {
    const boardWrapper = document.getElementById("boardWrapper");
    boardWrapper.scrollTo(
      globalThis.frameZero.w > 0 ? globalThis.cellSizes.w : 0,
      globalThis.frameZero.h > 0 ? globalThis.cellSizes.h : 0
    );
  }, 0);
};

const addScrollListener = () => {
  const boardWrapper = document.getElementById("boardWrapper");
  boardWrapper.addEventListener("scroll", (params) => {
    const tempH = Math.ceil(boardWrapper.scrollTop / globalThis.cellSizes.h);
    const tempW = Math.ceil(boardWrapper.scrollLeft / globalThis.cellSizes.w);
    console.log("tempH,tempW", tempH, tempW, globalThis.frameZero);

    if (
      tempW !== globalThis.cellSizes.w &&
      tempW === 0 &&
      globalThis.frameZero.w !== 0
    ) {
      console.log("loadMore W");
      globalThis.frameZero.w = globalThis.frameZero.w - 13;
      drawBoard();
    }
    if (tempW !== globalThis.cellSizes.w && tempW >= 13) {
      console.log("loadMore W");
      globalThis.frameZero.w = globalThis.frameZero.w + tempW;
      drawBoard();
    }

    if (
      tempH !== globalThis.cellSizes.h &&
      tempH === 0 &&
      globalThis.frameZero.h !== 0
    ) {
      console.log("loadMore H");
      globalThis.frameZero.h = globalThis.frameZero.h - 5;

      drawBoard();
    }
    if (tempH !== globalThis.cellSizes.h && tempH >= 5) {
      console.log("loadMore H");
      globalThis.frameZero.h = globalThis.frameZero.h + tempH;

      drawBoard();
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
