window.onload = () => {
  globalThis.boardHeight = 20;
  globalThis.boardWidth = 20;
  // globalThis.edem = ["0,1", "1,1", "2,2", "0,0", "1,0"];
  globalThis.edem = ["3,4", "4,5", "5,5", "5,4", "5,3"];
  globalThis.edemHistory = [];
  // globalThis.edem = ["0,1"];
  globalThis.population = {};
  globalThis.newPopulation = {};
  document.getElementById("boardHeight").value = globalThis.boardHeight;
  document.getElementById("boardWidth").value = globalThis.boardWidth;
  globalThis.edemHistory.push(globalThis.edem.sort().join(";"));
  generateBoard();
};

const updateField = (field, value) => {
  globalThis[field] = value;
};

const drawBoard = () => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const population = globalThis.population;
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.setProperty("grid-template-rows", `repeat(${height}, 1fr)`);
  board.style.setProperty("grid-template-columns", `repeat(${width}, 1fr)`);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const cell = board.appendChild(document.createElement("div"));
      const cellObj = population[`${i},${j}`];
      cell.id = cellObj.id;
      cell.textContent = cellObj.text;
      cell.style.setProperty(
        "background-color",
        cellObj.state ? "green" : "grey"
      );
    }
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
        text: `cell(${id})`,
        state: edem.includes(`${i},${j}`),
      };
      globalThis.population[id] = cellObj;
    }
  }
  drawBoard();
};

const start = () => {
  // globalThis.proc = setInterval(iterate, 0);
  iterate();
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
  return neighbours;
};

const iterate = () => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const tempEdem = [];
  const population = globalThis.population;
  const newPopulation = globalThis.newPopulation;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
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
  drawBoard();
};
