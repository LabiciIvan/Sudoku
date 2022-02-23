const board = document.getElementById('gameBoard');
let arraySquare = [];
let line, column;
let solution = [], position = [], numbers = [];
let limit;

window.onload = createGame();

function createGame() { // create the game board with all the squares
  for (let i = 0; i <= 8; ++i) {
    let arraySmall = [];   //initialize a small array that will pe pushed in the main array 
    let box = document.createElement('div');
    box.setAttribute('class', 'box' + i);  // set name for each box that will hold squares

    for (let j = 0; j <= 8; ++j) { // create small squares and set the box which will be the 'i'
      let square = document.createElement('div');
      square.setAttribute('id', j);
      square.setAttribute('class', 'square');
      square.setAttribute('box', i);
      box.appendChild(square); // appending squares in box element
      board.appendChild(box); // appending box element in board which will hold all boxes with squares
      arraySmall.push(square);
      document.querySelectorAll('.square').forEach(square => (square.addEventListener('click', selectSquare)));
    }
    arraySquare.push(arraySmall);
  }
  activateKey();
}

function start() {
  let status = document.getElementById('win');
  let mode = document.getElementById('dificulty');
  let modeNumber = mode.value;
  if (modeNumber >= 2 && modeNumber <= 6) {
    limit = modeNumber;
    generateRandomArray();
    status.innerHTML = 'playing...'
  } else {
    status.innerHTML = 'keep playing'
  }
}
//line 27 to line 53 give functionality  to insert,cancel,restart, and select square
function activateKey() { // numbers,cancel,restart keys to work.
  document.querySelectorAll('.key').forEach(key => (key.addEventListener('click', insert)));
  document.querySelectorAll('.erase').forEach(erase => (erase.addEventListener('click', clean)));
  document.querySelectorAll('.newGame').forEach(newGame => (newGame.addEventListener('click', restart)));
  document.querySelector('.solution').addEventListener('click', showSolution);
}

function selectSquare(clicked) {  // select position of square clicked
  let element = clicked.target;
  line = element.getAttribute('box');
  column = element.getAttribute('id');
  deselect();
  checkInLine();
  checkInColumn();
}

function insert(clicked) { // insert number in position selected of the square clicked
  let key = clicked.target;
  let value = key.getAttribute('id');
  if (arraySquare[line][column].getAttribute('mobility') == 'fixed') return;
  arraySquare[line][column].innerHTML = value;
  checkSquare(line, value);
  checkWin();
}

function clean() {  // erase the number inserted
  if (arraySquare[line][column].getAttribute('mobility') == 'fixed') return;
  arraySquare[line][column].innerHTML = "";
  arraySquare[line][column].setAttribute('light', 'off');
}

function restart() { // restart the game
  window.location.reload();
}

function deselect() { // will deselect the path , and will set it to off.
  for (let i = 0; i <= 8; ++i) {
    for (let j = 0; j <= 8; ++j) {
      arraySquare[i][j].setAttribute('path', 'off');
    }
  }
}

// these functions down will check in the 3x3 square and in line and column in 9x9 square
function checkSquare(line, value) {
  let appearence = 0;
  for (let i = 0; i <= 8; ++i) {
    if (arraySquare[line][i].innerHTML == value) {
      ++appearence;
      if (appearence > 1) {
        arraySquare[line][column].setAttribute('light', 'on');
      } else {
        arraySquare[line][column].setAttribute('light', 'off');
      }
    }
  }
  checkInLine(value);
  checkInColumn(value);
}

function checkInLine(value) {
  let startBig;
  let startSmall;
  if (column >= 0 && column <= 2) { // column is small box
    startSmall = 0;
  }
  if (column >= 3 && column <= 5) {
    startSmall = 3
  }
  if (column >= 6 && column <= 8) {
    startSmall = 6;
  }
  if (line >= 0 && line <= 2) { // line is big box on 
    startBig = 0;
  }
  if (line >= 3 && line <= 5) {
    startBig = 3;
  }
  if (line >= 6 && line <= 8) {
    startBig = 6;
  }
  let appearence = 0;
  for (let i = 0; i <= 2; ++i) {
    for (let j = 0; j <= 2; ++j) {
      arraySquare[startBig + i][startSmall + j].setAttribute('path', 'on'); // create highlight in line
      if (arraySquare[startBig + i][startSmall + j].innerHTML == value) {
        ++appearence;
        if (appearence > 1) {
          arraySquare[line][column].setAttribute('light', 'on');
        }
      }
    }
  }
  return appearence;
}

