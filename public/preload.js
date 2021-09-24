const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        const validChannels = ["isWindowMaximized", "minimizeWindow", "maximizeWindow", "closeWindow", "toggleAlwaysOnTop", "saveAsFile"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    on: (channel, func) => {
        const validChannels = ["isWindowMaximized", "isWindowBlur"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    once: (channel, func) => {
        const validChannels = [""];
        if (validChannels.includes(channel)) {
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
    },
    removeListener: (channel, callback) => {
        ipcRenderer.removeListener(channel, callback);
    },
    information: () => {
        return { version: 0 };
    },
    fs: {
        createWriteStream: (...args) => fs.createWriteStream(...args),
    },
});
