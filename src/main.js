const { app, BrowserWindow, session } = require("electron");
const path = require("path");

// Importa la función startServer del backend
const { startServer } = require("../backend/server"); // Ajusta la ruta si es necesario

// Manejo de creación/eliminación de accesos directos en Windows al instalar/desinstalar.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Crea la ventana principal
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, // Asegúrate de que este valor esté configurado en tu Webpack
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Carga la URL o el archivo HTML de tu frontend
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Opcional: abrir las herramientas de desarrollo
  // mainWindow.webContents.openDevTools();
};

// Cuando Electron esté listo...
app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self' 'unsafe-inline' data:; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000; " +
            "connect-src * ws://localhost:3000 http://localhost:3000 http://localhost:3002; " +
            "img-src 'self' data: blob:; " +
            "font-src 'self' data:;",
        ],
      },
    });
  });

  startServer();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Finaliza la aplicación cuando se cierran todas las ventanas (excepto en macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
