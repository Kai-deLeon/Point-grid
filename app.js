// Point Grid Game Logic
const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
const gridSize = 21; // -10 to 10
const cellSize = 20;
const offset = 20;
let point = { x: 0, y: 0 };
let target = randomCoord();

function drawGrid() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = '#ccc';
	ctx.font = '12px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for (let i = 0; i < gridSize; i++) {
		// vertical lines
		ctx.beginPath();
		ctx.moveTo(offset + i * cellSize, offset);
		ctx.lineTo(offset + i * cellSize, offset + (gridSize - 1) * cellSize);
		ctx.stroke();
		// horizontal lines
		ctx.beginPath();
		ctx.moveTo(offset, offset + i * cellSize);
		ctx.lineTo(offset + (gridSize - 1) * cellSize, offset + i * cellSize);
		ctx.stroke();
	}
	// x-axis labels (on axis)
	for (let i = 0; i < gridSize; i++) {
		let xLabel = i - 10;
		ctx.fillStyle = '#333';
		ctx.fillText(xLabel, offset + i * cellSize, offset + 10 * cellSize);
	}
	// y-axis labels (on axis)
	for (let i = 0; i < gridSize; i++) {
		let yLabel = 10 - i;
		ctx.fillStyle = '#333';
		ctx.fillText(yLabel, offset + 10 * cellSize, offset + i * cellSize);
	}
	// axes
	ctx.strokeStyle = '#333';
	ctx.beginPath();
	ctx.moveTo(offset + 10 * cellSize, offset);
	ctx.lineTo(offset + 10 * cellSize, offset + (gridSize - 1) * cellSize);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(offset, offset + 10 * cellSize);
	ctx.lineTo(offset + (gridSize - 1) * cellSize, offset + 10 * cellSize);
	ctx.stroke();
}

function drawPoint(x, y, color) {
	ctx.beginPath();
	ctx.arc(offset + (x + 10) * cellSize, offset + (10 - y) * cellSize, 7, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = '#222';
	ctx.stroke();
}

function draw() {
	drawGrid();
	drawPoint(point.x, point.y, 'blue');
}

function randomCoord() {
	let x = Math.floor(Math.random() * 21) - 10;
	let y = Math.floor(Math.random() * 21) - 10;
	return { x, y };
}

function updateInfo() {
	document.getElementById('target').textContent = `(${target.x}, ${target.y})`;
}

document.getElementById('refresh').onclick = () => {
	target = randomCoord();
	point = { x: 0, y: 0 };
	draw();
	updateInfo();
	document.getElementById('congrats').textContent = '';
};

document.getElementById('check').onclick = () => {
	if (point.x === target.x && point.y === target.y) {
		document.getElementById('congrats').textContent = 'Congratulations! You got it!';
	} else {
		document.getElementById('congrats').textContent = 'Try again!';
	}
};

// Drag logic
let dragging = false;
canvas.addEventListener('mousedown', function(e) {
	const rect = canvas.getBoundingClientRect();
	const mx = e.clientX - rect.left;
	const my = e.clientY - rect.top;
	// Check if click is near the point
	const px = offset + (point.x + 10) * cellSize;
	const py = offset + (10 - point.y) * cellSize;
	if (Math.hypot(mx - px, my - py) < 12) {
		dragging = true;
	}
});
canvas.addEventListener('mousemove', function(e) {
	if (!dragging) return;
	const rect = canvas.getBoundingClientRect();
	const mx = e.clientX - rect.left;
	const my = e.clientY - rect.top;
	// Convert mouse to grid coordinates
	let gx = Math.round((mx - offset) / cellSize) - 10;
	let gy = 10 - Math.round((my - offset) / cellSize);
	if (gx >= -10 && gx <= 10 && gy >= -10 && gy <= 10) {
		point.x = gx;
		point.y = gy;
		draw();
		updateInfo();
	}
});
canvas.addEventListener('mouseup', function() {
	dragging = false;
});

draw();
updateInfo();
