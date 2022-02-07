/*minhaArray.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() {
    return Math.random() - 0.5;
}*/

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
let mainGenerator = document.querySelector("main")


function startGame() {
    let mainInGameCard = [];
    //pergunta o numero de cartas do jogo e verifica é autorizado
    while (numCards < 4 || (numCards % 2) != 0 || numCards > 14) {
        numCards = parseInt(prompt("Digite o numero de cartas. Sendo este numero par e entre 4 e 14"))
    }
    mainGenerator.innerHTML = "";
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
    placeCards(mainInGameCard);
    cards = Array.from(document.getElementsByClassName("card"))

}
function placeCards(auxVector){
    auxVector = selectCard(auxVector);
    auxVector.sort(comparator) //randomifica
    for( let i = 0; i < auxVector.length; i++) {
        mainGenerator.innerHTML += auxVector[i];
    }
}

function comparator() { 
	return Math.random() - 0.5; 
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function selectCard(auxVector){
    let newArray = [];
    let indexCards = 0;

    for(let i=0; i<numCards;){
        indexCards = (getRndInteger(0, (auxVector.length - 2) / 2) * 2);
        newArray[i++] = auxVector[indexCards]; 
        newArray[i++] = auxVector[indexCards + 1]; 
        auxVector.splice(indexCards, 2);
    }
    return newArray;
}



