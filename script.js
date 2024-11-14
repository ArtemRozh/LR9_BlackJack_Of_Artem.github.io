const playerResult = document.getElementById("player_result");
const cpuResult = document.getElementById("cpu_result");
const drawBtn = document.getElementById("draw_btn");
const playerCard= document.getElementById("player_card");
const cpuCard = document.getElementById("cpu_card");
const overlay = document.getElementById("overlay");
const verdict = document.getElementById("verdict");
const currentSpan = document.getElementById("currentSpan");
let playerName = document.getElementById("player-name");
let count = 0;
let totalCount = 0;
let winLine;
let isTyping = false;

let tempName = prompt("Введіть ваше ім'я. До 23 символів. Якщо не вміщується викорстовуйте абревіатури");
if(tempName === null || tempName.trim() === "" || tempName.length >= 24){
    playerName.innerHTML = "Default Player";
    tempName = "Default Player";
} else{
    playerName.innerHTML = tempName.trim();
}

const deckTemp = [
    { value: 11, imgPath: "../IMG/cards/A_" },
    { value: 6,  imgPath: "../IMG/cards/6_" },
    { value: 7,  imgPath: "../IMG/cards/7_" },
    { value: 8,  imgPath: "../IMG/cards/8_" },
    { value: 9,  imgPath: "../IMG/cards/9_" },
    { value: 10, imgPath: "../IMG/cards/10_" },
    { value: 2,  imgPath: "../IMG/cards/J_" },
    { value: 3,  imgPath: "../IMG/cards/Q_" },
    { value: 4,  imgPath: "../IMG/cards/K_" }
];
let values = [0, 0];

const suits = ['Heart', 'Diamond', 'Club', 'Spade'];

function generateDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let card of deckTemp) {
            deck.push({
                value: card.value,
                imgPath: `${card.imgPath}${suit}.jpg`
            });
        }
    }
    return deck;
}

let deck = generateDeck();
let deckCpy = deck.slice();

drawBtn.addEventListener('click', () =>{
    const index1 = Math.floor(Math.random() * deck.length);
    playerCard.style.backgroundImage = `url(${deck[index1].imgPath})`;
    values[0] += deck[index1].value;
    deck.splice(index1,1);

    const index2 = Math.floor(Math.random() * deck.length);
    cpuCard.style.backgroundImage = `url(${deck[index2].imgPath})`;
    values[1] += deck[index2].value;
    deck.splice(index2,1);

    playerResult.innerHTML = values[0];
    cpuResult.innerHTML = values[1];

    count++;
    currentSpan.innerHTML = `Спроба ${count} з 3`;

    if((values[0] >= 21) || (values[1] >= 21) || (count === 3)){
        gameEnd();
    }
});

function gameEnd(){
    overlay.style.display = "flex";
    totalCount++;

    if(values[0] > 21){
        winLine = `Комп'ютер виграв! ${tempName} вийшов за ліміт`;
    } else if(values[1] > 21){
        winLine = `${tempName} виграв! Комп'ютер вийшов за ліміт`;
    } else if (values[0] > values[1]){
        winLine = `${tempName} виграв! Найбільше число`;
    } else{
        winLine = `Комп'ютер виграв! Найбільше число`;
    }

    let victorySpeech = `Кінець гри!<br>
    <hr class="divider">
    Рахунок ${tempName} : ${values[0]}<br>
    Рахунок комп'ютеру : ${values[1]}<br>
    Зіграних раундів : ${count}<br>
    Спроба номер ${totalCount}<br>
    ${winLine}<br>
    <hr class="divider">
    Натисність будь де щоб почати знов....
    `;

    typeWriter("verdict", victorySpeech, 25);
}   

function resetGame(){
    isTyping = false;
    values = [0, 0];  
    count = 0;  
    playerResult.innerHTML = "0";
    cpuResult.innerHTML = "0";

    deck = deckCpy.slice();
    currentSpan.innerHTML = `Спроба ${count} з 3`;
    playerCard.style.backgroundImage = "";
    cpuCard.style.backgroundImage = "";
    overlay.style.display = "none";
}

overlay.addEventListener('click', function() {
    if (isTyping) {  
        resetGame(); 
    }
});

function typeWriter(elementId, text, speed) {
    let i = 0;
    let element = document.getElementById(elementId);

    element.innerHTML = '';

    let interval = setInterval(function () {
        if (i < text.length) {
            let current = text[i];
            if (current === '<') {
                let tagEndIndex = text.indexOf('>', i);
                let tag = text.substring(i, tagEndIndex + 1);
                element.innerHTML += tag; 
                i = tagEndIndex + 1;
            } else {
                element.innerHTML = text.substring(0, i + 1);
                i++;
            }
        } else {
            clearInterval(interval);
            isTyping = true;
        }
    }, speed);
}