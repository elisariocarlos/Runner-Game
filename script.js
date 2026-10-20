const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const fundo = document.querySelector('.game-board')
const cloud = document.querySelector('.clouds')
const score = document.querySelector('#score')
const high = document.querySelector('#high')
const gameOver = document.querySelector(".gameOver")
const gameStart = document.querySelector(".gameStart")

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}

let a = 0
let valor

const updateScore = setInterval(() => {

    a = a + 1
    const wait = setInterval(() => {
        score.innerHTML = 'Pontuação: ' + a


    }, 700)
}, 100)


window.addEventListener('load', () => {
    pipe.style.marginLeft = '50%'
    pipe.style.animation = "none"
    mario.style.animation = 'none'
    cloud.style.animation = 'none'
    let checar = localStorage.getItem('scoreRunnerGame')
    if (checar != null) {
        high.innerHTML = 'Maior Pontuação: ' + checar
    } else {
        high.innerHTML = 'Maior Pontuação: 0'
    }
    clearInterval(updateScore)
});


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')/*O comando window.getComputedStyle pega o css de um  dado elemento*/
    /*O «+» atrás do window  com o replace converte o valor para número */

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 53) {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`
        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`
        mario.src = "Images/gameOverFace.png"
        cloud.style.animation = 'none'
        document.body.style.background = "url('Images/Game\ Over.png')"
        gameOver.style.display = "flex"
        clearInterval(loop)
        clearInterval(updateScore)
        valor = a
        if (localStorage.getItem('scoreRunnerGame')) {
            let valorSalvo = +localStorage.getItem('scoreRunnerGame')
            if (valorSalvo < valor) {

            }
            else {
                localStorage.setItem('scoreRunnerGame', valor)
            }
        }
        else {
            localStorage.setItem('scoreRunnerGame', valor)
        }
    }

}, 10);

const reload = (() => {
    window.location.href=window.location.href
    start()
})

document.addEventListener('keydown', function (event) {
    if (event.key == " " || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowLeft" || event.key == "ArrowRight") {
        jump()
    }
})

function start() {
    gameStart.style.display = "none"
    pipe.style.animation = ''
    mario.style.animation = ''
    cloud.style.animation = ''
}