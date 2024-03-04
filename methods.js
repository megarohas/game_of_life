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

  const neighbours = [];
  for (let ii = 0; ii < hNeighbours.length; ii++) {
    for (let jj = 0; jj < wNeighbours.length; jj++) {
      if (cell.id !== `${hNeighbours[ii]},${wNeighbours[jj]}`) {
        neighbours.push(`${hNeighbours[ii]},${wNeighbours[jj]}`);
      }
    }
  }

  return neighbours.filter(onlyUnique);
};

const generateBoard = () => {
  globalThis.population = {};

  for (let i = 0; i < globalThis.boardHeight; i++) {
    for (let j = 0; j < globalThis.boardWidth; j++) {
      const cell = board.appendChild(document.createElement("div"));
      const id = `${i},${j}`;
      const cellParams = {
        i,
        j,
        id,
        text: `(${id})`,
        state: globalThis.edem.includes(`${i},${j}`),
        isForecasted: false,
      };
      globalThis.population[id] = cellParams;
    }
  }
  drawBoard();
};

const iterate = () => {
  // const height = globalThis.boardHeight;
  // const width = globalThis.boardWidth;
  const tempAlives = [];
  const newPopulation = { ...globalThis.population };
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");

  let toCheck = alives
    .map((cellCoordinates) => {
      return getNeighbours(cellCoordinates);
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);

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
  if (tempAlives.length === 0) {
    stop();
    alert("game is over, ng is empty");
  }
  if (globalThis.alivesHistory.includes(newAlives)) {
    stop();
    alert("game is over, ng is period");
  }

  globalThis.alivesHistory.push(newAlives);
  globalThis.population = newPopulation;
  redrawBoard();
};

const iterateForecast = () => {
  // return;
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");

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
      globalThis.population[toCheck[p]].isForecasted = true;
    }
  }
  globalThis.lastForecast = [...toCheck];
  redrawBoard();
};
