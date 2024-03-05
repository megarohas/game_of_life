window.onload = () => {
  globalThis.tempZeroHeight = 0;
  globalThis.tempZeroWidth = 0;
  globalThis.tempHeight = 30;
  globalThis.tempWidth = 20;
  globalThis.boardHeight = 300;
  globalThis.boardWidth = 300;
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
  // console.time("1");
  globalThis.proc = setInterval(() => {
    iterate();
    iterateForecast();
  }, 0);
  globalThis.proc = setInterval(() => {
    redrawBoard();
  }, 0);

  // iterate();
  // iterateForecast();
};

const stop = () => {
  clearInterval(globalThis.proc);
};
