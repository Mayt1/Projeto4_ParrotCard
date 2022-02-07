/*minhaArray.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() {
    return Math.random() - 0.5;
}*/
let isTurned = null;
let matchedCards = [];
let cards = null;
const cardImages = [
    "assets/squirtle.gif",
    "assets/charmander.gif",
    "assets/mew.gif",
    "assets/mewtwo.gif",
    "assets/eevee.gif",
    "assets/bulbasaur.gif",
    "assets/rocket.gif"
]
const cardFront = ["assets/front.png"]
let numCards = 0;
let mainGenerator = document.querySelector("main");
let flips = 0;
const gameSetup = document.querySelector("section");

function startGame() {
    let mainInGameCard = [];
    //pergunta o numero de cartas do jogo e verifica é autorizado
    while (numCards < 4 || (numCards % 2) != 0 || numCards > 14) {
        numCards = parseInt(prompt("Digite o numero de cartas. Sendo este numero par e entre 4 e 14"))
    }

    mainGenerator.innerHTML = "";
    gameSetup.children[0].innerText = `Viradas: 0`;

    //coloca em cada posiçao do vetor, a div correspondente a cada carta
    for (let i = 0; i < cardImages.length; i++) {
        mainInGameCard.push(`
            <div class="card" data-identifier="card">
                <div class="front-face face" data-identifier="front-face">
                    <img src="${cardFront[0]}" alt="frontcard">
                </div>
                <div class="back-face face" data-identifier="back-face">
                    <img src="${cardImages[i]}" alt="backcard">
                </div>
            </div>
        `)
        mainInGameCard.push(`
            <div class="card" data-identifier="card">
                <div class="front-face face" data-identifier="front-face">
                    <img src="${cardFront[0]}" alt="frontcard">
                </div>
                <div class="back-face face" data-identifier="back-face">
                    <img src="${cardImages[i]}" alt="backcard">
                </div>
            </div>
        `)
    }
    //é colocado as cartas
    placeCards(mainInGameCard)
    cards = Array.from(document.getElementsByClassName("card"))
    pickCards()

}

function placeCards(auxVector) {
    auxVector = selectCard(auxVector);
    auxVector.sort(comparator) //randomifica
    for (let i = 0; i < auxVector.length; i++) {
        mainGenerator.innerHTML += auxVector[i];
    }
}

function comparator() {
    return Math.random() - 0.5;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectCard(auxVector) {
    let newArray = [];
    let indexCards = 0;

    for (let i = 0; i < numCards;) {
        indexCards = (getRndInteger(0, (auxVector.length - 2) / 2) * 2);
        newArray[i++] = auxVector[indexCards];
        newArray[i++] = auxVector[indexCards + 1];
        auxVector.splice(indexCards, 2);
    }
    return newArray;
}

function pickCards() {
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (!(card.classList.contains('lock'))) {
                addFlipCounter()
                card.classList.toggle('visible_face')

                if (isTurned === null) {
                    isTurned = card;
                    isTurned.classList.add('lock')
                } else if (isTurned !== card) {
                    checkCards(card);
                    victoryMessage();
                }
            }
        })
    })
}

function cardType(card) {
    return card.children[1].children[0].src; // retorna src do tipo da carta
}

function checkCards(card) {
    if (cardType(card) === cardType(isTurned)) {
        matchedCards.push(card.classList.add('lock', 'matched'));
        matchedCards.push(isTurned.classList.add('lock', 'matched'));
        isTurned = null;
    } else {
        blockAllCards(true);
        setTimeout(() => {
            card.classList.remove('visible_face');
            isTurned.classList.remove('visible_face');
            isTurned = null;
            blockAllCards(false);
        }, 1000);
    }
}

function blockAllCards(bool) {
    if (bool) {
        cards.forEach((card) => {
            card.classList.add('lock');
        })
    } else {
        cards.forEach((card) => {
            if (!(card.classList.contains('matched'))) {
                card.classList.remove('lock');
            }
        })
    }
}

function addFlipCounter() {
    gameSetup.children[0].innerText = `Viradas: ${++flips}`
}

function victoryMessage() {
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert(`
                Voce ganhou em ${flips} Jogadas!
                Seu tempo: X Segundos.
            `);
            resetGame();
        }, 500);
    }
}

function resetGame() {
    isTurned = null;
    numCards = null;
    matchedCards = [];
    flips = 0;

    if (prompt('Digite: Sim; para jogar novamente') === 'Sim') {
        gameSetup.children[0].innerText = `Viradas: 0`;
        startGame();
    }
}