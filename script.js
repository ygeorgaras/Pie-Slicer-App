const fullCanvas = document.getElementById('pieCanvas');
const stepsCanvas = document.getElementById('pieStepsCanvas');
const MAX_WIDTH = 400; // New canvas size
const MAX_HEIGHT = 400; // New canvas size
const radius = MAX_WIDTH / 2;
const centerX = MAX_WIDTH / 2;
const centerY =  MAX_WIDTH / 2;
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
    fullCanvas.width = MAX_WIDTH;
    stepsCanvas.width = MAX_WIDTH;
    fullCanvas.height = MAX_HEIGHT;
    stepsCanvas.height = MAX_HEIGHT;
    updateSlices();
}

// Calculation for slicing each piece of pie.
function slicePie(ctx, sliceNumber, dashedLine){
    angle = (sliceNumber * 2 * Math.PI) / slices;
    x = centerX + radius * Math.cos(angle);
    y = centerY + radius * Math.sin(angle);

    ctx.strokeStyle = "black"; // Use to change stroke style
    ctx.beginPath();
    // Adds dashed line for next slice
    if(dashedLine == true){
        ctx.setLineDash([10,20]);
        ctx.lineWidth = 1;
    }else{
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
    }
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Draw the fully sliced pie in the fullCanvas.
function drawPie() {
    const ctx = fullCanvas.getContext('2d');

    for (let i = 0; i < slices; i++) {
        slicePie(ctx, i, false);
    }
}

// Draws each slice of pie one piece at a time.
function showNextSlice(){
    if(currSlice == slices || (slices % 2 == 0 && currSlice * 2 == slices)){
        sliceButton.disabled = true;
    }
    const ctx = stepsCanvas.getContext('2d');

    // Slice the pie once.
    slicePie(ctx, currSlice, true);
    if(currSlice > 0)
        slicePie(ctx, currSlice - 1, false);

    // If slices are even then we want to slice the pie fully.
    if(slices % 2 == 0){
        evenSlice = (slices / 2) + currSlice;
        slicePie(ctx, evenSlice, true);
        if(currSlice > 0)
            slicePie(ctx, evenSlice - 1, false);
    }

    currSlice++;
}

// Redraws both canvas.
function resetCanvas(canvas){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, MAX_WIDTH, MAX_WIDTH);
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.strokeStyle = "black";
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
    sliceButton.disabled = false;
    document.getElementById('slices').value = val;
    if(val == ""){
        document.getElementById('slices').value = "";
        sliceButton.disabled = true;
    }
    else if(val < minSlice){
        document.getElementById('slices').value = minSlice;
    }
    else if(val > maxSlice){
        document.getElementById('slices').value = maxSlice;
    }
    slices = document.getElementById('slices').value;
    currSlice = 0;
}

// Event listeners
document.addEventListener('DOMContentLoaded', initialize);
document.getElementsByName("slices")[0].addEventListener('input', updateSlices);
