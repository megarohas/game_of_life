const updateField = (field, value) => {
  globalThis[field] = value;
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
  // console.log("alivePointsAmount", alivePointsAmount);
  const customEdem = [];
  for (let i = 0; i < alivePointsAmount; i++) {
    const h = getRandomInRange({ from: 0, to: 100 });
    const w = getRandomInRange({ from: 0, to: 100 });
    // console.log(h, w);
    customEdem.push(`${h},${w}`);
  }
  return customEdem.filter(onlyUnique);
};

const getIteratePrediction = (alivesLen) => {
  const startTime = performance.now();
  console.log("startTime", startTime);
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 10; j++) {
      getNeighbours(`${i},${j}`);
    }
  }
  const endTime = performance.now();
  console.log("endTime", endTime);
  const clusterTime = endTime - startTime;
  console.log("clusterTime", clusterTime);
  const predictTime = (clusterTime / 100) * alivesLen * 6;
  globalThis.predictTime = predictTime;
  console.log("predictTime", predictTime);
};
