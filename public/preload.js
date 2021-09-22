const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        const validChannels = ["isWindowMaximized", "minimizeWindow", "maximizeWindow", "closeWindow", "toggleAlwaysOnTop"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        const validChannels = ["isWindowMaximized", "isWindowBlur"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    removeListener: (channel, callback) => {
        ipcRenderer.removeListener(channel, callback);
    },
    information: () => {
        return { version: 0 };
    },
});
