const highScore = localStorage.getItem('highScore')
const gameContainer = document.getElementById("game");

const bold = document.querySelector('b')
const record = document.querySelector('p > b')

if (highScore !== null){record.textContent = `Lowest Flips: ${highScore}`}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "#7aedf5",
  "#fa73f5",
  "#7a1538",
  "#f5f06c",
  "#3b1314",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "#7aedf5",
  "#fa73f5",
  "#7a1538",
  "#f5f06c",
  "#3b1314"
];

let score = 0
let count = 0 //How many cards are currently selected
let card1 //First selected card
let card2 //Second selected card
let progress = 0 //How many matches have you made

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  if (count === 0 && !event.target.classList.contains('faceUp')){ 
    //Searching for a 'faceUp' class prevents clicking the same card twice
    count ++
    score ++
    bold.textContent = `Flips: ${score}`
    card1 = event.target
    card1.style.backgroundColor = card1.classList[0] //classList[0] is the assigned color of the card
    card1.classList.toggle('faceUp')
  } else if (count === 1 && !event.target.classList.contains('faceUp')){
    count ++
    score ++
    bold.textContent = `Flips: ${score}`
    card2 = event.target
    card2.style.backgroundColor = card2.classList[0]
    card2.classList.toggle('faceUp')
    if (card1.classList[0] !== card2.classList[0]){ //If the cards don't match
      setTimeout(() => {
        card1.style.backgroundColor = 'darkgrey'
        card2.style.backgroundColor = 'darkgrey'
        card1.classList.toggle('faceUp') //Placing the cards face down
        card2.classList.toggle('faceUp')
        count = 0
      }, 1000);
    } else {
      count = 0
      progress ++ //You've made a match
    }
  }
  if (progress === 10){ //If all cards have been matched
    alert('Congratulations! You\'ve matched all the cards!!')
    if(score < parseInt(highScore) || highScore === null){ 
      //parseInt makes highScore an integer to compare to score
      localStorage.setItem('highScore',score)
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
