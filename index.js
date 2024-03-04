window.onload = () => {
  // alert("loaded");
  globalThis.boardHeight = 10;
  globalThis.boardWidth = 10;
  globalThis.edem = ["0,1", "1,1", "2,2", "0,0", "1,0"];
  // globalThis.edem = ["0,1"];
  globalThis.population = {};
  globalThis.newPopulation = {};
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
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const population = globalThis.population;
  const newPopulation = globalThis.newPopulation;

  let flag = true;
  while (flag) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const id = `${i},${j}`;
        const neighbours = [];
        const cell = population[id];
        const hNeighbours = [];
        const wNeighbours = [];
        const preI = i > 0 ? i - 1 : width - 1;
        const postI = i < width - 1 ? i + 1 : 0;
        const preJ = j > 0 ? j - 1 : height - 1;
        const postJ = j < height - 1 ? j + 1 : 0;
        hNeighbours.push(preI);
        hNeighbours.push(i);
        hNeighbours.push(postI);
        wNeighbours.push(preJ);
        wNeighbours.push(j);
        wNeighbours.push(postJ);
        console.log(`id=${id}`, hNeighbours, wNeighbours);
        let liveCount = 0;
        for (let ii = 0; ii < hNeighbours.length; ii++) {
          for (let jj = 0; jj < wNeighbours.length; jj++) {
            if (cell.id !== `${hNeighbours[ii]},${wNeighbours[jj]}`) {
              if (population[`${hNeighbours[ii]},${wNeighbours[jj]}`].state) {
                liveCount++;
              }
            }
          }
        }
        newPopulation[cell.id] = {
          ...cell,
          state: liveCount === 2,
        };
      }
    }

    globalThis.population = newPopulation;
    globalThis.newPopulation = {};
    drawBoard();
    flag = false;
  }
};
