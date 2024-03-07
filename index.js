window.onload = () => {
  // init();
  generateDefaultBoard();
  iterateForecast();

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
