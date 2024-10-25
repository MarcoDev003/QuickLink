/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain, Tray, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import windowsIco from '../../resources/ico.ico?asset'
import icoPng from '../../resources/icon_16x16.png?asset'

/* function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon16 } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
} */

let customDialog: BrowserWindow | null = null

function toggleDialog(): void {
  if (customDialog) {
    if (customDialog.isVisible()) {
      hideDialog() // Nascondi la finestra se è visibile
    } else {
      showDialog() // Mostra la finestra se non è visibile
    }
  } else {
    showDialog() // Crea e mostra la finestra se non esiste
  }
}

function showDialog(): void {
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize

  customDialog = new BrowserWindow({
    width: 400,
    height: 550,
    show: false,
    alwaysOnTop: true,
    fullscreenable: false,
    kiosk: false,
    modal: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    closable: true,
    autoHideMenuBar: true,
    movable: false,
    frame: false,
    hasShadow: false,
    backgroundColor: '#1f2937',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    icon: '../../resources/icon_512X512.png'
  })

  // Imposta la posizione iniziale al di fuori dello schermo
  const initialX = screen.getPrimaryDisplay().bounds.width - 1 // Posizione iniziale a destra dello schermo
  const y = 0 // In cima allo schermo
  customDialog.setPosition(initialX, y)

  // Mostra la finestra solo quando è pronta
  customDialog.once('ready-to-show', () => {
    customDialog?.show()
    // customDialog?.setPosition(initialX, y)

    // Animazione: riporta la finestra nella posizione desiderata
    if (customDialog) {
      animateDialog(customDialog)
    }
  })

  customDialog.on('closed', () => {
    customDialog = null // Imposta a null quando la finestra viene chiusa
  })

  customDialog.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Carica il contenuto della finestra
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    customDialog.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    customDialog.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function hideDialog(): void {
  if (customDialog) {
    // Animazione: fai partire la finestra al di fuori dello schermo
    animateDialogHide(customDialog)
  }
}

// Funzione di easing cubic
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function animateDialog(dialog: BrowserWindow): void {
  const targetX = screen.getPrimaryDisplay().bounds.width - 401 // Posizione finale a sinistra
  const startX = screen.getPrimaryDisplay().bounds.width - 1 // Inizia da destra dello schermo
  const animationDuration = 200 // Durata dell'animazione in ms
  const frames = 30 // Numero di fotogrammi dell'animazione
  const interval = animationDuration / frames

  let currentFrame = 0

  const animate = (): void => {
    if (currentFrame < frames) {
      const progress = currentFrame / frames
      const easedProgress = easeInOutCubic(progress) // Applica easing
      const x = startX - (startX - targetX) * easedProgress // Calcola la posizione attuale
      dialog.setPosition(Math.round(x), 0) // Aggiorna la posizione della finestra
      currentFrame++
      setTimeout(animate, interval)
    }
  }

  animate() // Avvia l'animazione
}

function animateDialogHide(dialog: BrowserWindow): void {
  const targetX = screen.getPrimaryDisplay().bounds.width - 1 // Posizione finale al di fuori dello schermo
  const startX = screen.getPrimaryDisplay().bounds.width - 401 // Inizia dalla posizione finale
  const animationDuration = 200 // Durata dell'animazione in ms
  const frames = 30 // Numero di fotogrammi dell'animazione
  const interval = animationDuration / frames

  let currentFrame = 0

  const animate = (): void => {
    if (currentFrame < frames) {
      const progress = currentFrame / frames
      const easedProgress = easeInOutCubic(progress) // Applica easing
      const x = startX + (targetX - startX) * easedProgress // Calcola la posizione attuale
      dialog.setPosition(Math.round(x), 0) // Aggiorna la posizione della finestra
      currentFrame++
      setTimeout(animate, interval)
    } else {
      dialog.hide() // Nascondi la finestra dopo l'animazione
    }
  }

  animate() // Avvia l'animazione
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  /* if (process.platform == 'darwin') {
    app.dock.hide()
  } */
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const tray = new Tray(
    process.platform == 'win32' ? windowsIco : process.platform == 'darwin' ? icoPng : icoPng
  )
  // Definisci il custom context menu
  tray.on('click', () => {
    toggleDialog()
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('close-app', () => toggleDialog())
  // createWindow()

  // app.on('activate', function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
