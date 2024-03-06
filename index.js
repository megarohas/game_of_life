window.onload = () => {
  // init();
  generateDefaultBoard();
  iterateForecast();

  const timer = document.getElementById("timer");
  setInterval(() => {
    if (globalThis.predictTime > 0) {
      globalThis.predictTime = globalThis.predictTime - 1;
    }

    timer.innerHTML = globalThis.predictTime;
  }, 0);
};

const start = () => {
  globalThis.procIterate = setInterval(() => {
    setTimeout(() => {
      iterate();
      iterateForecast();
    }, 0);
    setTimeout(() => {
      redrawBoard();
    }, 0);
  }, 0);

  // iterate();
  // iterateForecast();
  // redrawBoard();
};

const stop = () => {
  clearInterval(globalThis.procIterate);
  // clearInterval(globalThis.procRedraw);
};
