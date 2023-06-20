function takeshot() {
    let div =
        document.getElementById('photo');

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(div).then(
        function (canvas) {
            document
            .getElementById('output')
            .appendChild(canvas);
        })
}

const object = document.querySelectorAll('zoom')
const qitem = document.querySelectorAll(".q-item")
var a = 0;
for (const element of object) {
    
    element.onclick = () => {
        console.log(qitem[a].childNodes.length);
    };
    a++   
}