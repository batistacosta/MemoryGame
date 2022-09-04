const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const button = document.querySelector('.reload');

const characters = [
    'caixa_papelao',
    'garrafa_plastica',
    'celular',
    'garrafa_vidro',
    'latinha',
    'saco_lixo',
    'lixo_reciclave',
    'pilha',
    'folha',

];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 18){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`); button.addEventListener('click', () =>{
            location.reload();
        })
    }
}


const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    }else{

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }

}

const revealCard = ({ target }) =>{
    if (target.parentNode.className.includes('reveal-card')){
        return;
    }


    if (firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    }else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;


        checkCards();
    }

    
}

const createCard = (character) => {

const card = createElement('div', 'card');
const front = createElement('div', 'face front');
const back = createElement('div', 'face back');

front.style.backgroundImage = `url('../images/${character}.png')`;

card.appendChild(front);
card.appendChild(back);

grid.appendChild(card);

card.addEventListener('click', revealCard);
card.setAttribute('data-character', character);

return card;

}

const loadGame = () =>{

    const duplicateCharacter = [ ...characters, ...characters ];

    const shuffledArry = duplicateCharacter.sort(() => Math.random() - 0.5);


    shuffledArry.forEach((character) =>{
        
        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () =>{
    this.loop = setInterval(() =>{
        const currentTimer = Number(timer.innerHTML) ;
        timer.innerHTML = currentTimer + 1;
    }, 1000);

}


window.onload = () =>{

    const PlayerName = localStorage.getItem('player');
    spanPlayer.innerHTML = PlayerName;
    startTimer();
    loadGame();
}

