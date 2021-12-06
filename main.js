const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const RENDERING_RATIO = 16 / 9;

const createWindow = () => {
  const win = new BrowserWindow({
    backgroundColor: "#000000",
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    title: "Majhong Soul",
  });

  win.setContentSize(1280, 1280 / RENDERING_RATIO);
  const windowSize = win.getSize();
  win.setAspectRatio(RENDERING_RATIO);

  ipcMain.on("game-loading", () => {
    win.show();
    win.setIcon(path.join(__dirname, "images", "icon.png"));
    win.setTitle("Mahjong Soul");
  });

  win.loadURL("https://mahjongsoul.yo-star.com");
  //win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
