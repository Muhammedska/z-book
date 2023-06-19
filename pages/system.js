const pageMode = document.getElementById('pgmd');


let pageType = 'A4';
let zoomvl = 100;
let isScroll = 0;
document.getElementById('wrapper').classList.add('toggled')

pageMode.onclick = () => {
  console.log(pageType)
  if (pageType == 'fill') {
    pageType = 'A4'
    let allItem = document.querySelectorAll('page')
    for (const element of allItem) {
      element.classList.remove('fill');
      element.classList.add('A4');
    }


  } else if (pageType == 'A4') {
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
window.onscroll = function () {
  console.log("scrolled  " + window.pageYOffset)
  var locate = document.getElementById("mydiv").offsetTop ;
  if(isScroll > window.pageYOffset){
    var calc = isScroll - window.pageYOffset
    document.getElementById("mydiv").style.top = locate - calc +"px";
  }else if(isScroll < window.pageYOffset){
    var calc = isScroll - window.pageYOffset
    document.getElementById("mydiv").style.top = locate - calc +"px";

  }
  isScroll = window.pageYOffset;
  console.log("scrolled  " + window.pageYOffset +"px / new location  " + document.getElementById("mydiv").offsetTop )
};

function zoomplus() {
  zoomvl += 10
  var page = document.getElementsByTagName('page');
  for (const iterator of page) {

    iterator.style.zoom = zoomvl+"%";
  }
  document.getElementById('zoomval').innerText = "%" + zoomvl;
}

function zoomminus() {
  zoomvl -= 10
  var page = document.querySelectorAll('page');
  for (const iterator of page) {

    iterator.style.zoom = zoomvl+"%";
  }
  document.getElementById('zoomval').innerText = "%" + zoomvl;
}

$(document).ready(function () {
  html2canvas($("#testdiv"), {
      onrendered: function (canvas) {
          var extra_canvas = document.createElement("canvas");
          extra_canvas.setAttribute('width', 300);
          extra_canvas.setAttribute('height', 300);
          var ctx = extra_canvas.getContext('2d');
          ctx.drawImage(canvas, 0, 0, 300, 300, 0, 0, 300, 300);
          var myImage = extra_canvas.toDataURL("image/png");
          document.getElementById("img").src = myImage;
          $("[id*=hfImageData]").val(myImage);
          window.open(myImage);
      }
  });
});