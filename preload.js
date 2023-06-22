// preload.js
const { contextBridge, ipcRenderer } = require('electron')
const screenshot = require('electron-screenshot');

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')

  // we can also expose variables, not just functions
})
const x = 100; // Başlangıç X koordinatı
const y = 100; // Başlangıç Y koordinatı
const width = 500; // Genişlik
const height = 300; // Yükseklik

// Ekran görüntüsünü alın
setTimeout(() => {
  try {
    screenshot({
      filename: 'screenshot.png', // Kaydedilecek dosya adı ve yolunu belirleyin
      x: x,
      y: y,
      width: width,
      height: height
    }, (error, complete) => {
      if (error) {
        console.error('Ekran görüntüsü alınamadı:', error);
      } else {
        console.log('Ekran görüntüsü başarıyla alındı:', complete);
      }
    });
    
  } catch (error) {
    console.log(error)
    console.log('hata')
    
  }
}, 1000)