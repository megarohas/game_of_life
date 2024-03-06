const init = () => {
  globalThis.moveStep = 10;
  globalThis.cellSizes = { h: 5, w: 5 };
  globalThis.boardHeight = 500;
  globalThis.boardWidth = 500;
  globalThis.edem = [
    "50,49",
    "50,50",
    "49,50",
    "49,51",
    "49,52",
    "50,52",
    "50,53",
  ];
  // globalThis.edem = ["1,15", "2,15", "3,15", "3,4", "4,5", "5,5", "5,4", "5,3"];
  // globalThis.edem = ["3,4", "4,5", "5,5", "5,4", "5,3"]; //cool
  globalThis.alivesHistory = [];
  globalThis.population = {};
  document.getElementById("boardHeight").value = globalThis.boardHeight;
  document.getElementById("boardWidth").value = globalThis.boardWidth;
  document.getElementById("cellHeight").value = globalThis.cellSizes.h;
  document.getElementById("cellWidth").value = globalThis.cellSizes.w;
  globalThis.alivesHistory.push(globalThis.edem.sort().join(";"));
  globalThis.lastForecast = [];

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

const getNeighbours = (cellCoordinates) => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const i = parseInt(cellCoordinates.split(",")[0]);
  const j = parseInt(cellCoordinates.split(",")[1]);
  const cell = population[cellCoordinates];
  const preI = i > 0 ? i - 1 : height - 1;
  const postI = i < height - 1 ? i + 1 : 0;
  const preJ = j > 0 ? j - 1 : width - 1;
  const postJ = j < width - 1 ? j + 1 : 0;
  const hNeighbours = [preI, i, postI];
  const wNeighbours = [preJ, j, postJ];

  if (cell) {
    const neighbours = [];
    for (let ii = 0; ii < hNeighbours.length; ii++) {
      for (let jj = 0; jj < wNeighbours.length; jj++) {
        if (cell.id !== `${hNeighbours[ii]},${wNeighbours[jj]}`) {
          neighbours.push(`${hNeighbours[ii]},${wNeighbours[jj]}`);
        }
      }
    }
    const result = neighbours.filter(onlyUnique);
    return result;
  } else {
    return [];
  }
};

const generateBoard = () => {
  stop();
  init();
  globalThis.population = {};

  console.time("generateBoard");

  for (let i = 0; i < globalThis.boardHeight; i++) {
    setTimeout(() => {
      for (let j = 0; j < globalThis.boardWidth; j++) {
        const id = `${i},${j}`;
        globalThis.population[id] = {
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
    for (const cell of globalThis.alivesHistory[
      globalThis.alivesHistory.length - 1
    ].split(";")) {
      const id = cell;
      const i = cell.split(",")[0];
      const j = cell.split(",")[1];
      globalThis.population[id] = {
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
  // console.log(`move: ${direction}`);
  const moveStep = globalThis.moveStep;
  if (direction === "down") {
    const newZeroH = globalThis.frameZero.h + moveStep;
    if (newZeroH <= globalThis.boardHeight) {
      globalThis.frameZero.h = newZeroH;
      drawBoard({});
    }
  }
  if (direction === "up") {
    const newZeroH = globalThis.frameZero.h - moveStep;
    if (newZeroH >= 0) {
      globalThis.frameZero.h = newZeroH;
      drawBoard({});
    }
  }
  if (direction === "right") {
    const newZeroW = globalThis.frameZero.w + moveStep;
    if (newZeroW <= globalThis.boardWidth) {
      globalThis.frameZero.w = newZeroW;
      drawBoard({});
    }
  }
  if (direction === "left") {
    const newZeroW = globalThis.frameZero.w - moveStep;
    if (newZeroW >= 0) {
      globalThis.frameZero.w = newZeroW;
      drawBoard({});
    }
  }
};

const iterate = () => {
  const tempAlives = [];
  const newPopulation = {};
  // console.log("");
  // console.time("1");
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");
  // console.log("alives", alives);
  // console.timeEnd("1");
  // console.time("2");
  let toCheck = alives
    .map((cellCoordinates) => {
      return [...getNeighbours(cellCoordinates), cellCoordinates];
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);
  // console.log("toCheck", toCheck);
  // console.timeEnd("2");
  // console.time("3");
  for (let p = 0; p < toCheck.length; p++) {
    const cell = globalThis.population[toCheck[p]];
    const neighbours = getNeighbours(cell.id);
    let liveCount = 0;
    for (let k = 0; k < neighbours.length; k++) {
      if (globalThis.population[neighbours[k]].state) {
        liveCount++;
      }
    }

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
  // console.timeEnd("3");
  // console.time("4");
  for (const newCellId in newPopulation) {
    globalThis.population[newCellId].state = newPopulation[newCellId].state;
  }
  // console.timeEnd("4");
  // console.time("5");
  if (
    globalThis.alivesHistory.filter(
      (state) =>
        state === globalThis.alivesHistory[globalThis.alivesHistory.length - 1]
    ).length > 1
  ) {
    stop();
    console.log("game is over, ng is period");
    // console.log("newAlives", newAlives.split(";"));
    // alert("game is over, ng is period");
    return;
  }
  // console.timeEnd("5");
  if (tempAlives.length === 0) {
    stop();
    console.log("game is over, ng is empty");
    // alert("game is over, ng is empty");
    return;
  }

  globalThis.alivesHistory.push(newAlives);
};

const iterateForecast = () => {
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");

  // console.log("alives", alives);
  let toCheck = alives
    .map((cellCoordinates) => {
      return getNeighbours(cellCoordinates);
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);

  // console.log("toCheck", toCheck);
  for (let p = 0; p < toCheck.length; p++) {
    if (!alives.includes(toCheck[p])) {
      globalThis.population[toCheck[p]].isForecasted = true;
    }
  }
  globalThis.lastForecast = [...toCheck];
};

const changeCellState = (id) => {
  // console.log(`id: ${id}`);
  globalThis.population[id] = {
    ...globalThis.population[id],
    state: !globalThis.population[id].state,
    isForecasted: false,
  };

  if (globalThis.alivesHistory.length > 0) {
    // globalThis.alivesHistory last of
    let lastAlives = globalThis.alivesHistory[
      globalThis.alivesHistory.length - 1
    ].split(";");
    if (lastAlives.includes(id)) {
      lastAlives = lastAlives.filter((alive) => alive !== id);
    } else {
      lastAlives.push(id);
    }
    globalThis.alivesHistory[
      globalThis.alivesHistory.length - 1
    ] = lastAlives.sort().join(";");
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
