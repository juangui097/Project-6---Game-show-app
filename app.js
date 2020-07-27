//__________________________________________________________________________________________________
//--------------------------------------IMPORTANT NOTE:---------------------------------------------
//Hi,Thank you soo much for taking your time to reveiw my project, just wanted to let you know that
//I am aiming to EXCEED the expecations!
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------





/*_______________________________________________________________
--------------------------MY JAVASCRIPT--------------------------
---------------------------------------------------------------*/
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const phraseUl = phrase.querySelector('ul');

//Scoreboard
const scoreBoard = document.querySelector('#scoreboard');
let hearts = scoreBoard.querySelectorAll('.tries');
// Initial score
let missed = 0;
function missedCount() {
    missed++;
    return missed;
}
//Letters and phrases
let isLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let phrases = [
  "I WISH I KNEW",
  "WHY SO SERIOUS",
  "I AM YOUR FATHER",
  "YOU TALKING TO ME",
  "SHOW ME THE MONEY"
];

// START GAME BUTTON AND MAIN MENU
const startGameButton = document.querySelector('.btn__reset');
startGameButton.style.cursor = "pointer";
const startScreenOverlay = document.getElementById('overlay');
const mainTitle = startScreenOverlay.querySelector('.title');
startGameButton.addEventListener("click", function() {
  startScreenOverlay.style.display = "none";
});



//functions
//This function makes the phrase an array of letters
function getRandomPhraseAsArray(arr) {
  const arraySelected = arr;
  const random1 = arraySelected[Math.floor(Math.random() * arraySelected.length)];
  const randomString = random1.split("");
  return randomString;
}

//This function displayes the array of the hidden letters for the game
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    var listItem = document.createElement('LI');
    var arrayCharacter = arr[i];
    listItem.innerHTML = arrayCharacter;
    phraseUl.appendChild(listItem);
    for (let e = 0; e < isLetter.length; e += 1) {
      if (arrayCharacter == isLetter[e]) {
        listItem.classList.add('letter');
      } else if (arrayCharacter == " ") {
        listItem.classList.add('space');
      }
    }
  }
}
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
//All letters to guess and checkLetter function
function checkLetter(btn) {
  let letterMatched = null;
  let letters = document.querySelectorAll('.letter');
  for (let i = 0; i < letters.length; i += 1) {
    let li = letters[i];
    if (btn === li.textContent) {
      li.classList.add('show');
      letterMatched = li.textContent;
    }
  }
  return letterMatched;
}

//Player didn't guess function
function removeHeart(index) {
  if (index >= 5) {
    return null;
  }
  for (let i = 0; i < hearts.length; i += 1) {
    let heart = hearts[index];
    heart.style.opacity = "0.25";
  }
}
//-------------------------------------------------------------------------------------------------------
// RESET GAME MAIN MENU
const resetButton = document.createElement('A');
const resetButtonText = "Play Again";
resetButton.innerHTML = resetButtonText;
resetButton.style.cursor = "pointer";

// WINNER
function success() {
  const winnerTitle = "Congratulations You've Won!"
  startScreenOverlay.className = "win";
  mainTitle.innerHTML = winnerTitle;
  startScreenOverlay.style.display = "flex";
  startGameButton.remove();
  startScreenOverlay.appendChild(resetButton);
}

// LOSER
function failure() {
  const loserTitle = "GAME OVER"
  startScreenOverlay.className = "lose";
  mainTitle.innerHTML = loserTitle;
  startScreenOverlay.style.display = "flex";
  startGameButton.remove();
  startScreenOverlay.appendChild(resetButton);
}



// CHECK IF THE PLAYER WON OR LOST
function checkWin() {
  let letters = document.querySelectorAll('.letter');
  let lettersDisplayed = letters.length;
  let guessed = phraseUl.querySelectorAll('.show');
  let lettersGuessed = guessed.length;
  if (missed >= 5) {
    setTimeout(failure, 1500);
  } else if (lettersDisplayed === lettersGuessed) {
    setTimeout(success, 1000);
  }
}




//-------------------------------------------------------------------------------------------------------
//----------------------------------------------KEYBOARD-------------------------------------------------
//-------------------------------------------------------------------------------------------------------
let keyboard = qwerty.querySelectorAll('button');
for (let i = 0; i < keyboard.length; i += 1) {
  let key = keyboard[i];
  key.style.cursor = "pointer";
  key.addEventListener('click', () => {
    key.classList.add('chosen');
    key.setAttribute("disabled", "");
    key.style.cursor = "auto";
    let letterFound = key.textContent;
    let answer = checkLetter(letterFound);
    if (answer === null) {
      const countToRemoveHeart = missedCount();
      const heartToRemove = countToRemoveHeart - 1;
      removeHeart(heartToRemove);
    }
    checkWin();
  });
}
//-------------------------------------------------------------------------------------------------------
//--------------------------------------------RESET GAME-------------------------------------------------
//-------------------------------------------------------------------------------------------------------
function reset() {
  phraseUl.innerHTML = "";
  phraseArray.splice(phraseArray);
  phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  missed = 0;
  for (var i = 0; i < hearts.length; i+= 1) {
    let life = hearts[i];
    life.style.opacity = "1.0";
  }
  for (var i = 0; i < keyboard.length; i+= 1) {
    let key = keyboard[i];
    key.classList.remove("chosen");
    key.disabled = false;
    key.style.cursor = "pointer";
  }
}

resetButton.addEventListener('click', () => {
  reset();
  setTimeout(function() {startScreenOverlay.style.display='none';}, 1000);
});
