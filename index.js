window.onload = () => {
  globalThis.boardHeight = 20;
  globalThis.boardWidth = 20;
  // globalThis.edem = ["4,4", "4,5", "5,5", "4,3", "6,3", "6,4", "5,6", "6,5"];
  globalThis.edem = ["1,15", "2,15", "3,15", "3,4", "4,5", "5,5", "5,4", "5,3"];
  // globalThis.edem = ["3,4", "4,5", "5,5", "5,4", "5,3"]; //cool
  globalThis.edemHistory = [];
  // globalThis.edem = ["0,1"];
  globalThis.population = {};
  globalThis.newPopulation = {};
  document.getElementById("boardHeight").value = globalThis.boardHeight;
  document.getElementById("boardWidth").value = globalThis.boardWidth;
  globalThis.edemHistory.push(globalThis.edem.sort().join(";"));
  globalThis.lastForecast = [];
  generateBoard();
};

const updateField = (field, value) => {
  globalThis[field] = value;
};

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

const drawBoard = () => {
  console.log("drawBoard");
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
        const cell = board.appendChild(document.createElement("div"));
        const cellObj = population[`${i},${j}`];
        cell.id = cellObj.id;
        cell.textContent = cellObj.text;

        cell.style.setProperty(
          "background-color",
          cellObj.state ? "green" : cellObj.isForecasted ? "grey" : "grey"
          // cellObj.state ? "green" : cellObj.isForecasted ? "blue" : "grey"
        );
      }
    }, 0);
  }
};

const redrawBoard = () => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const population = globalThis.population;
  const edem = globalThis.edemHistory[globalThis.edemHistory.length - 1].split(
    ";"
  );
  const toDraw = [...globalThis.lastForecast, ...edem];
  console.log("toDraw", toDraw);
  for (let p = 0; p < toDraw.length; p++) {
    const i = parseInt(toDraw[p].split(",")[0]);
    const j = parseInt(toDraw[p].split(",")[1]);
    const cell = document.getElementById(`${i},${j}`);
    console.log("cell", `${i},${j}`);
    const cellObj = population[`${i},${j}`];
    cell.style.setProperty(
      "background-color",
      cellObj.state ? "green" : cellObj.isForecasted ? "grey" : "grey"
      // cellObj.state ? "green" : cellObj.isForecasted ? "blue" : "grey"
    );
  }
};

const generateBoard = () => {
  globalThis.population = {};
  globalThis.newPopulation = {};
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const cell = board.appendChild(document.createElement("div"));
      const id = `${i},${j}`;
      const cellObj = {
        i,
        j,
        id,
        text: `(${id})`,
        state: edem.includes(`${i},${j}`),
      };
      globalThis.population[id] = cellObj;
    }
  }

  drawBoard();
  iterateForecast();
};

const start = () => {
  globalThis.proc = setInterval(() => {
    iterate();
    iterateForecast();
  }, 0);

  // iterate();
  // iterateForecast();
};

const stop = () => {
  clearInterval(globalThis.proc);
};

const log = (id, text, val) => {
  if (id === "4,5") {
    console.log(text, val);
  }
};

const getNeighbours = ({ i, j }) => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const id = `${i},${j}`;
  const cell = population[id];
  const hNeighbours = [];
  const wNeighbours = [];
  const preI = i > 0 ? i - 1 : height - 1;
  const postI = i < height - 1 ? i + 1 : 0;
  const preJ = j > 0 ? j - 1 : width - 1;
  const postJ = j < width - 1 ? j + 1 : 0;
  hNeighbours.push(preI);
  hNeighbours.push(i);
  hNeighbours.push(postI);
  wNeighbours.push(preJ);
  wNeighbours.push(j);
  wNeighbours.push(postJ);
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

const iterate = () => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const tempEdem = [];
  const population = globalThis.population;
  const newPopulation = { ...population };
  const edem = globalThis.edemHistory[globalThis.edemHistory.length - 1].split(
    ";"
  );

  let toCheck = edem
    .map((cell) => {
      const i = parseInt(cell.split(",")[0]);
      const j = parseInt(cell.split(",")[1]);
      return getNeighbours({ i, j });
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);

  for (let p = 0; p < toCheck.length; p++) {
    // console.log(`toCheck[${p}]`, toCheck[p]);
    const i = parseInt(toCheck[p].split(",")[0]);
    const j = parseInt(toCheck[p].split(",")[1]);
    const cell = population[`${i},${j}`];
    const neighbours = getNeighbours({ i, j });
    let liveCount = 0;
    for (let k = 0; k < neighbours.length; k++) {
      if (population[neighbours[k]].state) {
        liveCount++;
      }
    }

    if (cell.state) {
      const state = liveCount === 2 || liveCount === 3;
      if (state) {
        tempEdem.push(cell.id);
      }
      newPopulation[cell.id] = {
        ...cell,
        state,
      };
    } else {
      const state = liveCount === 3;
      if (state) {
        tempEdem.push(cell.id);
      }
      newPopulation[cell.id] = {
        ...cell,
        state,
      };
    }
  }

  const newEdem = tempEdem.sort().join(";");
  if (tempEdem.length === 0) {
    stop();
    alert("game is over, ng is empty");
  }
  if (globalThis.edemHistory.includes(newEdem)) {
    stop();
    alert("game is over, ng is period");
  }

  globalThis.edemHistory.push(newEdem);
  globalThis.population = newPopulation;
  globalThis.newPopulation = {};
  redrawBoard();
};

const iterateForecast = () => {
  // return;
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const population = globalThis.population;
  const newPopulation = { ...population };
  const edem = globalThis.edemHistory[globalThis.edemHistory.length - 1].split(
    ";"
  );

  let toCheck = edem
    .map((cell) => {
      const i = parseInt(cell.split(",")[0]);
      const j = parseInt(cell.split(",")[1]);
      return getNeighbours({ i, j });
    })
    .reduce((arr, e) => {
      return arr.concat(e);
    })
    .filter(onlyUnique);
  console.log("toCheck", toCheck);
  for (let p = 0; p < toCheck.length; p++) {
    if (!edem.includes(toCheck[p])) {
      newPopulation[toCheck[p]].isForecasted = true;
    }
  }
  globalThis.lastForecast = [...toCheck];
  globalThis.population = newPopulation;
  redrawBoard();
};
