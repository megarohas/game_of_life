window.onload = () => {
  globalThis.boardHeight = 20;
  globalThis.boardWidth = 20;
  globalThis.edem = ["1,15", "2,15", "3,15", "3,4", "4,5", "5,5", "5,4", "5,3"];
  // globalThis.edem = ["3,4", "4,5", "5,5", "5,4", "5,3"]; //cool
  globalThis.alivesHistory = [];
  globalThis.population = {};
  document.getElementById("boardHeight").value = globalThis.boardHeight;
  document.getElementById("boardWidth").value = globalThis.boardWidth;
  globalThis.alivesHistory.push(globalThis.edem.sort().join(";"));
  globalThis.lastForecast = [];
  generateBoard();
  iterateForecast();
};

const start = () => {
  // globalThis.proc = setInterval(() => {
  //   iterate();
  //   iterateForecast();
  // }, 0);

  iterate();
  iterateForecast();
};

const stop = () => {
  clearInterval(globalThis.proc);
};
