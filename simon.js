let turn = document.getElementById('turn');
let score = document.getElementById('score');
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const startGame = document.getElementById('start');
const restartGame = document.getElementById('restart');
const endGame = document.getElementById('end');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const turnButtonOnAndOff = async (button, onColor, offColor, duration) => {
    button.style.background = onColor;
    let sound = new Audio(`clickSounds/${button.id}Button.wav`);
    await sound.play();
    await sleep(duration);
    button.style.background = offColor;
}

class Computer {
    #pattern = [];
    gameOver = false;

    restartPattern(){
        this.#pattern = [];
    }

    get getPattern(){
        return this.#pattern;
    }

    createPattern(){
        this.#pattern.push(Math.floor(Math.random() * 4) + 1);
    }

    async runGame(){
        if (this.gameOver) return;
        this.createPattern();
        await sleep(750);//gives the user 1 sec to get ready after the game starts
        for (let i =0; i < this.#pattern.length; i++){
            if (this.gameOver) break;
            if (this.#pattern[i] === 1){
                await turnButtonOnAndOff(greenButton, 'limegreen', 'darkgreen', 750);
            }
            else if (this.#pattern[i] === 2) {
                await turnButtonOnAndOff(redButton, 'red', 'darkred', 750);
            }
            else if (this.#pattern[i] === 3){
                await turnButtonOnAndOff(yellowButton, 'yellow', '#B58B00', 750);
            }
            else if (this.#pattern[i] === 4){
                await turnButtonOnAndOff(blueButton, 'blue', 'darkblue', 750);
            }
            await sleep(300);//pause btw lights in case we get the same button consecutively
        }
    }

    stopGame(){
        this.gameOver = true;
        this.restartPattern();
    }
}

class Simon{

    constructor() {
        this.computer = new Computer();
        this.gameOver = false;
        this.points = 0;
        this.expectedColors = [];
        this.aButtonIsLit = false;
    }

    async continueGame() {
        turn.innerText = "Simon's turn";
        score.innerText = `${++this.points}`;
        await this.computer.runGame();
        this.expectedColors = [...this.computer.getPattern];
        console.log('Expected colors: ', this.expectedColors);
        if (!this.computer.gameOver) turn.innerText = "Your turn";
    }

    gameIsOver(){
        this.gameOver = true;
        this.aButtonIsLit = true;
        turn.innerText = 'Game Over';
        this.computer.stopGame();
    }

    async buttonHandler(button, onColor, offColor, buttonNumber) {
        if (this.aButtonIsLit || this.expectedColors.length === 0) return;
        this.aButtonIsLit = true;
        await turnButtonOnAndOff(button, onColor, offColor, 500);
        let colorToCurrentlyGuess = this.expectedColors.shift();
        console.log('Color expected: ', colorToCurrentlyGuess);

        if (colorToCurrentlyGuess === buttonNumber){
            if (this.expectedColors.length === 0) {
                await this.continueGame();
            }
            this.aButtonIsLit = false;
        }
        else {
            this.gameIsOver();
        }
    }

    async startGame() {
        restartGame.classList.remove('invisibleButton');
        endGame.classList.remove('invisibleButton');
        startGame.classList.add('invisibleButton');

        if (this.gameOver) return;
        score.innerText = '0';
        turn.innerText = "Simon's turn"
        await this.computer.runGame();
        this.expectedColors = [...this.computer.getPattern];
        let colorToCurrentlyGuess;
        console.log('Expected colors: ', this.expectedColors);

        turn.innerText = "Your turn";
        greenButton.addEventListener('click', async () => {
            /*if (this.aButtonIsLit || this.expectedColors.length === 0) return;
            this.aButtonIsLit = true;
            await turnButtonOnAndOff(greenButton, 'limegreen', 'darkgreen', 500);
            colorToCurrentlyGuess = this.expectedColors.shift();
            console.log('Color expected from green: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess === 1){
                if (this.expectedColors.length === 0){
                    await this.continueGame();
                }
                this.aButtonIsLit = false;
            }
            else{
                this.gameIsOver();
            }*/
            await this.buttonHandler(greenButton, 'limegreen', 'darkgreen', 1);
        });

        redButton.addEventListener('click', async () => {
            /*if (this.aButtonIsLit || this.expectedColors.length === 0) return;
            this.aButtonIsLit = true;
            await turnButtonOnAndOff(redButton, 'red', 'darkred', 500);
            colorToCurrentlyGuess = this.expectedColors.shift();
            console.log('Color expected from red: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===2){
                if (this.expectedColors.length === 0){
                    await this.continueGame();
                }
                this.aButtonIsLit = false;
            }
            else{
                this.gameIsOver();
            }*/
            await this.buttonHandler(redButton, 'red', 'darkred', 2);
        });

        yellowButton.addEventListener('click', async () => {
            if (this.aButtonIsLit || this.expectedColors.length === 0) return;
            this.aButtonIsLit = true;
            await turnButtonOnAndOff(yellowButton, 'yellow', '#B58B00', 500);
            colorToCurrentlyGuess = this.expectedColors.shift();
            console.log('Color expected from yellow: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===3){
                if (this.expectedColors.length === 0){
                    await this.continueGame();
                }
                this.aButtonIsLit = false;
            }
            else{
               this.gameIsOver();
            }
        });

        blueButton.addEventListener('click', async () => {
            if (this.aButtonIsLit || this.expectedColors.length === 0) return;
            this.aButtonIsLit = true;
            await turnButtonOnAndOff(blueButton, 'blue', 'darkblue', 500);
            colorToCurrentlyGuess = this.expectedColors.shift();
            console.log('Color expected from blue: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===4){
                if (this.expectedColors.length === 0){
                    await this.continueGame();
                }
                this.aButtonIsLit = false;
            }
            else{
                this.gameIsOver();
            }
        });
    }

    async restart(){
        this.computer.restartPattern();
        this.computer.gameOver = false;
        this.gameOver = false;
        this.points = 0;
        score.innerText = '0';
        this.expectedColors = [];
        this.aButtonIsLit = false;
        turn.innerText = "Simon's turn";
        await this.computer.runGame();
        this.expectedColors = [...this.computer.getPattern];
        turn.innerText = "Your turn";
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    turn.classList.add('turn-blinking');
    restartGame.classList.add('invisibleButton');
    endGame.classList.add('invisibleButton');
    let simon;

    startGame.addEventListener('click', ()=> {
        turn.classList.remove('turn-blinking');
        simon = new Simon();
        simon.startGame().then();
    });

    restartGame.addEventListener('click', ()=> simon.restart());

    endGame.addEventListener('click', ()=> {
      simon.gameIsOver();
    });
});
