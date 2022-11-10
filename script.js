'use strict';

const roll_dice_btn = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const player1_score = document.querySelector('#score--0');
const player2_score = document.querySelector('#score--1');
const player1_current = document.querySelector('#current--0');
const player2_current = document.querySelector('#current--1');
const player1_section = document.querySelector('.player--0');
const player2_section = document.querySelector('.player--1');
const hold_btn = document.querySelector('.btn--hold');

let is_player1_active;
let score1;
let score2;
let current1;
let current2;

const newGame = () => {
    console.log('Start New Game');
    score1 = 0;
    score2 = 0;
    current1 = 0;
    current2 = 0;
    is_player1_active = true;

    player1_score.textContent = score1;
    player2_score.textContent = score2;
    player1_current.textContent = current1;
    player2_current.textContent = current2;

    checkActivePlayer();
}

const checkActivePlayer = () => {
    if(is_player1_active) {
        player1_section.classList.add('player--active');
        player2_section.classList.remove('player--active');
    }else {
        player1_section.classList.remove('player--active');
        player2_section.classList.add('player--active');
    }
    dice.src = `dice-1.png`;
}

const toggleActivePlayer = () => {
    is_player1_active = !is_player1_active;
    checkActivePlayer();
}

const checkWinner = (score) => {
    if(score >= 50) {
        dice.src = `dice-1.png`;
        if(is_player1_active) {
            alert('Player 1 Wins');
        }else {
            alert('Player 2 Wins');
        }

        newGame();
    }
}

document.querySelector('.btn--new').addEventListener('click', newGame);

roll_dice_btn.addEventListener('click', () => {
    const dice_number = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${dice_number}.png`;

    if(dice_number !== 1) {
        if(is_player1_active) {
            current1 += dice_number;
            player1_current.textContent = current1;
        }else {
            current2 += dice_number;
            player2_current.textContent = current2;
        }
    } else {
        if(is_player1_active) {
            current1 = 0;
            player1_current.textContent = current1;
        } else {
            current2 = 0;
            player2_current.textContent = current2;
        }

        toggleActivePlayer();
    }
});

hold_btn.addEventListener('click', () => {
    if(is_player1_active) {
        score1 += current1;
        player1_score.textContent = score1;
        current1 = 0;
        player1_current.textContent = current1;

        checkWinner(score1);
    } else {
        score2 += current2;
        player2_score.textContent = score2;
        current2 = 0;
        player2_current.textContent = current2;

        checkWinner(score2);
    }

    toggleActivePlayer();
});

newGame();