function checkInColumn(value) {
  let startBig;
  let startSmall;
  if (line == 0 || line == 3 || line == 6) { // these are for the big box
    startBig = 0;
  }
  if (line == 1 || line == 4 || line == 7) {
    startBig = 1;
  }
  if (line == 2 || line == 5 || line == 8) {
    startBig = 2;
  }
  if (column == 0 || column == 3 || column == 6) {
    startSmall = 0;
  }
  if (column == 1 || column == 4 || column == 7) {
    startSmall = 1;
  }
  if (column == 2 || column == 5 || column == 8) {
    startSmall = 2;
  }
  let appearence = 0;
  for (let i = 0; i <= 6; i += 3) {
    for (let j = 0; j <= 6; j += 3) {
      arraySquare[startBig + i][startSmall + j].setAttribute('path', 'on'); // create highlight in column
      if (arraySquare[startBig + i][startSmall + j].innerHTML == value) {
        ++appearence;
        if (appearence > 1) {
          arraySquare[line][column].setAttribute('light', 'on');
        }
      }
    }
  }
}
// down below generating numbers and inserting them to specifid positions


function randomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

function randomPosition() {
  return Math.floor(Math.random() * 8) + 0;
}

function generatePosition() {
  let x = randomPosition();
  position.push(x);
  while (position.length < limit) {
    x = randomPosition();
    let pass = true;
    for (let i = 0; i < position.length; ++i) {
      if (position[i] == x) {
        pass = false;
      }
    }
    if (pass) {
      position.push(x);
    }
  }
  console.log("positions " + position);
}

// create solution 
function generateRandomArray() {
  let x = randomNumber();
  numbers.push(x);
  while (numbers.length <= 8) {
    x = randomNumber();
    let pass = true;
    for (let i = 0; i < numbers.length; ++i) {
      if (numbers[i] == x) {
        pass = false;
      }
    }
    if (pass) {
      numbers.push(x);
    }
  }
  console.log("numbers " + numbers);
  changeOrderOne();
}

function changeOrderOne() {
  let temorary = [];
  temorary = numbers.slice();
  solution.push(temorary);
  for (let j = 0; j <= 5; ++j) {
    let temorary = [];
    for (let i = 0; i <= 7; ++i) {
      let x = numbers[i];
      numbers[i] = numbers[i + 1];
      numbers[i + 1] = x;
    }
    if (j == 2) {
      temorary = numbers.slice();
      solution.push(temorary);
    }
    if (j == 5) {
      temorary = numbers.slice();
      solution.push(temorary);
    }
  }
  changeOrderTwo();
}


function changeOrderTwo() {
  for (let j = 0; j <= 2; ++j) {
    let temorary = solution[j].slice();
    for (let i = 0; i <= 6; i += 3) {
      let x = temorary[i];
      temorary[i] = temorary[i + 1];
      temorary[i + 1] = temorary[i + 2];
      temorary[i + 2] = x;
    }
    solution.push(temorary);
  }
  for (let j = 3; j <= 5; ++j) {
    let temorary = solution[j].slice();
    for (let i = 0; i <= 6; i += 3) {
      let x = temorary[i];
      temorary[i] = temorary[i + 1];
      temorary[i + 1] = temorary[i + 2];
      temorary[i + 2] = x;
    }
    solution.push(temorary);
  }
  insertion();
}

function insertion() {
  for (let i = 0; i <= 8; ++i) {
    generatePosition();
    for (let j = 0; j <= 8; ++j) {
      arraySquare[i][j].innerHTML = solution[i][j];
      arraySquare[i][j].setAttribute('mobility','fixed');
    }
    for (let j = 0; j < position.length; ++j) {
      arraySquare[i][position[j]].innerHTML = "";
      arraySquare[i][position[j]].setAttribute('mobility', '');
    }
    position.length = 0;
  }
  console.log(solution);

}

function checkWin() {
  let state = true;
  for (let i = 0; i <= 8; ++i) {
    for(let j = 0; j <= 8; ++j) {
      if(arraySquare[i][j].getAttribute('light') == 'on' || arraySquare[i][j].innerHTML == "") {
        state = false;
      }
    }
  }
  console.log(state);
  if (state) {
    let message = "🎉 Sudoku Complete 🎉 ";
    document.getElementById('win').innerHTML = message;
  }
}

function showSolution() {
  for (let i = 0 ; i <= 8; ++i) {
    for (let j = 0; j <= 8; ++j) {
      arraySquare[i][j].innerHTML = solution[i][j];
      arraySquare[i][j].setAttribute('light', 'off');
    }
  }
  checkWin();
}