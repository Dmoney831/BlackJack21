#Project BlackJack21

This is a browser-based game, built with .html, .css, and .javascript. 

## Introduce the Project:
Blackjack is my number one favorite game among the casino table games. 
Game rule is very simple. There is a deck, 52cards. Two cards are given to player(s) and a dealer. 
Only one dealer's card is faced up and you can use the dealer's faced-up card to guess your winning chance.
Player decides either "hit" or "stay". If your hand is over 21 then you lose. But if you stay and dealer's hand is less than your hand or over-21 then you won! 

click here to be a next winner, (https://dmoney831.github.io/BlackJack21/)

## Favorite Function & Biggest Challenges
If you're a super frest junior software engineer, you cannot agree more. Everything is a challenge. It's been 3 weeks and half since I've learn coding, and very hard to represent with a binary language, and can't even draw a line. 
I started to learn Javascript 3 weeks ago and here are my favorite functions and challenges. 
1. Array.prototype.find()
In blackjack game, player can choose Ace to be 1 or 11 as long as total hand value is less than 21. 
Function playerAceValueCheck () & dealerAceValueCheck () contain "find()" method to catch all Ace value that makes dealer and player hand value over -21 and change their value to "1" to be safe range, under 21. 
2.  Not using "for loop"
I noticed a lot of times, I tried to solve everything with "for loop". If you are one of them, be careful! otherwise you will be stuck and lock yourself in loop's loophole. Pulling card's images for "hit" action was one of my loop loophole. 
If you use "for loop" then you get a next card plus what you had already. So cards diplays, (card1), (card2), (card1,2,3), (card1,2,3,4).
If you make global variable, j, and do j += 1 then it stops showing repeated cards.  
'''
let j = 2
 pCardDiv = document.querySelector("#playerCards")
  let playerCardHit = document.createElement("img")
  playerCardHit.setAttribute("class", "playerCardHit")
  pCardDiv.appendChild(playerCardHit)
  playerCardHit.src = playerCards[j].img;
  j += 1
'''
3. createElement("img"), setAttribute("class", "variable"). 
After making "div"s for player and dealer card table in .html, I used document.getElementById() in .js to bring card images. This caused broken image icon in my browser since my images was standing by to appear in the browser. 
Using "createElement()" solved that issue, and with "setAttribute()", I was able to call sub-class for each cards and do css (ex. cards overlap).



website reference: 
https://deckofcardsapi.com/ // card images

https://freefrontend.com/css-text-effects/ // css font style. 

https://codepen.io/prathkum/pen/dyMPErw // css font style. 

Wireframe
https://github.com/Dmoney831/BlackJack21/blob/main/New%20Project%201.pdf


MIT License

Copyright (c) [2022] [Derek Y Lee]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
