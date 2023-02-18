let turn = document.getElementById('turn');
let score = document.getElementById('score');
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const turnButtonOnAndOff = async (button, onColor, offColor, duration) => {
    button.style.background = onColor;
    await sleep(duration);
    button.style.background = offColor;
}

class Computer {
    #pattern = []
    get getPattern(){
        return this.#pattern;
    }
    createPattern(){
        this.#pattern.push(Math.floor(Math.random() * 4) + 1);
    }

    async runGame(){
        this.createPattern();
        await sleep(750);//gives the user 1 sec to get ready after the game starts
        for (let i =0; i < this.#pattern.length; i++){
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
            await sleep(750);//pause btw lights in case we get the same button consecutively
        }
    }
}

class Simon{

    constructor() {
        this.computer = new Computer();
        this.gameOver = false;
        this.isAButtonOn = true;
        this.points = 0;
    }

    async startGame() {
        if (this.gameOver) return;
        score.innerText = '0';
        turn.innerText = "Simon's turn"
        await this.computer.runGame();
        let expectedColors = [...this.computer.getPattern];
        let colorToCurrentlyGuess;
        this.isAButtonOn = false;
        console.log('Expected colors: ', expectedColors);

        console.log('users turn');
        turn.innerText = "Your turn";
        greenButton.addEventListener('click', async () => {
            if (this.isAButtonOn) return;
            this.isAButtonOn = true;
            await turnButtonOnAndOff(greenButton, 'limegreen', 'darkgreen', 500);
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from green: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess === 1){
                if (expectedColors.length === 0){
                    score.innerText = `${++this.points}`;
                    turn.innerText = "Simon's turn"
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
                turn.innerText = "Your turn";
            }
            else{
                console.log('game over green');
                console.log('Color expected from green: ', colorToCurrentlyGuess);
                this.gameOver = true;
                this.isAButtonOn = true;
            }
        });

        redButton.addEventListener('click', async () => {
            if (this.isAButtonOn) return;
            this.isAButtonOn = true;
            await turnButtonOnAndOff(redButton, 'red', 'darkred', 500);
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from red: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===2){
                if (expectedColors.length === 0){
                    score.innerText = `${++this.points}`;
                    turn.innerText = "Simon's turn";
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
                turn.innerText = "Your turn";
            }
            else{
                console.log('game over red');
                console.log('Color expected: ', colorToCurrentlyGuess);
                this.gameOver = true;
                this.isAButtonOn = true;
            }
        });

        yellowButton.addEventListener('click', async () => {
            if (this.isAButtonOn) return;
            this.isAButtonOn = true;
            await turnButtonOnAndOff(yellowButton, 'yellow', '#B58B00', 500);
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from yellow: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===3){
                if (expectedColors.length === 0){
                    score.innerText = `${++this.points}`;
                    turn.innerText = "Simon's turn"
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
                turn.innerText = "Your turn";
            }
            else{
                console.log('game over yellow');
                console.log('Color expected: ', colorToCurrentlyGuess);
                this.gameOver = true;
                this.isAButtonOn = true;
            }
        });

        blueButton.addEventListener('click', async () => {
            if (this.isAButtonOn) return;
            this.isAButtonOn = true;
            await turnButtonOnAndOff(blueButton, 'blue', 'darkblue', 500);
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from blue: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===4){
                if (expectedColors.length === 0){
                    score.innerText = `${++this.points}`;
                    turn.innerText = "Simon's turn"
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
                turn.innerText = "Your turn";
            }
            else{
                console.log('game over blue');
                console.log('Color expected: ', colorToCurrentlyGuess);
                this.gameOver = true;
                this.isAButtonOn = true;
            }
        });

    }
}


simon = new Simon();
simon.startGame().then();
