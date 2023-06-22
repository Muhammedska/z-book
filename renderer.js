const screenshot = require('electron-screenshot');
const { screen } = require('electron');
const { ipcRenderer } = require('electron');

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()
console.log(pagenum)


function ss(x,y,width,height) {
  //const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  //const bounds = display.bounds;

  // Seçilen bölgenin ekran görüntüsünü alın.
  ipcRenderer
 

}