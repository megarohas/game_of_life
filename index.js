window.onload = () => {
  // init();
  generateDefaultBoard();
  iterateForecast();
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
