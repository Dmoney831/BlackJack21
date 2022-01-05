// create a deck with 52 cards
function newDeck () {
    var suits = ['H', 'C', 'D', 'S'];
    var ranks = ['2','3','4','5','6','7','8','9','0','J','Q','K','A'];
    const deck = [];

    for (var cardSuit = 0; cardSuit < 4; cardSuit++) {
        // console.log(suits[cardSuit]);
        for (var cardRank = 0; cardRank < 13; cardRank++) {
            // console.log(suits[cardSuit] + ranks[cardRank]);
        deck.push({
            suit: suits[cardSuit],
            rank: ranks[cardRank], 
            img: `https://deckofcardsapi.com/static/img/${ranks[cardRank]}${suits[cardSuit]}.png`})
        }  
        
    } return deck;
   
}    
// console.log(newDeck())

function shuffleDeck(deck) {
    for (var i = 0; i < 52; i++) {
        var randomCard = deck[i];
        var randomIndex = Math.floor(Math.random() * 52);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = randomCard;
    }
}


var cardArray = newDeck();
shuffleDeck(cardArray);
// console.log(cardArray);

// let playerCard1 = document.querySelector("#playerCard1")
// let playerCard2 = document.querySelector("#playerCard2")
// let dealerCard1 = document.querySelector("#dealerCard1")

function drawNextCard() {
    return cardArray.shift()
    // cardImage.src=cardArray[0].img
    // cardArray.unshift()
}

// Button definition
let startButton = document.getElementById("start")
let hitButton = document.getElementById("hit")
let stayButton = document.getElementById("stay")
let shuffleButton = document.getElementById("shuffle")

let dealerCards = [];
let playerCards = [];
let playerPocket = 0;

let dealerHandValue = 0;
let playerHandValue = 0;


function getCardNumericValue(rank) {
    // console.log(rank)
    // input = [A,2,3,4,5,6,7,8,9,0,J,Q,K]
    // output = [1,2,3,4,5,6,7,8,9,10]
    if (rank ==="A" ) {
        return 1
    } else if (rank === "0" || rank === "J" || rank === "Q" || rank==="K") {
        return 10
    } else {
        return parseInt(rank, 10)
    }
}

// function drawNextCard() {
//     return deck.shift();
// }
startButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    // 
    var dCardDiv = document.querySelector("#dealerCards") // Dealer's faceup card
    let dealerCard0 = document.createElement("img")
    dCardDiv.appendChild(dealerCard0)

    // playerCards.push(drawNextCard());

    var pCardDiv = document.querySelector("#playerCards")
    let playerCard0 = document.createElement("img")  // Player's first two cards
    pCardDiv.appendChild(playerCard0)
    let playerCard1 = document.createElement("img")
    pCardDiv.appendChild(playerCard1)
    
    let dCard1 = drawNextCard();
    console.log(getCardNumericValue())
    dealerCards.push(drawNextCard());


    console.log(`Player's card: `,playerCards);
    console.log(`Dealer's card: `,dealerCards);

    let pCard1= drawNextCard();
    let pCard2= drawNextCard();
    console.log(getCardNumericValue(pCard1.rank));
    console.log(getCardNumericValue(pCard2.rank));
    playerCards.push(pCard1, pCard2);

    playerCard0.src = playerCards[0].img;
    playerCard1.src = playerCards[1].img;
    dealerCard0.src = dealerCards[0].img;
    startButton.style.display = "none"

})

let dealersTurn = false;
let playerWon = false;


hitButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    
    // dealersTurn = false;
    // playerWon = false;
    
    playerCards.push(drawNextCard());
    console.log(`Player's card: `, playerCards);
    console.log(`Dealer's card: `, dealerCards);
    
    var pCardDiv = document.querySelector("#playerCards")
    let playerCardHit = document.createElement("img")
    pCardDiv.appendChild(playerCardHit)
    // playerCardHit = playerCards.
   
    
    var randomNum = Math.floor(Math.random() * playerCards.length)
    playerCardHit.src = drawNextCard().img
    // }
    })

stayButton.addEventListener("click", function (){
    // dealersTurn = true
})






// var up = document.getElementById('GFG_UP'); 
//         up.innerHTML = "Click on the button to add image element"; 
//         var down = document.getElementById('GFG_DOWN'); 
          
//         function GFG_Fun() {
//             var img = document.createElement('img');
//             img.src = 
// 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
//             document.getElementById('body').appendChild(img);
//             down.innerHTML = "Image Element Added."; 
//         } 






/*

newGameButton.addEventListener("click", function() {
    gamesStarted = true;
    gameOver = false;
    playerWon = false;
  
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
  
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
  });
  
  hitButton.addEventListener("click", function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
  });
  
  stayButton.addEventListener("click", function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
  });
  
  function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
      for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
        let card = {
          suit: suits[suitIdx],
          value: values[valueIdx]
        };
        deck.push(card);
      }
    }
    return deck;
  }
  
  function showStatus() {
    if (!gamesStarted) {
      textArea.innerText = "Welcome to BlackJack";
      return;
    }
  
    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
      dealerCardString += getCardString(dealerCards[i]) + "\n";
    }
  
    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
      playerCardString += getCardString(playerCards[i]) + "\n";
    }
  
    updateScores();
  
    textArea.innerText =
      "Dealer has: \n " +
      dealerCardString +
      "(score:" +
      dealerScore +
      ")\n\n" +
      "Player has: \n " +
      playerCardString +
      "(score:" +
      playerScore +
      ")\n\n";
  
    if (gameOver) {
      if (playerWon) {
        textArea.innerText += "You Win!";
      } else {
        textArea.innerText += "Dealer Wins!";
      }
      newGameButton.style.display = "inline";
      hitButton.style.display = "none";
      stayButton.style.display = "none";
    }
  }
  
  function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      let swapIdx = Math.trunc(Math.random() * deck.length);
      let tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp;
    }
  }
  
  function getCardString(card) {
    return card.value + " of " + card.suit;
  }
  
  function getNextCard() {
    return deck.shift();
  }
  
  function getCardNumericValue(card) {
    switch (card.value) {
      case "Ace":
        return 1;
      case "Two":
        return 2;
      case "Three":
        return 3;
      case "Four":
        return 4;
      case "Five":
        return 5;
      case "Six":
        return 6;
      case "Seven":
        return 7;
      case "Eight":
        return 8;
      case "Nine":
        return 9;
      default:
        return 10;
    }
  }
  
  function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
      let card = cardArray[i];
      score += getCardNumericValue(card);
      if (card.value === "Ace") {
        hasAce = true;
      }
    }
    if (hasAce && score + 10 <= 21) {
      return score + 10;
    }
    return score;
  }
  
  function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
  }
  
  function checkForEndOfGame() {
    updateScores();
    if (gameOver) {
      //let the dealer take cards
      while (
        dealerScore < playerScore &&
        playerScore <= 21 &&
        dealerScore <= 21
      ) {
        dealerCards.push(getNextCard());
        updateScores();
      }
    }
  
    if (playerScore > 21) {
      playerWon = false;
      gameOver = true;
    } else if (dealerScore > 21) {
      playerWon = true;
      gameOver = true;
    } else if (gameOver) {
      if (playerScore > dealerScore) {
        playerWon = true;
      } else {
        playerWon = false;
      }
      // newGameButton.style.display = "inline";
      // hitButton.style.display = "none";
      // stayButton.style.display = "none";
    }
  }
  */