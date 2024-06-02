const fullCanvas = document.getElementById('pieCanvas');
const stepsCanvas = document.getElementById('pieStepsCanvas');
const radius = fullCanvas.width / 2;
const centerX = fullCanvas.width / 2;
const centerY = fullCanvas.height / 2;
const minSlice = 2;
const maxSlice = 24;
sliceButton = document.getElementById('sliceButton');
slices = document.getElementById('slices').value;
currSlice = 0;

// Populate canvas on init
function populateCanvas(){
    slices = 0;
    resetCanvas(fullCanvas);
    resetCanvas(stepsCanvas);
}

// Initialization function that runs when the document is fully loaded.
function initialize() {
    updateSlices();
}

// Calculation for slicing each piece of pie.
function slicePie(ctx, sliceNumber){
    angle = (sliceNumber * 2 * Math.PI) / slices;
    x = centerX + radius * Math.cos(angle);
    y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Draw the fully sliced pie in the fullCanvas.
function drawPie() {
    const ctx = fullCanvas.getContext('2d');

    for (let i = 0; i < slices; i++) {
        slicePie(ctx, i);
    }
}

// Draws each slice of pie one piece at a time.
function showNextSlice(){
    const ctx = stepsCanvas.getContext('2d');
    slicePie(ctx, currSlice);

    //If slices are even then we want to slice the pie fully.
    if(slices % 2 == 0){
        evenSlice = (slices / 2) + currSlice;
        slicePie(ctx, evenSlice);
    }
    currSlice++;
    if(currSlice == slices || (slices % 2 == 0 && currSlice * 2 == slices)){
        sliceButton.disabled = true;
    }
}

// Redraws both canvas.
function resetCanvas(canvas){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    return ctx;
}

// Update slices and reset both canvas.
function updateSlices(){
    validateSlicesInput();
    resetCanvas(fullCanvas);
    resetCanvas(stepsCanvas);
    drawPie();
    showNextSlice();
}

// Ensures input is a valid int and sets boundaries.
function validateSlicesInput(){
    let val = document.getElementById('slices').value.replace(/\D/g,'');
    document.getElementById('slices').value = val;
    if(val == "" || val < minSlice){
        document.getElementById('slices').value = minSlice;
    }
    else if(val > maxSlice){
        document.getElementById('slices').value = maxSlice;
    }
    slices = document.getElementById('slices').value;
    currSlice = 0;
    sliceButton.disabled = false;
}

// Event listeners
document.addEventListener('DOMContentLoaded', initialize);
document.getElementsByName("slices")[0].addEventListener('input', updateSlices);