// Access HTML elements
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');

let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;


// Define game logic to check doors, progress game, end game, and choose a random chore door

const isClicked = (door) => {
if (door.src === closedDoorPath) {
return true;
} else {
  return false;
}
}

const isBot = (door) => {
if (door.src === botDoorPath) {
return true;
} else {
  return false;
}
}

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    getYourScore();
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false;
}

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver();
  }
}

const randomChoreDoorGenerator = () => {
 const choreDoor = Math.floor(Math.random() * 3);
 switch (choreDoor) {
  case 0:
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
    break;
  case 1:
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
    break;
  case 2:
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = botDoorPath;
    break;
  }
}

doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
}

// Update the high score in local storage
const updateHighScore = (score) => {
    if (score > highScore) {
      highScore = score;
      bestStreak.innerHTML = highScore;
      localStorage.setItem('highScore', highScore);
    }
  };
  
  // Initialize high score from local storage
  const initializeHighScore = () => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      highScore = parseInt(storedHighScore);
      bestStreak.innerHTML = highScore;
    }
  };

// Start a game round
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;

  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good Luck!';

  randomChoreDoorGenerator()
  initializeHighScore();
}
const getYourScore = () => {
  score++;
  updateHighScore(score);
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
}
startRound();