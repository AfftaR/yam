const electron = require('electron')
const ipc = electron.ipcRenderer
const webview = document.getElementById('embed')

webview.addEventListener('console-message', event => {
  console.log('webview log', event.message)
})

webview.addEventListener('dom-ready', event => {
  const webContents = webview.getWebContents()

  webview.addEventListener('new-window', event => {
    window.open(event.url)
  })

  ipc.on('media-next-track', e => {
    webContents.executeJavaScript(`externalAPI.next()`)
  })

  ipc.on('media-prev-track', e => {
    webContents.executeJavaScript(`externalAPI.prev()`)
  })

  ipc.on('media-stop', e => {
    webContents.executeJavaScript(`externalAPI.stop()`)
  })

  ipc.on('media-play-pause', e => {
    webContents.executeJavaScript(`externalAPI.togglePause()`)
  })
})
