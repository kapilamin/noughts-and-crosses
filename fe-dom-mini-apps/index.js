const buttonList = [...document.getElementsByClassName('gridSlot')]
const winnerPhrase = document.getElementById('winnerPhrase')
const xScorePhrase = document.getElementById('xScore')
const oScorePhrase = document.getElementById('oScore')

const permutations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let turn = 'X'
let startTurn = 'X'
let gameEnded = false
let xScore = 0
let oScore = 0

function toggleXO(button){
    if (!gameEnded && button.innerText === "") {
        if (turn === "X") {
            button.innerText = "X"
            turn = 'O'
        }
        else if (turn === "O") {
            button.innerText = "O"
            turn = 'X'
        }
        checkVictory()
    }
}

function checkVictory() {
    for (const perm of permutations) {
        if (buttonList[perm[0]].innerText !== '' && perm.every((p) => buttonList[p].innerText === buttonList[perm[0]].innerText)) {
            gameEnded = true
            winnerPhrase.innerText = buttonList[perm[0]].innerText + ' is the winner!'

            if (buttonList[perm[0]].innerText === 'X') {
                xScore++
                xScorePhrase.innerText = xScore
            } else {
                oScore++
                oScorePhrase.innerText = oScore
            }
            break
        }
    }
}

function restartGame() {
    gameEnded = false
    winnerPhrase.innerText = ''
    buttonList.forEach((button) => button.innerText = '')
    // Alternate who starts
    if (startTurn === "X") {
        startTurn = 'O'
        turn = 'O'
    }
    else if (startTurn === "O") {
        startTurn = 'X'
        turn = 'X'
    }
}

buttonList.forEach((button) => {
    button.addEventListener('click', (event) => {
        toggleXO(button)
    })
})