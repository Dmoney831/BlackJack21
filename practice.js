// create a deck with 52 cards
function newDeck () {
    var suits = ['H', 'C', 'D', 'S'];
    var ranks = ['K','A','2','3','4','5','6','7','8','9','0','J','Q'];
    const deck = [];

    for (var cardSuit = 0; cardSuit < 4; cardSuit++) {
        // console.log(suits[cardSuit]);
        for (var cardRank = 0; cardRank < 13; cardRank++) {
            // console.log(suits[cardSuit] + ranks[cardRank]);
            if (ranks[cardRank] ==="A" ) {
                deck.push({
                    suit: suits[cardSuit],
                    rank: ranks[cardRank], 
                    img: `https://deckofcardsapi.com/static/img/${ranks[cardRank]}${suits[cardSuit]}.png`,
                    value: 1
                })                
            } else if (ranks[cardRank] === "0" || ranks[cardRank] === "J" || ranks[cardRank] === "Q" || ranks[cardRank]==="K") {
                deck.push({
                    suit: suits[cardSuit],
                    rank: ranks[cardRank], 
                    img: `https://deckofcardsapi.com/static/img/${ranks[cardRank]}${suits[cardSuit]}.png`,
                    value: 10})
            } else {
                deck.push({
                    suit: suits[cardSuit],
                    rank: ranks[cardRank], 
                    img: `https://deckofcardsapi.com/static/img/${ranks[cardRank]}${suits[cardSuit]}.png`,
                    value: cardRank
                    // hidden: false
                })
            }  
        } 
    } return deck
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

function drawNextCard() {
    return cardArray.shift()
    // cardImage.src=cardArray[0].img
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


// function playerSumValue(){
//     let playerHandValue = 0;
//         for (let x = 0; x<playerCards.length; x++) {
//              playerHandValue += playerCards[x].value
//         } console.log(playerHandValue)
// }
function playerSumValue(){
    let currentPlayerScore = 0;
        for (let x = 0; x<playerCards.length; x++) {
             currentPlayerScore += playerCards[x].value
        } 
        playerHandValue = currentPlayerScore;
        console.log(playerHandValue)
}

// var totalPlayerValue = playerSumValue()

function dealerSumValue(){
    let currentDealerScore = 0;
    for (let y = 0; y<dealerCards.length; y++) {
        currentDealerScore += dealerCards[y].value
    }
    dealerHandValue = currentDealerScore; 
    console.log(dealerHandValue)
}
// var totalDealerValue = dealerSumValue()

let gameStarted = false;
let gameOver = false;
let playerWon = false;

startButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    
    let dCard0 = drawNextCard();
    let dCard1 = drawNextCard();
    // console.log(getCardNumericValue(dCard0.rank));
    // console.log(getCardNumericValue())
    dealerCards.push(dCard0, dCard1);

    let pCard0= drawNextCard();
    let pCard1= drawNextCard();
    // console.log(getCardNumericValue(pCard0.rank));
    // console.log(getCardNumericValue(pCard1.rank));
    playerCards.push(pCard0, pCard1);

    dealerSumValue()
    playerSumValue()
    // console.log(totalDealerValue)
    // console.log(totalPlayerValue)
   
    
    var dCardDiv = document.querySelector("#dealerCards") // Dealer's faceup card
    let dealerCard0 = document.createElement("img")
    dCardDiv.appendChild(dealerCard0)
    let dealerCard1 = document.createElement("img")
    dCardDiv.appendChild(dealerCard1)
        
   
    // console.log(dealerHandValue)

    var pCardDiv = document.querySelector("#playerCards")
    let playerCard0 = document.createElement("img")  // Player's first two cards
    pCardDiv.appendChild(playerCard0)
    let playerCard1 = document.createElement("img")
    pCardDiv.appendChild(playerCard1)
    
    console.log(`Dealer's card: `,dealerCards);
    console.log(`Player's card: `,playerCards);

    playerCard0.src = playerCards[0].img;
    playerCard1.src = playerCards[1].img;
    dealerCard0.src = dealerCards[0].img;
    dealerCard1.src = dealerCards[1].img;
    startButton.style.display = "none"

    
})
// console.log(playerHandValue)



