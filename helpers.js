const updateBoardSizes = (dim, value) => {
  globalThis.boardSizes[dim] = value;
};

const updateCellSize = (dim, value) => {
  globalThis.cellSizes[dim] = value;
};

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

const log = (id, text, val) => {
  if (id === "4,5") {
    console.log(text, val);
  }
};

const getRandomInRange = ({ from, to }) => {
  return Math.ceil(Math.random() * (to - from) + from);
};

const generateRandomCoordinates = ({ from = 0, to = 100 }) => {
  // const alivePointsAmount = getRandomInRange({ from: 1000, to: 1001 });
  const alivePointsAmount = 1000;
  const customEdem = [];

  for (let i = 0; i < alivePointsAmount; i++) {
    const h = getRandomInRange({ from: 0, to: 100 });
    const w = getRandomInRange({ from: 0, to: 100 });
    customEdem.push(`${h},${w}`);
  }

  return customEdem.filter(onlyUnique);
};

const predictIteration = (alivesLen) => {
  const startTime = performance.now();

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 10; j++) {
      getNeighbours(`${i},${j}`);
    }
  }

  const endTime = performance.now();
  const clusterTime = endTime - startTime;
  const predictTime = (clusterTime / 100) * alivesLen * 6;

  globalThis.predictTime = predictTime;
};

const launchCounter = () => {
  const timer = document.getElementById("timer");
  setInterval(() => {
    if (globalThis.predictTime >= 1) {
      globalThis.predictTime = globalThis.predictTime - 1;
    }
    if (timer.value !== globalThis.predictTime) {
      timer.value = globalThis.predictTime;
      timer.innerHTML = `${Math.floor(globalThis.predictTime)} ms`;
    }
  }, 0);
};
