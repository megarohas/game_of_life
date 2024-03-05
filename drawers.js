const paintCell = ({ cellHtmlElement, cellParams }) => {
  cellHtmlElement &&
    cellHtmlElement.style.setProperty(
      "background-color",
      // cellParams.state ? "green" : cellParams.isForecasted ? "grey" : "grey"
      cellParams.state ? "green" : cellParams.isForecasted ? "blue" : "grey"
    );
};

const drawBoard = () => {
  const height = globalThis.boardHeight;
  const width = globalThis.boardWidth;
  const population = globalThis.population;
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.setProperty("grid-template-rows", `repeat(${height}, 1fr)`);
  board.style.setProperty("grid-template-columns", `repeat(${width}, 1fr)`);

  // var options = {
  //   root: document.querySelector("#boardWrapper"),
  //   rootMargin: "0px",
  //   threshold: 1.0,
  // };
  // var callback = function (entries, observer) {
  /* Content excerpted, show below */
  // .target - this is div#21,0
  // console.log("CB", entries);
  // };
  // var observer = new IntersectionObserver(callback, options);

  for (let i = 0; i < height; i++) {
    setTimeout(() => {
      let j = 0;
      let tempMax = width > 50 ? 50 : width;
      // console.log("1");
      while (tempMax <= width) {
        // console.log("2", tempMax, width);
        while (j < tempMax) {
          // console.log("3", j, tempMax);

          const cellHtmlElement = board.appendChild(
            document.createElement("div")
          );
          const cellParams = population[`${i},${j}`];
          // var target = cellHtmlElement;
          // observer.observe(target);
          cellHtmlElement.id = cellParams.id;
          cellHtmlElement.textContent = cellParams.text;
          paintCell({ cellHtmlElement, cellParams });
          j++;
        }
        // tempMax = tempMax + 50 > width ? width : tempMax + 50;
        tempMax = tempMax + 50;
      }

      // for (let j = 0; j < width; j++) {
      //   const cellHtmlElement = board.appendChild(
      //     document.createElement("div")
      //   );
      //   const cellParams = population[`${i},${j}`];
      //   cellHtmlElement.id = cellParams.id;
      //   cellHtmlElement.textContent = cellParams.text;
      //   paintCell({ cellHtmlElement, cellParams });
      // }
    }, 0);
    // for (let j = 0; j < width; j++) {
    //   const cellHtmlElement = board.appendChild(document.createElement("div"));
    //   const cellParams = population[`${i},${j}`];
    //   cellHtmlElement.id = cellParams.id;
    //   cellHtmlElement.textContent = cellParams.text;
    //   paintCell({ cellHtmlElement, cellParams });
    // }
  }

  // alert('');
  // const board = document.getElementById("board");
  // const canvas = document.getElementById("canvas");
  // console.log("canvas", canvas);
  // const context = canvas.getContext("2d");
  // console.log("context", context);
  // console.log("board.height", board.height);
  // console.log("board.width", board.width);
  // context.drawImage(board, 0, 0, board.width, board.height);
  const boardWrapper = document.getElementById("boardWrapper");
  boardWrapper.addEventListener("scroll", (params) => {
    // console.log("scroll", boardWrapper.scrollTop, boardWrapper.scrollHeight);
    if (
      boardWrapper.scrollTop + boardWrapper.clientHeight >=
      boardWrapper.scrollHeight
    ) {
      // loadMore();
      console.log("loadMore H");
    }
    if (
      boardWrapper.scrollLeft + boardWrapper.clientWidth >=
      boardWrapper.scrollWidth
    ) {
      // loadMore();
      console.log("loadMore W");
    }
  });
};

const redrawBoard = () => {
  const population = globalThis.population;
  const alives = globalThis.alivesHistory[
    globalThis.alivesHistory.length - 1
  ].split(";");
  const toDraw = [...globalThis.lastForecast, ...alives];

  for (let p = 0; p < toDraw.length; p++) {
    const i = parseInt(toDraw[p].split(",")[0]);
    const j = parseInt(toDraw[p].split(",")[1]);
    const cellHtmlElement = document.getElementById(`${i},${j}`);
    const cellParams = population[`${i},${j}`];
    paintCell({ cellHtmlElement, cellParams });
  }
};
