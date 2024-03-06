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
  const alivePointsAmount = getRandomInRange({ from: 1000, to: 1001 });
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
