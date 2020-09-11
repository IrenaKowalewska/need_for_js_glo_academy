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
    speed: 3,
    traffic: 3
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    start.classList.add('hide');
     gameArea.innerHTML = '';
    let linesCount = getQuantityElements(100);
    let carsCount = getQuantityElements(100 * setting.traffic)
    for (let i = 0; i < linesCount; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 75) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for (let i = 0; i < carsCount; i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = (Math.floor(Math.random() * (gameArea.offsetWidth - 50))) +'px'; //50 - ширина машины
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url('../image/enemy2.png') center/cover no-repeat`;
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = '125px';
    car.style.bottom = '10px';
    car.style.top = 'auto';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    setting.score += setting.speed;
    score.textContent = `Очки: ${setting.score}`;
    if (setting.start) {
         moveRoad();
         moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < 254) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.x < 254) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
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
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item) => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom && carRect.right >= enemyRect.left
            && carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top) {
                setting.start = false;
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
            }
        item.y += setting.speed / 2; // делим скорость, встречные автомобили
        item.style.top = item.y + 'px';
        if (item.y > document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic; // чтоб сохранялась плотность встречных машин
            item.style.left = (Math.floor(Math.random() * (gameArea.offsetWidth - 50))) +'px'; //меняем положение встречных машин
        }
    });
}