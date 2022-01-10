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
                  value: 11
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
  
}

// Button definition
let startButton = document.getElementById("start")
let hitButton = document.getElementById("hit")
let stayButton = document.getElementById("stay")
let shuffleButton = document.getElementById("shuffle")
let score = document.querySelector("#scoreBoard")
let message = document.querySelector("#message")

let dealerCards = [];
let playerCards = [];
let playerPocket = 0;

let dealerHandValue = 0;
let playerHandValue = 0;

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

function playerAceValueCheck (){
    while (playerHandValue > 21 ) {
      let found1 = playerCards.find(card => card.value === 11)
      console.log(found1)
      if (!found1){
        break
      } else {
        found1.value = 1
        playerHandValue -= 10
        console.log(found1)
      } console.log(playerHandValue)
    }
}

function dealerAceValueCheck (){
  while (dealerHandValue > 21) {
    let found2 = dealerCards.find(card => card.value === 11)
    console.log(found2)
    if (!found2){
      break
    } else {
      found2.value = 1
      dealerHandValue -=10
      console.log(found2)
    } console.log(dealerHandValue)
  }
}


var dCardDiv = document.querySelector("#dealerCards");
let faceDownCard = document.createElement("img");
faceDownCard.setAttribute("class", "faceDown");


var pCardDiv = document.querySelector("#playerCards")


startButton.addEventListener('click', function(evt) {
  evt.preventDefault();

  startButton.disabled = true;


  let dCard0 = drawNextCard();
  let dCard1 = drawNextCard();
  
  dealerCards.push(dCard0, dCard1);

  let pCard0= drawNextCard();
  let pCard1= drawNextCard();
  
  playerCards.push(pCard0, pCard1);

  dealerSumValue()
  playerSumValue()
  dealerAceValueCheck ()
  playerAceValueCheck ()
  
  score.innerHTML = `${playerHandValue}`
  message.innerHTML = `Dealer got ${dealerCards[0].value}, and you have ${playerHandValue}. Hit or Stay?` 
  // Dealer's faceup card
  let dealerCard0 = document.createElement("img")
  dealerCard0.setAttribute("class", "dealerCard0")
  dCardDiv.appendChild(dealerCard0)

  // dealer's facedown card
 
  dCardDiv.appendChild(faceDownCard)
  faceDownCard.src = `https://deckofcardsapi.com/static/img/back.png`
  
  

  let playerCard0 = document.createElement("img")  // Player's first two cards
  playerCard0.setAttribute("class", "playerCard0")
  pCardDiv.appendChild(playerCard0)
  let playerCard1 = document.createElement("img")
  playerCard1.setAttribute("class", "playerCard1")
  pCardDiv.appendChild(playerCard1)
  
  console.log(`Dealer's card: `,dealerCards);
  console.log(`Player's card: `,playerCards);

  playerCard0.src = playerCards[0].img;
  playerCard1.src = playerCards[1].img;
  dealerCard0.src = dealerCards[0].img;

  if (dealerHandValue === 21) {
      console.log("💸Sorry... Dealer got Blackjack...💸")
      message.innerHTML ="💸Sorry... Dealer got Blackjack...💸"
      faceDownCard.style.display= "none"
      // let dealerCard1 = document.createElement("img")
      dCardDiv.appendChild(dealerCard1)
      dealerCard1.src = dealerCards[1].img;
      hitButton.disabled = true;
      stayButton.disabled = true;
      
  }
  if (playerHandValue === 21) {
      console.log("💵Winner Winner Chicken Dinner!!💵")
      message.innerHTML = "💵Winner Winner Chicken Dinner!!💵"
      hitButton.disabled = true;
      stayButton.disabled = true;
      score.innerHTML = "BJ!!"
  }
  // startButton.style.display = "none"
  
})

// console.log(playerHandValue)


let j = 2
hitButton.addEventListener('click', function(evt) {
  evt.preventDefault();

  let pCard2 = drawNextCard();
  playerCards.push(pCard2)
  console.log(`Dealer's card: `, dealerCards);
  console.log(`Player's card: `, playerCards);

  dealerSumValue()
  playerSumValue()
  
  pCardDiv = document.querySelector("#playerCards")
  let playerCardHit = document.createElement("img")
  playerCardHit.setAttribute("class", "playerCardHit")
  pCardDiv.appendChild(playerCardHit)
  playerCardHit.src = playerCards[j].img;
  j += 1
  
  playerAceValueCheck ()
  score.innerHTML = `${playerHandValue}`
  message.innerHTML = `You got ${playerHandValue}. Dealer has ${dealerCards[0].value}.  Hit or Stay ? `
  if (playerHandValue > 21) {
      dealerSumValue()
      playerSumValue()
      playerAceValueCheck ()
      console.log("Player lost!!");
      message.innerHTML = `You bust with ${playerHandValue}.. Bring more cash...`
      playerWon = false;
      hitButton.disabled = true;
      stayButton.disabled = true;

  }
})


let k = 2
stayButton.addEventListener("click", function (){

  dCardDiv.appendChild(faceDownCard)
  faceDownCard.src = `https://deckofcardsapi.com/static/img/back.png`
  faceDownCard.style.display = "none"


  let dealerCard1 = document.createElement("img")
  dealerCard1.setAttribute("class", "dealerCard1");
  dCardDiv.appendChild(dealerCard1)
  dealerCard1.src = dealerCards[1].img;

  dealerSumValue()
  playerSumValue()
  dealerAceValueCheck ()
  
  while(dealerHandValue < 17){
    let dCard2 = drawNextCard();
    dealerHandValue = dealerHandValue+dCard2.value;
    dealerCards.push(dCard2)
    console.log(`Dealer's card: `, dealerCards);
    console.log(`Player's card: `, playerCards);
    
    dCardDiv = document.querySelector("#dealerCards")
    let dealerCardHit = document.createElement("img")
    dealerCardHit.setAttribute("class", "dealerCardHit")
    dCardDiv.appendChild(dealerCardHit)
    dealerCardHit.src = dealerCards[k].img;
    k += 1 
    
    dealerSumValue()
    playerSumValue()
    dealerAceValueCheck ()
  }    
  if (dealerHandValue > 21 ) {
    console.log("Player won!!");
    message.innerHTML = `DEALER BUSTS WITH ${dealerHandValue}! I told you, it's Easy Money 😎`
  } else if (dealerHandValue <= 21 && dealerHandValue == playerHandValue) { 
    console.log("Push!!! Nice try. Let's try again.");
    message.innerHTML = "Push!!! Nice try. Let's try again.";
  } else if (dealerHandValue <= 21 && dealerHandValue > playerHandValue) {
    console.log(`Dealer got ${dealerHandValue}. You lost.. Bring more cash...`);
    message.innerHTML = `Dealer got ${dealerHandValue}. You lost.. Bring more cash...`;
  } else if (dealerHandValue <= 21 || dealerHandValue < playerHandValue) { 
    console.log(`Dealer hand is ${dealerHandValue}. YOU WON!`);
    message.innerHTML = `Dealer got ${dealerHandValue}. YOU WON! 😎💵💵`;
  }
  hitButton.disabled = true;
  stayButton.disabled = true;
})

shuffleButton.addEventListener("click", function (){
   return location.reload()
})

