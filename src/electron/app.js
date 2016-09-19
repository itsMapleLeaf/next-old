import {app, BrowserWindow} from 'electron'
import path from 'path'

const vuejsExtensionID = 'nhdogjmejiglipccpnnnanhbledajbpd'
const vuejsExtensionVersion = '2.0.2_0'
const appDataFolder = process.env.LOCALAPPDATA
const extensionFolder = path.join(appDataFolder, '/Google/Chrome/User Data/Default/Extensions')

let win

function createWindow() {
  win = new BrowserWindow({ title: 'F-Chat Next' })

  const index = path.join(__dirname, 'app.html')

  if (process.argv.includes('--dev')) {
    BrowserWindow.addDevToolsExtension(path.join(extensionFolder, vuejsExtensionID, vuejsExtensionVersion))
    win.loadURL('http://localhost:8080/dist')
    // win.webContents.openDevTools()
  } else {
    win.loadURL(`file://${index}`)
  }

  win.on('closed', () => {
    win = null
  })

  win.maximize()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
