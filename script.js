const body = document.body;
const container = document.querySelector('.container');
const boardElement = document.getElementById('board');
const coinDisplay = document.querySelector('.coin-display');

body.style.background = "url('./assets/pokemon-bg.jpg')";
body.style.backgroundSize = 'cover';
body.style.fontFamily = 'Arial, Helvetica, sans-serif';
body.style.textAlign = 'center';

container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';
container.style.height = '80vh';
container.style.gap = '20px';

boardElement.style.height = '532px';
boardElement.style.width = '475px';
boardElement.style.margin = '0 auto';
boardElement.style.display = 'flex';
boardElement.style.flexWrap = 'wrap';
boardElement.style.backgroundColor = 'whitesmoke';
boardElement.style.border = '10px solid lightgray';

coinDisplay.style.fontFamily = "'Times New Roman', serif";
coinDisplay.style.fontSize = '40px';
coinDisplay.style.color = '#183374';

let cardList = [
  'darkness',
  'double',
  'fairy',
  'fighting',
  'fire',
  'grass',
  'lightning',
  'metal',
  'psychic',
  'water',
];

let cardSet;
let board = [];
let rows = 4;
let columns = 5;

let coin = 10_000;
let matchPairs = 0;

let cardOneSelected;
let cardTwoSelected;

const coinElement = document.getElementById('coin');

window.onload = function () {
  updateCoinCount();
  shuffleCards();
  startGame();
};

function shuffleCards() {
  cardSet = cardList.concat(cardList);

  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);

    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];

    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      let card = document.createElement('img');

      card.id = `${r.toString()}-${c.toString()}`;
      card.src = getSrc(cardImg);
      card.classList.add('card');

      card.style.cursor = 'pointer';
      card.style.height = '128px';
      card.style.width = '90px';
      card.style.margin = '2.5px';

      card.addEventListener('click', handleSelectCard);

      document.getElementById('board').append(card);
    }
    board.push(row);
  }
  console.log(board);
  setTimeout(hideCards, 100);
}

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(`${r.toString()}-${c.toString()}`);
      card.src = getSrc('back');
    }
  }
}

function handleSelectCard() {
  if (this.src.includes('back')) {
    if (!cardOneSelected) {
      cardOneSelected = this;

      revealCard(cardOneSelected);
    } else if (!cardTwoSelected && this != cardOneSelected) {
      cardTwoSelected = this;

      revealCard(cardTwoSelected);

      setTimeout(checkWin, 800);
    }
  }
}

function revealCard(card) {
  let coords = card.id.split('-');
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  card.src = getSrc(board[r][c]);
}

function checkWin() {
  if (
    cardOneSelected.src === cardTwoSelected.src &&
    cardOneSelected.id !== cardTwoSelected.id
  ) {
    coin += 1000;
    matchPairs++;
    cardOneSelected.style.visibility = 'hidden';
    cardTwoSelected.style.visibility = 'hidden';
  } else {
    coin -= 500;
    cardOneSelected.src = getSrc('back');
    cardTwoSelected.src = getSrc('back');
  }

  if (coin < 0) {
    alert('Game Over! You ran out of coins.');
  }

  if (matchPairs === 10) {
    alert('Congratulations! You won!');
  }

  cardOneSelected = null;
  cardTwoSelected = null;
  updateCoinCount();
}

function updateCoinCount() {
  coinElement.innerHTML = `${coin}`;
}

function getSrc(name) {
  return `./assets/${name.toString()}.jpg`;
}
