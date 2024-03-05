window.onload = () => {
  globalThis.cellSizes = { h: 20, w: 50 };
  globalThis.frameZero = { h: 0, w: 0 };
  globalThis.frame = 30;
  globalThis.boardHeight = 200;
  globalThis.boardWidth = 200;
  globalThis.edem = ["1,15", "2,15", "3,15", "3,4", "4,5", "5,5", "5,4", "5,3"];
  // globalThis.edem = ["3,4", "4,5", "5,5", "5,4", "5,3"]; //cool
  globalThis.alivesHistory = [];
  globalThis.population = {};
  document.getElementById("boardHeight").value = globalThis.boardHeight;
  document.getElementById("boardWidth").value = globalThis.boardWidth;
  globalThis.alivesHistory.push(globalThis.edem.sort().join(";"));
  globalThis.lastForecast = [];
  generateBoard();
  // iterateForecast();
};

const start = () => {
  // globalThis.proc = setInterval(() => {
  //   iterate();
  //   iterateForecast();
  // }, 0);
  // globalThis.proc = setInterval(() => {
  //   redrawBoard();
  // }, 0);

  iterate();
  iterateForecast();
  redrawBoard();
};

const stop = () => {
  clearInterval(globalThis.proc);
};
