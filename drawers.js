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

const drawBoard = ({
  shouldPrescrollH = false,
  shouldPrescrollW = false,
  mustScrollH = undefined, // TODO
  mustScrollW = undefined, // TODO
}) => {
  // console.log("globalThis.sceneZero", globalThis.sceneZero);
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
    // console.log(
    //   `shouldPrescrollW: ${shouldPrescrollW} | mustScrollW: ${mustScrollW} `
    // );
    const scrollW = mustScrollW
      ? mustScrollW
      : globalThis.sceneZero.w > 0 || shouldPrescrollW
      ? (globalThis.cellSizes.w * (globalThis.scene - globalThis.frame.w)) / 2
      : 0;
    const scrollH = mustScrollH
      ? mustScrollH
      : globalThis.sceneZero.h > 0 || shouldPrescrollH
      ? (globalThis.cellSizes.h * (globalThis.scene - globalThis.frame.h)) / 2
      : 0;
    boardWrapper.scrollTo(scrollW, scrollH);
  }, 0);
};

const addScrollListener = () => {
  // const tempSceneZeroH =
  //   globalThis.sceneZero.h -
  //   globalThis.frame.h -
  //   Math.floor(globalThis.frame.h + globalThis.frame.h / 2);
  const boardWrapper = document.getElementById("boardWrapper");

  boardWrapper.addEventListener("wheel", (params) => {
    const tempH = Math.ceil(boardWrapper.scrollTop / globalThis.cellSizes.h);
    const mustScrollW = boardWrapper.scrollLeft;
    let shouldPrescrollH = false;
    let shouldDraw = false;

    if (
      globalThis.lastScrollTop !== boardWrapper.scrollTop &&
      Math.ceil(
        Math.abs(globalThis.lastScrollTop - boardWrapper.scrollTop) /
          globalThis.cellSizes.h
      ) <= 38
    ) {
      // console.log("HNE", globalThis.lastScrollTop, boardWrapper.scrollTop);
      if (
        tempH != globalThis.cellSizes.h &&
        tempH == 0 &&
        globalThis.sceneZero.h != 0
      ) {
        const tempSceneZeroH =
          globalThis.sceneZero.h -
          Math.floor(globalThis.frame.h + globalThis.frame.h / 2);

        globalThis.sceneZero.h = tempSceneZeroH > 0 ? tempSceneZeroH : 0;
        shouldPrescrollH = false;
        shouldDraw = true;
      } else if (
        tempH !== globalThis.cellSizes.h &&
        tempH >= globalThis.scene - globalThis.frame.h - 1
      ) {
        globalThis.sceneZero.h =
          globalThis.sceneZero.h +
          tempH -
          Math.floor(globalThis.frame.h + globalThis.frame.h / 2);
        shouldPrescrollH = true;
        shouldDraw = true;
      }
      if (shouldDraw) {
        console.log("[H] globalThis.sceneZero", globalThis.sceneZero);
        drawBoard({
          shouldPrescrollH,
          mustScrollW: mustScrollW,
        });
      }
      globalThis.lastScrollTop = boardWrapper.scrollTop;
    }
  });

  boardWrapper.addEventListener("wheel", (params) => {
    const tempW = Math.ceil(boardWrapper.scrollLeft / globalThis.cellSizes.w);
    const mustScrollH = boardWrapper.scrollTop;
    let shouldPrescrollW = false;
    let shouldDraw = false;
    console.log(
      "abs",
      Math.ceil(
        Math.abs(globalThis.lastScrollLeft - boardWrapper.scrollLeft) /
          globalThis.cellSizes.w
      )
    );
    if (
      globalThis.lastScrollLeft !== boardWrapper.scrollLeft &&
      Math.ceil(
        Math.abs(globalThis.lastScrollLeft - boardWrapper.scrollLeft) /
          globalThis.cellSizes.w
      ) <= 38
    ) {
      console.log("WNE", globalThis.lastScrollLeft, boardWrapper.scrollLeft);
      if (
        tempW != globalThis.cellSizes.w &&
        tempW == 0 &&
        globalThis.sceneZero.w != 0
      ) {
        const tempSceneZeroW =
          globalThis.sceneZero.w -
          tempW -
          Math.floor(globalThis.frame.w + globalThis.frame.w / 2);

        globalThis.sceneZero.w = tempSceneZeroW > 0 ? tempSceneZeroW : 0;
        shouldPrescrollW = false;
        shouldDraw = true;
      } else if (
        tempW !== globalThis.cellSizes.w &&
        tempW >= globalThis.scene - globalThis.frame.w - 1
      ) {
        const tempSceneZeroW =
          globalThis.sceneZero.w +
          tempW -
          Math.floor(globalThis.frame.w + globalThis.frame.w / 2);

        globalThis.sceneZero.w = tempSceneZeroW;
        shouldPrescrollW = true;
        shouldDraw = true;
      }
      if (shouldDraw) {
        console.log("[W] globalThis.sceneZero", globalThis.sceneZero);

        drawBoard({
          shouldPrescrollW,
          mustScrollH: mustScrollH,
        });
      }
      globalThis.lastScrollLeft = boardWrapper.scrollLeft;
    }
  });

  // boardWrapper.addEventListener("wheel", (event) => {
  //   console.log("EVENT");
  // });
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
