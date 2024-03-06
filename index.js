window.onload = () => {
  init();
  generateBoard();
  iterateForecast();
};

const start = () => {
  globalThis.procIterate = setInterval(() => {
    iterate();
    iterateForecast();
  }, 0);
  globalThis.procRedraw = setInterval(() => {
    redrawBoard();
  }, 0);

  // iterate();
  // iterateForecast();
  // redrawBoard();
};

const stop = () => {
  clearInterval(globalThis.procIterate);
  clearInterval(globalThis.procRedraw);
};
