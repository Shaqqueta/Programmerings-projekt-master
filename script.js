// ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT;
gameCanvas.width = SCREENWIDTH;
let gameover = document.getElementById("gameover");
let start = document.getElementById("start");
let siffra = document.getElementById("siffra");
let tryagain = document.getElementById("tryagain");
let wasd = document.getElementById("WASD")
var ljud = new Audio("Media/music.mp3");

// -------------------------------------
// Player variables
let playerWidth = 100;
let playerHeight = 130;
let playerX = 500;
let playerY = SCREENHEIGHT-playerHeight;
let dx = 12;
let dy = 0; // initial vertical velocity
const gravity = 0.45; // gravitational force
const moving = 1;

let hasDoubleJumped = false

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

let img = new Image();
img.onload = function () {};
img.src = "media/apa.png";


let rectangles = []; 
const rectWidth = 225; 
const rectHeight = 175; 
const rectSpeed = 10; 
const rectGap = 100; 


function spawnRect() {
  const rectX = SCREENWIDTH; // Initial x-coordinate of the rectangle
  const rectY = Math.random() * (SCREENHEIGHT - rectHeight); // Random y-coordinate of the rectangle
  rectangles.push({ x: rectX, y: rectY }); // Add the rectangle to the array
}

setInterval(spawnRect, 1000); // Spawn a rectangle every 2 seconds (adjust the interval as desired)


function checkCollisions() {
  rectangles.forEach((rect) => {
    // Calculate the boundaries of the rectangles
    const rectLeft = rect.x;
    const rectRight = rect.x + rectWidth;
    const rectTop = rect.y;
    const rectBottom = rect.y + rectHeight;

 
if (
  playerX + playerWidth > rectLeft &&
  playerX < rectRight &&
  playerY + playerHeight > rectTop &&
  playerY < rectBottom
) {
  if (playerY >= rectBottom + dy) {
    // Player is colliding from the bottom
    playerY = rectBottom; // Prevent player from going below the rectangle
    dy = 0;
    hasDoubleJumped = false;
  } else if (playerY + playerHeight <= rectTop + dy) {
    playerY = rectTop - playerHeight;
    dy = 0;
    hasDoubleJumped = false;
  } else if (playerX + playerWidth >= rectWidth){
  playerX = rectLeft - playerWidth;
}
}

  });
}





// -------------------------------------
// ------------ Player movement ------------


// ------------- Ducka ------------------

document.addEventListener("keypress", (e) =>{
  if (e.repeat) return;
  switch (e.key) { 
    case "ArrowDown":
      directions.down = true;
      break
  }
})

// -----Keydown------------------------


document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  switch (e.key) {
    case "a":
      directions.left = true;
      break;

    case "ArrowLeft":
      directions.left = true;
      break;
    case "ArrowRight":
      directions.right = true;
      break


    



    case "d":
      directions.right = true;
      break;
    case "w":
      directions.up = true;
      if (playerY + playerHeight >= SCREENHEIGHT) {
        dy = -15;
      } else if (hasDoubleJumped == false && playerY + playerHeight < SCREENHEIGHT) {
        console.log(innerHeight)
        console.log(playerY)
        dy = -15;
        hasDoubleJumped = true
      }
      break;

    case "ArrowUp":
      directions.up = true;
      if (playerY + playerHeight >= SCREENHEIGHT) {
        dy = -15;
      } else if (hasDoubleJumped == false && playerY + playerHeight < SCREENHEIGHT) {
        console.log(innerHeight)
        console.log(playerY)
        console.log("And")
        dy = -15;
        hasDoubleJumped = true
      }
      break;

    default:
      break;
  }
});



document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      directions.left = false;
      break;
    case "d":
      directions.right = false;
      break;

    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break


    case "ArrowDown":
      directions.down = false;
      break



    case " ":
      directions.up = false;
      break;
    default:
      break;
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------FUNKTIONER-------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------
// ---------------Stop Function-----------------

function stanna() {
  dx = 0;
  dy = 0;
}

// ---------------------------------------------
// ------------ Wait function --------------------

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// -------------------------------------
// ------------ Animation ------------
async function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  c.drawImage(img, playerX, playerY, playerWidth, playerHeight);
  // console.log(rectangles);
  playerY += dy;
  playerX -= dx / 4;
  dy += gravity;

  // Move and draw the rectangles
  rectangles.forEach((rect, index) => {
    rect.x -= rectSpeed;
    c.fillStyle = "green"; // Set color for the rectangles
    c.fillRect(rect.x, rect.y, rectWidth, rectHeight);
    if (rect.x < -30){
      rectangles.splice(index,1);
    }
  });

  // Check for collisions
  checkCollisions();

  // ----------- Spelarens horisontella rörelser -------------------------

  if (directions.right) {
    playerX += dx;
  }

  if (directions.left) {
    playerX -= dx;
  }

  if (directions.down) {
    playerHeight =- 5
  }




  // -------- Hoppfunktion / Dubbelhopp funktion ---------------


  if (playerY + playerHeight > SCREENHEIGHT) {
    playerY = SCREENHEIGHT - playerHeight;
    dy = 0;
    hasDoubleJumped = false
  }



  if (playerX + playerWidth / 2 < 0) {
    gameCanvas.style.animation = "back 0s infinite linear";
    gameover.style.display = "block";
    stanna();
    tryagain.style.display = "flex";
    ljud.pause();
  }
  }
  
  // Resten av din kod ...
  
  // Kollisionsdetektering mellan två rektanglar
  function collides(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

async function countdown() {
  start.style.display = "none";
  wasd.style.display = "none"
  siffra.innerHTML = "3";
  siffra.style.display = "block";

  await delay(1000);

  siffra.innerHTML = "2";

  await delay(1000);

  siffra.innerHTML = "1";

  await delay(1000);

  siffra.innerHTML = "GO!";

  await delay(1000);

  ljud.play();  

  siffra.style.display = "none";
  animate();

}

function game() {
  start.onclick = function () {
    countdown();
  };
}




// -------------------------------------
// ------------ Start game ------------
game();
