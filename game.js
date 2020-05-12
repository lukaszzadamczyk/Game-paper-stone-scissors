const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: '',
    aiHand: '',
}

const hands = document.querySelectorAll('.select img');

// Player selection

function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px red'
}

hands.forEach((hand) => {
    hand.addEventListener('click', handSelection)
})

//Computer choice

const aiChoice = function () {
    const aiHand = hands[Math.floor(Math.random() * hands.length)].dataset.option;
    return aiHand
}

// Check function

const checkResoult = (player, ai) => {
    if (player === ai) {
        return 'draw'
    } else if ((player === 'paper' && ai === 'stone') || (player === 'stone' && ai === 'scissors') || (player === 'scissors' && ai === 'paper')) {
        return 'win'
    } else {
        return 'loss'
    }
}

// Result function

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    gameSummary.numbers++;
    document.querySelector('p.numbers span').textContent = gameSummary.numbers;

    if (result === 'win') {
        gameSummary.wins++;
        document.querySelector('p.wins span').textContent = gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = 'You Win !'
        document.querySelector('[data-summary="who-win"]').style.color = 'green';
    } else if (result === 'loss') {
        gameSummary.losses++;
        document.querySelector('p.losses span').textContent = gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'You Loss :( !'
        document.querySelector('[data-summary="who-win"]').style.color = 'red';
    } else {
        gameSummary.draws++;
        document.querySelector('p.draws span').textContent = gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'Draw !'
        document.querySelector('[data-summary="who-win"]').style.color = 'gray';
    }

}

//End Game function

function endGame() {
    document.querySelectorAll('.select img').forEach(hand => {
        hand.style.boxShadow = '';
        game.playerHand = '';
    })
}

// Control function

const startGame = function () {
    if (game.playerHand === '') {
        return alert('Choose a hand !');

    }
    game.aiHand = aiChoice();
    const gameResult = checkResoult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

document.querySelector('.start').addEventListener('click', startGame);