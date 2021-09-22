const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 550,
        height: 500,
        minWidth: 550,
        minHeight: 500,
        frame: false,
        title: "뽑기기계",
        webPreferences: {
            preload: path.join(__dirname, "/preload.js"),
        },
        backgroundColor: "#121212",
    });

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("isWindowMaximized", mainWindow.isMaximized());
    });
    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("isWindowMaximized", mainWindow.isMaximized());
    });
    mainWindow.on("blur", () => {
        mainWindow.webContents.send("isWindowBlur", true);
    });
    mainWindow.on("focus", () => {
        mainWindow.webContents.send("isWindowBlur", false);
    });

    process.env.ELECTRON_START_URL ? mainWindow.loadURL(process.env.ELECTRON_START_URL) : mainWindow.loadFile(path.join(__dirname, "/index.html"));
}

app.on("ready", createWindow);

ipcMain.on("isWindowMaximized", (evt) => {
    if (mainWindow) {
        evt.reply("isWindowMaximized", mainWindow.isMaximized());
    }
});
ipcMain.on("minimizeWindow", () => {
    mainWindow.minimize();
});
ipcMain.on("maximizeWindow", (evt) => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on("closeWindow", () => {
    mainWindow.close();
});

ipcMain.on("toggleAlwaysOnTop", (e, payload) => {
    mainWindow.setAlwaysOnTop(payload);
});
