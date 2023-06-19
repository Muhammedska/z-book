const pageMode = document.getElementById('pgmd');


let pageType = 'A4';
let zoomvl = 100;
pageMode.onclick =()=>{
  console.log(pageType)
  if(pageType == 'fill'){
    pageType = 'A4'
    let allItem = document.querySelectorAll('page')
    for (const element of allItem) {
      element.classList.remove('fill');
      element.classList.add('A4');
    }
     
   
  }else if(pageType == 'A4'){
    pageType = 'fill'
    let allItem = document.querySelectorAll('page')
    for (const element of allItem) {
      element.classList.add('fill');
      element.classList.remove('A4');
    } 
  }
  pageMode.innerText = pageType.toUpperCase();
}
// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
window.onscroll = function() {
  console.log("scrolled  " + window.pageYOffset)
};

function zoomplus(){
  zoomvl += 10
  var page = document.getElementsByTagName('page');
  var zoom = parseInt(page.style.zoom)+ 10 + '%';
  page.style.zoom = zoomvl
  document.getElementById('zoomval').innerText = "%"+zoomvl;
}

function zoomminus(){
  zoomvl -= 10
  var page = document.getElementsByTagName('page');
  var zoom = parseInt(page.style.zoom)+ 10 + '%';
  page.style.zoom = zoomvl
  document.getElementById('zoomval').innerText = "%"+zoomvl;
}