let j = 2
hitButton.addEventListener('click', function(evt) {
    evt.preventDefault();

    let pCard2 = drawNextCard();
    playerCards.push(pCard2)
    console.log(`Dealer's card: `, dealerCards);
    console.log(`Player's card: `, playerCards);

    playerSumValue()

    // let totalPlayerValue = playerSumValue()
    
    pCardDiv = document.querySelector("#playerCards")
    let playerCardHit = document.createElement("img")
    pCardDiv.appendChild(playerCardHit)
    playerCardHit.src = playerCards[j].img;
    j += 1
    
    
    if (playerHandValue > 21) {
        console.log("Player lost!!");
        startButton.style.display = "block";
        hitButton.style.display = "none";
        playerWon = false;

    }
})

let k = 2
stayButton.addEventListener("click", function (){
    hitButton.style.display = "none";
    startButton.style.display = "block";
    
    while(dealerHandValue < 17){
        let dCard2 = drawNextCard();
        dealerHandValue = dealerHandValue+dCard2.value;
        dealerCards.push(dCard2)
        console.log(`Dealer's card: `, dealerCards);
        console.log(`Player's card: `, playerCards);
        // let totalPlayerValue = playerSumValue()
        
        dCardDiv = document.querySelector("#dealerCards")
        let dealerCardHit = document.createElement("img")
        dCardDiv.appendChild(dealerCardHit)
        dealerCardHit.src = dealerCards[k].img;
        k += 1
        
        if (dealerHandValue > 21 || dealerHandValue < playerHandValue) {
            console.log("Player won!!");
        }
        if (dealerHandValue <= 21 && dealerHandValue === playerHandValue) {
            console.log("Push");
        }
        if (dealerHandValue <= 21 && dealerHandValue > playerHandValue) {
            console.log("Player lost....");
        }
    }
    playerSumValue()
    dealerSumValue()

})

 shuffleButton.addEventListener("click", function (){
     return location.reload()
 })
// while(dealerHand.score() < 17){
//     countingDealersCards = 0;
//     dealerHand.hitMe("b");
// function checkForEndOfGame () {
//     if (gameOver) {
//         while (dealerSumValue() < 17 && playerSumValue() <= 21 && dealerSumValue <= 21){
//             dealerCards.push(drawNextCard());
//         }
//     }
//     if (playerSumValue() > 21) {
//         playerWon = false;
//         gameOver = true;
//     } else if (dealerScore > 21) {
//         playerWon = true;
//         gameOver = true;
//     } else if (gameOver) {
//         if (playerSumValue() > dealerSumValue()) {
//             playerWon = true;
//         } else {
//             playerWon = false;
//         }
//     }
// }











// function hit() {
//     if (!gameInProgress)
//        return;
//     standButton.disabled = true;
//     hitButton.disabled = true;
//     dealCard(playerCards, function() {
//        var playerTotal = getTotal(playerCards);
//        if (playerTotal > 21)
//           endGame(false, "YOU WENT OVER 21!");
//        else if (playerCards.count == 5)
//           endGame(true, "You took 5 cards without going over 21.");
//        else if (playerTotal == 21)
//           dealersTurnAndEndGame();
//        else {
//           message.innerHTML = "You have " + playerTotal + ". Hit or Stand?";
//           hitButton.disabled = false;
//           standButton.disabled = false;
//        }
//     });
//  }


//  function endGame(win, why) {
//     if (win)
//         money += bet;
//     else
//         money -= bet;
//     message.innerHTML = (win ? "Congratulations! You win.  " : "Sorry! You lose.  ") + why + 
//           (money > 0 ? "<br>Click New Game to play again." : "<br>Looks like you've run out of money!");
//     standButton.disabled = true;
//     hitButton.disabled = true;
//     newGameButton.disabled = true;
//     gameInProgress = false;
//     if (dealerCards[2].faceDown) {
//       dealerCards[2].cardContainer.style.display = "none";
//       dealerCards[2].setFaceUp();
//       new Effect.SlideDown(dealerCards[2].cardContainer, { duration: 0.5, queue: "end" });
//     }
//     new Effect.Fade(moneyDisplay, {
//        duration: 0.5,
//        queue: "end",
//        afterFinish: function() {
//            moneyDisplay.innerHTML = "$" + money;
//            new Effect.Appear(moneyDisplay, {
//               duration: 0.5,
//               queue: "end",
//               afterFinish: function() {
//                   if (money <= 0) {
//                        betInput.value = "BUSTED";
//                        new Effect.Shake(moneyDisplay);
//                   }
//                   else {
//                       if (bet > money)
//                          betInput.value = money;
//                       standButton.disabled = true;
//                       hitButton.disabled = true;
//                       newGameButton.disabled = false;
//                       betInput.disabled = false;
//                   }
//               }
//            });
//        }
//     });
// }









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