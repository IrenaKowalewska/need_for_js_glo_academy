const score = document.querySelector(".score");
const start = document.querySelector(".start");
const gameArea = document.querySelector(".game-area");
const car = document.createElement("div");
car.classList.add("car");

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

// статус игры: количество очков и т.д.
const setting = {
    start: false,
    score: 0,
    speed: 3
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


function startGame() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
}

function playGame() {
    console.log("game start");
    if (setting.start === true) {
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    // отменить стандартное поведение браузера на нажатие кнопки (не будет скролла страницы)
    event.preventDefault(); 
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault(); 
    keys[event.key] = true;
}