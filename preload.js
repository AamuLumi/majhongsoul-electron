const { webFrame, ipcRenderer } = require("electron");

window.addEventListener("load", () => {
  const clickArea = document.querySelector(".startGame > .clickArea");

  if (clickArea) {
    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    clickArea.dispatchEvent(evt);
  } else {
    ipcRenderer.send("game-loading");
  }
});
