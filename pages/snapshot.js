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

function snapshot(params) {
    let div =
    document.getElementById(params);

// Use the html2canvas
// function to take a screenshot
// and append it
// to the output div
html2canvas(div).then(
    function (canvas) {
        document.getElementById("imview").remove();
        document
        .getElementById('imparent')
        .appendChild(canvas);
        canvas.id = "imview";
        console.log(canvas);
        document.getElementById("zoompart").style.display = "";
    })

}
const image = document.getElementById("image");
const result = document.getElementById("result");
const cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  crop(event) {
    result.innerHTML = "";
    result.appendChild(cropper.getCroppedCanvas());
  }
});

const canvasData = cropper.getCanvasData();

console.log(canvasData);