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
