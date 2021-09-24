const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 550,
        height: 500,
        minWidth: 550,
        minHeight: 500,
        frame: false,
        title: "대포 뽑기",
        icon: path.join(__dirname, "/icon.png"),
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

ipcMain.on("saveAsFile", (e, text) => {
    dialog
        .showSaveDialog(mainWindow, {
            defaultPath: "뽑기 결과.txt",
            filters: [
                { name: "텍스트 문서", extensions: ["txt"] },
                { name: "모든 파일", extensions: ["*"] },
            ],
        })
        .then((data) => {
            if (data.canceled === false) {
                const mystream = fs.createWriteStream(data.filePath);
                mystream.on("error", (e) => console.log(e));
                mystream.write(text);
                mystream.end();
            }
        })
        .catch((e) => {
            console.log(e);
        });
});
