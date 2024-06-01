function drawPie() {
    const canvas = document.getElementById('pieCanvas');
    const ctx = canvas.getContext('2d');
    const slices = document.getElementById('slices').value;
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    for (let i = 0; i < slices; i++) {
        const angle = (i * 2 * Math.PI) / slices;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }


}
