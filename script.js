
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let catFrame = 0;
let frameCount = 0;
let catY = 300;
let velocityY = 0;
let gravity = 0.6;
let jumping = false;
let obstacles = [];
let score = 0;

// Pixel art cat frames (8x8 scaled up)
const catFrames = [
    [
        "........",
        "..##....",
        ".####...",
        "######..",
        "######..",
        ".#..#...",
        ".#..#...",
        "........"
    ],
    [
        "........",
        "..##....",
        ".####...",
        "######..",
        "######..",
        "..##....",
        "..##....",
        "........"
    ]
];

// Draw pixel art
function drawPixelArt(pixelData, x, y, pixelSize, color="#333") {
    for (let row = 0; row < pixelData.length; row++) {
        for (let col = 0; col < pixelData[row].length; col++) {
            if (pixelData[row][col] === "#") {
                ctx.fillStyle = color;
                ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

// Draw background
function drawBackground() {
    ctx.fillStyle = "#ffcf8f"; // warm sunset
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#f7b267";
    ctx.fillRect(0, 350, canvas.width, 50);
}

// Draw cat
function drawCat() {
    let frame = catFrames[catFrame];
    drawPixelArt(frame, 100, catY, 8, "#4b3832");
}

// Handle jump
function jump() {
    if (!jumping) {
        velocityY = -10;
        jumping = true;
    }
}

// Update game
function update() {
    frameCount++;
    if (frameCount % 10 === 0) catFrame = (catFrame + 1) % catFrames.length;

    velocityY += gravity;
    catY += velocityY;

    if (catY >= 300) {
        catY = 300;
        velocityY = 0;
        jumping = false;
    }

    // Move obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5;
        if (obstacles[i].x + 20 < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }

    // Add new obstacles
    if (frameCount % 90 === 0) {
        obstacles.push({ x: canvas.width, y: 320 });
    }
}

// Draw obstacles
function drawObstacles() {
    ctx.fillStyle = "#d1495b";
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, 20, 20));
}

// Draw score
function drawScore() {
    ctx.fillStyle = "#333";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// Game loop
function gameLoop() {
    drawBackground();
    update();
    drawCat();
    drawObstacles();
    drawScore();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

gameLoop();
