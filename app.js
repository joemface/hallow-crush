//this method of using event listener says I want my
//html file loaded before the js file for a more fool-proof
//ordered events
document.addEventListener('DOMContentLoaded', () => {
  //using an inbuild method called a query selector
  //and telling my JavaScript file to look at my HTML file
  //and find the element with the class name grid
  //indicated with the dot operator. now we can just use grid
  const grid = document.querySelector('.grid');

  const scoreDisplay = document.getElementById('score');
  const width = 8;
  const squares = [];
  let score = 0;
  const imgNames = [
    'cat',
    'witch',
    'pumpking',
    'candyCorn',
    'frankenstein',
    'ghosts',
  ];
  let currImg = '';
  //array of colors
  //candy color images. put images in images folder.
  // once you have got the images, you'll need to replace every .backgroundColor
  //to .backgroundImage
  const candyColors = [
    'url(images/red-candy.png)', //cat
    'url(images/yellow-candy.png)', //witch
    'url(images/orange-candy.png)', //pumpkin
    'url(images/purple-candy.png)', //candy corn
    'url(images/green-candy.png)', //frankenstein
    'url(images/blue-candy.png)', //ghosts
  ];

  //score sound
  function playScoreSound() {
    var snd = new Audio('sounds/success.wav'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }

  //confirm sound
  function playConfrimSound() {
    var snd = new Audio('sounds/confirm.wav'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }
  //yay sound
  function playYaySound() {
    var snd = new Audio('sounds/yay.wav'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }

  //8 bit song
  function play8BitSound() {
    var snd = new Audio('sounds/8bitHalloween.mp3'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }
  //woosh sound
  function playWooshSound() {
    var snd = new Audio('sounds/woosh.wav'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }
  //grab sound
  function playGrabSound() {
    var snd = new Audio('sounds/grab.wav'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }
  //tap sound
  function playTapSound() {
    var snd = new Audio('sounds/tap.wav'); // buffers automatically when created
    new Audio().canPlayType('audio/ogg; codecs=vorbis');
    snd.play();
    snd.currentTime = 0;
  }
  //const candyColors = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];
  //Create board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      //every time it loops we want to create a div
      //using .createElement
      const square = document.createElement('div');
      //we want to make the divs draggable. so we just use the
      //setAttribute function and set draggable to true
      square.setAttribute('draggable', true);
      //we also want to use setAttribute to give each square a unique ID
      square.setAttribute('id', i);
      //set a random number based on the candy colors length and a whole number
      let randomColor = Math.floor(Math.random() * candyColors.length);
      //set that color background for the square at this index
      square.style.backgroundImage = candyColors[randomColor];
      //next we add that div to the grid with appendChild
      grid.appendChild(square);
      //we also want to store these squares into an array
      squares.push(square);
    }
  }
  createBoard();

  //Drag the candies

  //color being dragged variable
  let colorBeingDragged;
  let squareIDBeingDragged;
  let colorBeingReplaced;
  let squareIDBeingReplaced;

  //five events for adding our event listeners on each square
  squares.forEach((square) => square.addEventListener('dragstart', dragStart));
  squares.forEach((square) => square.addEventListener('dragend', dragEnd));
  squares.forEach((square) => square.addEventListener('dragover', dragOver));
  squares.forEach((square) => square.addEventListener('dragenter', dragEnter));
  squares.forEach((square) => square.addEventListener('dragleave', dragLeave));
  squares.forEach((square) => square.addEventListener('drop', dragDrop));

  //now we need functions for every event listener
  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    playGrabSound();
    //to get the string id into an integer we use parseInt
    squareIDBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged + ' is being dragged');
    console.log(this.id, 'dragstart');
  }

  function dragOver(e) {
    e.preventDefault();

    console.log(this.id, 'dragover');
  }
  function dragEnter() {
    console.log(this.id, 'dragenter');
  }
  function dragLeave() {
    console.log(this.id, 'dragleave');
    playTapSound();
  }
  function dragDrop() {
    console.log(this.id, 'dragdrop');
    colorBeingReplaced = this.style.backgroundImage;

    //here is where the id is replaced
    squareIDBeingReplaced = parseInt(this.id);

    //here is where we change the color of the square where it's being dragged onto
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIDBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    console.log(this.id, 'dragend');

    //what is a valid move?
    //our first valid move is any square being dragged minus 1
    //
    let validMoves = [
      // minus 1 is left, plus 1 is right
      // minus width is up, plus width is down
      squareIDBeingDragged - 1,
      squareIDBeingDragged - width,
      squareIDBeingDragged + 1,
      squareIDBeingDragged + width,
    ];
    //what this line does is check if the square ID being replaced
    // is in the valid moves array. validMove is a boolean
    let validMove = validMoves.includes(squareIDBeingReplaced);

    if (validMove) {
      squareIDBeingReplaced = null;
      console.log('Valid move');
      playWooshSound();
    } else if (squareIDBeingReplaced && !validMove) {
      console.log('not a alid move');
      squares[squareIDBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
      console.log('not a alid move');
      squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  //check for five squares
  function checkRowForSix() {
    for (i = 0; i < 59; i++) {
      //if we use indexes to draw our row, it would look like this
      let rowOfSix = [i, i + 1, i + 2, i + 3, i + 4, i + 5];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;

      //below is a variable to confirm that we have cleared the colored squares
      //we'll use it as a boolean
      let isBlank = squares[i].style.backgroundImage === '';

      //we need to confirm valid moves because having
      // the row start at the end and continue to the next row is invalid
      const notValid = [
        3,
        4,
        5,
        6,
        7,
        11,
        12,
        13,
        14,
        15,
        19,
        20,
        21,
        22,
        23,
        27,
        28,
        29,
        30,
        31,
        35,
        36,
        37,
        38,
        39,
        43,
        44,
        45,
        46,
        47,
        51,
        52,
        53,
        54,
        55,
      ];

      if (notValid.includes(i)) continue;
      //if every index in our row of three array is
      // equal to squares grid color based on decided color
      // and we make sure it's not blank
      // index was  created on the fly and passed through an arrow
      // funcion to act as index 0 to confirm the first box
      // has the same color as the decided color.
      if (
        rowOfSix.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //so, for each box in row of three we will set to
        // a blank color on the grid and give points
        score += 24;
        play8BitSound();
        scoreDisplay.innerHTML = score;
        rowOfSix.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }
  // checks for column of five colors
  function checkColForSix() {
    for (i = 0; i < 24; i++) {
      //if we use indexes to draw our row, it would look like this
      let colOfSix = [
        i,
        i + width,
        i + 2 * width,
        i + 3 * width,
        i + 4 * width,
        i + 5 * width,
      ];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;
      let isBlank = squares[i].style.backgroundImage === '';

      if (
        colOfSix.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 24;
        play8BitSound();
        scoreDisplay.innerHTML = score;
        colOfSix.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }

  //check for five squares
  function checkRowForFive() {
    for (i = 0; i < 59; i++) {
      //if we use indexes to draw our row, it would look like this
      let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;

      //below is a variable to confirm that we have cleared the colored squares
      //we'll use it as a boolean
      let isBlank = squares[i].style.backgroundImage === '';

      //we need to confirm valid moves because having
      // the row start at the end and continue to the next row is invalid
      const notValid = [
        4,
        5,
        6,
        7,
        12,
        13,
        14,
        15,
        20,
        21,
        22,
        23,
        28,
        29,
        30,
        31,
        36,
        37,
        38,
        39,
        44,
        45,
        46,
        47,
        52,
        53,
        54,
        55,
        58,
        59,
      ];

      if (notValid.includes(i)) continue;
      //if every index in our row of three array is
      // equal to squares grid color based on decided color
      // and we make sure it's not blank
      // index was  created on the fly and passed through an arrow
      // funcion to act as index 0 to confirm the first box
      // has the same color as the decided color.
      if (
        rowOfFive.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //so, for each box in row of three we will set to
        // a blank color on the grid and give points
        score += 15;
        playYaySound();
        scoreDisplay.innerHTML = score;
        rowOfFive.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }
  // checks for column of five colors
  function checkColForFive() {
    for (i = 0; i < 32; i++) {
      //if we use indexes to draw our row, it would look like this
      let colOfFive = [
        i,
        i + width,
        i + 2 * width,
        i + 3 * width,
        i + 4 * width,
      ];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;
      let isBlank = squares[i].style.backgroundImage === '';

      if (
        colOfFive.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 15;
        playYaySound();
        scoreDisplay.innerHTML = score;
        colOfFive.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }

  //check for 2x2
  function checkRowFor2x2() {
    for (i = 0; i < 55; i++) {
      //if we use indexes to draw our row, it would look like this
      let rowOfFour = [i, i + 1, i + width, i + width + 1];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;

      //below is a variable to confirm that we have cleared the colored squares
      //we'll use it as a boolean
      let isBlank = squares[i].style.backgroundImage === '';

      //we need to confirm valid moves because having
      // the row start at the end and continue to the next row is invalid
      const notValid = [7, 15, 23, 31, 39, 47, 55, 58, 59, 60];

      if (notValid.includes(i)) continue;
      //if every index in our row of three array is
      // equal to squares grid color based on decided color
      // and we make sure it's not blank then score it.
      // 'index' was created on the fly and passed through an arrow
      // funcion to act as index 0 to confirm the first box
      // has the same color as the decided color.
      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //so, for each box in row of three we will set to
        // a blank color on the grid and give points
        score += 8;
        playConfrimSound();
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }

  //check for four squares
  function checkRowForFour() {
    for (i = 0; i < 61; i++) {
      //if we use indexes to draw our row, it would look like this
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;

      //below is a variable to confirm that we have cleared the colored squares
      //we'll use it as a boolean
      let isBlank = squares[i].style.backgroundImage === '';

      //we need to confirm valid moves because having
      // the row start at the end and continue to the next row is invalid
      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
        58,
        59,
        60,
      ];

      if (notValid.includes(i)) continue;
      //if every index in our row of three array is
      // equal to squares grid color based on decided color
      // and we make sure it's not blank
      // index was  created on the fly and passed through an arrow
      // funcion to act as index 0 to confirm the first box
      // has the same color as the decided color.
      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //so, for each box in row of three we will set to
        // a blank color on the grid and give points
        score += 8;
        playConfrimSound();
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }
  // checks for column of four colors
  function checkColForFour() {
    for (i = 0; i < 40; i++) {
      //if we use indexes to draw our row, it would look like this
      let colOfFour = [i, i + width, i + 2 * width, i + 3 * width];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;
      let isBlank = squares[i].style.backgroundImage === '';

      if (
        colOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 8;
        playConfrimSound();
        scoreDisplay.innerHTML = score;
        colOfFour.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }

  // check for matches
  // check for row of three
  // copy and paste this code and change the naming to column and
  // fix the logic accordingly
  function checkRowForThree() {
    for (i = 0; i < 62; i++) {
      //if we use indexes to draw our row, it would look like this
      let rowOfThree = [i, i + 1, i + 2];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;

      //below is a variable to confirm that we have cleared the colored squares
      //we'll use it as a boolean
      const isBlank = squares[i].style.backgroundImage === '';

      //we need to confirm valid moves because having
      // the row start at the end and continue to the next row is invalid
      const notValid = [
        6,
        7,
        14,
        15,
        22,
        23,
        30,
        31,
        38,
        39,
        46,
        47,
        54,
        55,
        58,
        59,
        60,
        61,
      ];

      if (notValid.includes(i)) continue;
      //if every index in our row of three array is
      // equal to squares grid color based on decided color
      // and we make sure it's not blank
      // index was  created on the fly and passed through an arrow
      // funcion to act as index 0 to confirm the first box
      // has the same color as the decided color.
      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //so, for each box in row of three we will set to
        // a blank color on the grid and give points
        score += 3;
        playScoreSound();

        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }
  // checks for column of three colors
  function checkColForThree() {
    for (i = 0; i < 48; i++) {
      //if we use indexes to draw our row, it would look like this
      let colOfThree = [i, i + width, i + 2 * width];
      //this is the color to eliminate
      let decidedColor = squares[i].style.backgroundImage;

      //below is a variable to confirm that we have cleared the colored squares
      //we'll use it as a boolean
      let isBlank = squares[i].style.backgroundImage === '';

      //if every index in our row of three array is
      // equal to squares grid color based on decided color
      // and we make sure it's not blank
      // index was  created on the fly and passed through an arrow
      // funcion to act as index 0 to confirm the first box
      // has the same color as the decided color.
      if (
        colOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        //so, for each box in row of three we will set to
        // a blank color on the grid and give points
        score += 3;
        playScoreSound();
        scoreDisplay.innerHTML = score;
        colOfThree.forEach((index) => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }

  // drop divs down once cleared
  function moveDown() {
    for (i = 0; i < 56; i++) {
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = '';
      }
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && squares[i].style.backgroundImage === '') {
        let randomColor = Math.floor(Math.random() * candyColors.length);
        //set that color background for the square at this index
        squares[i].style.backgroundImage = candyColors[randomColor];
      }
    }
  }

  //so as not to repeat the check for Three function
  //throughout our code, you can use window.setInterval
  //and it will allow you to set how often to run the check.
  //in this case, every 100 milliseconds
  window.setInterval(function () {
    moveDown();
    checkRowForSix();
    checkColForSix();
    checkRowForFive();
    checkColForFive();
    checkRowFor2x2();
    checkRowForFour();
    checkColForFour();
    checkRowForThree();
    checkColForThree();
  }, 250);
});

//https://github.com/joemface/hallow-crush.git
