const init = ({ cellSizes, boardSizes, customEdem = undefined }) => {
  globalThis.predictTime = 0;
  globalThis.moveStep = 10;
  globalThis.cellSizes = cellSizes || { h: 5, w: 5 };
  globalThis.boardSizes = boardSizes || { h: 1000, w: 1000 };
  globalThis.edem = customEdem
    ? customEdem
    : ["50,49", "50,50", "49,50", "49,51", "49,52", "50,52", "50,53"];
  // globalThis.edem = ["1,15", "2,15", "3,15", "3,4", "4,5", "5,5", "5,4", "5,3"];
  // globalThis.edem = ["3,4", "4,5", "5,5", "5,4", "5,3"]; //cool
  globalThis.alivesHistory = [];
  globalThis.population = {};
  globalThis.alivesHistory.push(globalThis.edem.sort().join(";"));
  globalThis.lastForecast = [];

  document.getElementById("boardHeight").value = globalThis.boardSizes.h;
  document.getElementById("boardWidth").value = globalThis.boardSizes.w;
  document.getElementById("cellHeight").value = globalThis.cellSizes.h;
  document.getElementById("cellWidth").value = globalThis.cellSizes.w;

  const boardWrapper = document.getElementById("boardWrapper");
  const wrapperWidth = parseInt(boardWrapper.style.width);
  const wrapperHeight = parseInt(boardWrapper.style.height);
  globalThis.frame = {
    h: wrapperHeight / globalThis.cellSizes.h,
    w: wrapperWidth / globalThis.cellSizes.w,
  };
  globalThis.frameZero = {
    h: 0,
    w: 0,
  };
};

const generateDefaultBoard = () => {
  const cellSizes = globalThis.cellSizes;
  const boardSizes = globalThis.boardSizes;

  stop();
  init({
    cellSizes,
    boardSizes,
  });
  generateBoard();
};

const generateRandomBoard = () => {
  const cellSizes = globalThis.cellSizes;
  const boardSizes = globalThis.boardSizes;
  const customEdem = generateRandomCoordinates({
    from: globalThis.frameZero.h,
    to: globalThis.frame.w,
  });

  stop();
  init({
    cellSizes,
    boardSizes,
    customEdem,
  });
  generateBoard();
};

const generateBoard = () => {
  console.time("generateBoard");
  globalThis.population = {};
  const population = globalThis.population;
  const boardSizes = globalThis.boardSizes;
  const alivesHistory = globalThis.alivesHistory;

  for (let i = 0; i < boardSizes.h; i++) {
    // setTimeout is used to not to block the main page untill the board is generated
    setTimeout(() => {
      for (let j = 0; j < boardSizes.w; j++) {
        const id = `${i},${j}`;
        population[id] = {
          i,
          j,
          id,
          text: `(${id})`,
          state: false,
          isForecasted: false,
        };
      }
    }, 0);
  }

  setTimeout(() => {
    // to not use .includes for every cell (to check state) going throuh the active ones separately
    for (const cell of alivesHistory[alivesHistory.length - 1].split(";")) {
      const id = cell;
      const i = cell.split(",")[0];
      const j = cell.split(",")[1];
      population[id] = {
        i,
        j,
        id,
        text: `(${id})`,
        state: true,
        isForecasted: false,
      };
    }
  }, 0);

  setTimeout(() => {
    console.timeEnd("generateBoard");
    drawBoard({});
  }, 0);

  setTimeout(() => {
    iterateForecast();
  }, 0);
};

const move = (direction) => {
  const moveStep = globalThis.moveStep;
  const frameZero = globalThis.frameZero;
  const boardSizes = globalThis.boardSizes;

  if (direction === "down") {
    const newZeroH = frameZero.h + moveStep;
    if (newZeroH <= boardSizes.h) {
      frameZero.h = newZeroH;
    }
  }
  if (direction === "up") {
    const newZeroH = frameZero.h - moveStep;
    if (newZeroH >= 0) {
      frameZero.h = newZeroH;
    }
  }
  if (direction === "right") {
    const newZeroW = frameZero.w + moveStep;
    if (newZeroW <= boardSizes.w) {
      frameZero.w = newZeroW;
    }
  }
  if (direction === "left") {
    const newZeroW = frameZero.w - moveStep;
    if (newZeroW >= 0) {
      frameZero.w = newZeroW;
    }
  }

  drawBoard({});
};

const iterate = () => {
  const tempAlives = [];
  const newPopulation = {};
  const alivesHistory = globalThis.alivesHistory;
  const alives = alivesHistory[alivesHistory.length - 1].split(";");
  const population = globalThis.population;

  // predictIteration is used to count this iteration prediction and update the html timer
  predictIteration(alives.length);

  // getting all neighbours of all active cells
  let toCheck = alives
    .map((cellCoordinates) => {
      return [...getNeighbours(cellCoordinates), cellCoordinates];
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);

  for (let p = 0; p < toCheck.length; p++) {
    // check every neighbour neighbours
    const cell = population[toCheck[p]];
    const neighbours = getNeighbours(cell.id);
    let liveCount = 0;

    for (let k = 0; k < neighbours.length; k++) {
      if (population[neighbours[k]].state) {
        liveCount++;
      }
    }

    // making live/death decision
    if (cell.state) {
      const state = liveCount === 2 || liveCount === 3;
      if (state) {
        tempAlives.push(cell.id);
      }
      newPopulation[cell.id] = {
        ...cell,
        state,
      };
    } else {
      const state = liveCount === 3;
      if (state) {
        tempAlives.push(cell.id);
      }
      newPopulation[cell.id] = {
        ...cell,
        state,
      };
    }
  }

  const newAlives = tempAlives.sort().join(";");

  // updating only checking cells
  for (const newCellId in newPopulation) {
    population[newCellId].state = newPopulation[newCellId].state;
  }

  if (
    alivesHistory.filter(
      (state) => state === alivesHistory[alivesHistory.length - 1]
    ).length > 1
  ) {
    stop();
    console.log("game is over, ng is period");
    // alert("game is over, ng is period");
    return;
  }
  if (tempAlives.length === 0) {
    stop();
    console.log("game is over, ng is empty");
    // alert("game is over, ng is empty");
    return;
  }

  alivesHistory.push(newAlives);
};

const iterateForecast = () => {
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");
  const population = globalThis.population;

  // getting all neighbours of all active cells
  let toCheck = alives
    .map((cellCoordinates) => {
      return getNeighbours(cellCoordinates);
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);

  for (let p = 0; p < toCheck.length; p++) {
    if (!alives.includes(toCheck[p])) {
      population[toCheck[p]].isForecasted = true;
    }
  }

  globalThis.lastForecast = [...toCheck];
};

const changeCellState = (id) => {
  const population = globalThis.population;
  const alivesHistory = globalThis.alivesHistory;

  population[id] = {
    ...population[id],
    state: !population[id].state,
    isForecasted: false,
  };

  if (alivesHistory.length > 0) {
    let lastAlives = alivesHistory[alivesHistory.length - 1].split(";");

    if (lastAlives.includes(id)) {
      lastAlives = lastAlives.filter((alive) => alive !== id);
    } else {
      lastAlives.push(id);
    }
    alivesHistory[alivesHistory.length - 1] = lastAlives.sort().join(";");
  }

  const cellHtmlElement = document.getElementById(id);
  const cellParams = population[id];
  paintCell({ cellHtmlElement, cellParams });

  setTimeout(() => {
    iterateForecast();
  }, 0);
  setTimeout(() => {
    redrawBoard();
  }, 0);
};
