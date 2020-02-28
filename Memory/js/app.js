var op_Si;
var min = 0;
var sec = 0;
var cnt = 0;
// Array to store the cards selected
var x = [];
// Array that stores the stars.
var Stars = [];
// Array to store the final cards
var Fnl_Crds = [];
// Array to store the selected card
var SlctdCrd = [];

// By using the querySelectorwe does get the
// necessary content from the html file.
const stars = document.querySelectorAll(".fa-star");
var Cards = [...document.querySelectorAll(".card")]; //rest parameter
// Modal box
let modal = document.querySelector(".congrats");
var deck = document.querySelector('.deck');
// Function to shuffle the cards
var CardsShuffle = shuffle(Cards);
CardsShuffle.forEach(() => {
  [].forEach.call(Cards, function(items) {
    deck.appendChild(items);
  });
});

for (i = 0; i < Cards.length; i++) {
  Cards[i].addEventListener("click", click(i));
}
// function that defines the action to be performed
// when click operation is being performed.
function click(i) {
  return function() {
    x.push(Cards[i]);
    if (x.length == 1)
      op_Si = setInterval(Timer, 1000);
    SlctdCrd.push(Cards[i]);
    Cards[i].classList.add("open", "show", "Xmulticlick");
    Matched();
  }
}
// This function checks either the cards selected are matched or not
function Matched() {
  if (SlctdCrd.length == 2) {
    count();
    // The setTimeoutis used to set the time to
    // flip the cards if they are not matched
    setTimeout(function() {
      if (SlctdCrd[0].children[0].className == SlctdCrd[1].children[0].className) {
        SlctdCrd[0].className = "card match";
        Fnl_Crds.push("jhgfv");
        SlctdCrd[1].className = "card match";
        Fnl_Crds.push("jhgfv");
        SlctdCrd = [];
        // when the cards length is 16 then the popup box displays
        if (Fnl_Crds.length == 16) {
          Endtimer();
          modal.classList.add("show");
          // Display the starRating in the popup
          var starRating = document.querySelector(".stars").innerHTML;
          document.getElementById('totalMoves').innerHTML = cnt;
          document.getElementById('totalTime').innerHTML = time;
          document.getElementById('starRating').innerHTML = starRating;
        }

      } else {

        SlctdCrd[0].classList.remove("open", "show", "Xmulticlick");
        SlctdCrd[1].classList.remove("open", "show", "Xmulticlick");
        SlctdCrd = [];
      }
      SlctdCrd = [];
    }, 200);

  }
}

// Shuffle the cards in the deck
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// function that counts the moves performed
function count() {
  cnt++;
  document.querySelector(".moves").innerHTML = cnt;
  starCount();
}

// set timer to check the duration of time to complete the game
function Timer() {
  sec = sec + 1;
  if (sec == 60) {
    min = min + 1;
    sec = 0
  }
  time = min + ":" + sec;
  document.querySelector(".Timer").innerHTML = time;

}

// This does reloads the entire game
function reset() {
  window.location.reload();
}

// Based on the moves count the star rating is being allocated
function starCount() {
  if (cnt > 8 && cnt < 20) {
    for (var i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (cnt > 21) {
    for (var i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// The timer should stop once the user is done with the game
function Endtimer() {
  clearInterval(op_Si);
}
