window.onload = () => {
  globalThis.lastSceneZeroW = -100;
  globalThis.lastScrollTop = 0;
  globalThis.lastScrollLeft = 0;
  // globalThis.cellSizes = { h: 20, w: 50 };
  globalThis.cellSizes = { h: 20, w: 20 };
  globalThis.sceneZero = { h: 0, w: 0 };
  globalThis.scene = 100;
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

  const boardWrapper = document.getElementById("boardWrapper");
  const wrapperWidth = parseInt(boardWrapper.style.width);
  const wrapperHeight = parseInt(boardWrapper.style.height);
  globalThis.frame = {
    h: wrapperHeight / globalThis.cellSizes.h,
    w: wrapperWidth / globalThis.cellSizes.w,
  };
  generateBoard();
  // iterateForecast();
};

const start = () => {
  globalThis.proc = setInterval(() => {
    iterate();
    iterateForecast();
  }, 0);
  globalThis.proc = setInterval(() => {
    redrawBoard();
  }, 0);
  //
  // iterate();
  // iterateForecast();
  // redrawBoard();
};

const stop = () => {
  clearInterval(globalThis.proc);
};
