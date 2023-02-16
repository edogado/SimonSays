const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
        await sleep(1000);
        for (let i =0; i < this.#pattern.length; i++){
            if (this.#pattern[i] === 1){
                greenButton.style.background = 'limegreen';
                await sleep(1000);
                greenButton.style.background = 'darkgreen';
            }
            else if (this.#pattern[i] === 2) {
                redButton.style.background = 'red';
                await  sleep(1000);
                redButton.style.background = 'darkred';
            }
            else if (this.#pattern[i] === 3){
                yellowButton.style.background = 'yellow';
                await sleep(1000);
                yellowButton.style.background = '#B58B00';
            }
            else if (this.#pattern[i] === 4){
                blueButton.style.background = 'blue';
                await sleep(1000);
                blueButton.style.background = 'darkblue';
            }
            await sleep(1000);//pause btw lights in case we get the same button consecutively
        }
    }
}

class Simon{

    constructor() {
        this.computer = new Computer();
        this.gameOver = false;
    }

    async turnButtonOnAndOff(button, offColor, onColor){
        button.style.background = onColor;
        await this.sleep(500);
        button.style.background = offColor;
    }

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async startGame() {
        if (this.gameOver) return;
        await this.computer.runGame();
        let expectedColors = [...this.computer.getPattern];
        let colorToCurrentlyGuess;
        console.log('Expected colors: ', expectedColors);

        console.log('users turn')
        greenButton.addEventListener('click', async () => {
            if (this.isAButtonOn) return;
            this.isAButtonOn = true;
            await this.turnButtonOnAndOff(greenButton, 'darkgreen', 'limegreen');
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from green: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess === 1){
                if (expectedColors.length === 0){
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
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
            await this.turnButtonOnAndOff(redButton, 'darkred', 'red');
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from red: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===2){
                if (expectedColors.length === 0){
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
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
            await this.turnButtonOnAndOff(yellowButton, '#B58B00', 'yellow');
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from yellow: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===3){
                if (expectedColors.length === 0){
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
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
            await this.turnButtonOnAndOff(blueButton, 'darkblue', 'blue');
            colorToCurrentlyGuess = expectedColors.shift();
            console.log('Color expected from blue: ', colorToCurrentlyGuess);
            if (colorToCurrentlyGuess===4){
                if (expectedColors.length === 0){
                    await this.computer.runGame();
                    expectedColors = [...this.computer.getPattern];
                    console.log('Expected colors: ', expectedColors);
                    console.log('users turn')
                }
                this.isAButtonOn = false;
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
