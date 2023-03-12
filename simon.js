let turn = document.getElementById('turn');
let score = document.getElementById('score');
let bestScore = document.getElementById('bestScore');
const bestScoreContainer = document.getElementById('bestScore-container');
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const startGame = document.getElementById('start');
const restartGame = document.getElementById('restart');
const endGame = document.getElementById('end');

/*----------------------------------------------------------------------------------------------------------------------
Sleep method returns a promise which when fulfilled, runs a now-asynchronous setTimeout. The program stops and awaits
the setTimeout to finish and then proceeds with pending code.*/
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/*----------------------------------------------------------------------------------------------------------------------
TurnButtonOnAndOff changes the color of a button to a brighter color for a brief period of time.
The program stops for a set amount of time to allow user to see the change in color and the program eventually changes
the color back to its original darker color.*/
const turnButtonOnAndOff = async (button, onColor, offColor, duration) => {
    button.style.background = onColor;//changing button to a brighter color
    let sound = new Audio(`clickSounds/${button.id}Button.wav`);//get the sound for the specific button
    await sound.play();//play sound for the specific button
    await sleep(duration);//stop program for the amount entered
    button.style.background = offColor;//set the button color back to its original.
}

/*----------------------------------------------------------------------------------------------------------------------
The computer class handles everything related to the color sequences for the game. */
class Computer {
    //array to store the sequence to follow
    #colorPattern = [];
    //variable needed for the continuation of the game
    gameOver = false;

    //------------------------------------------------------------------------------------------------------------------
    //Creates a new empty array for an entirely new sequence
    restartPattern(){

        this.#colorPattern = [];
    }

    /*------------------------------------------------------------------------------------------------------------------
     Returns the array containing the sequence of the colors.*/
    get getPattern(){
        return this.#colorPattern;
    }

    /*------------------------------------------------------------------------------------------------------------------
    CreatePattern gets a random number from 1 to 4 and inserts it in the pattern array.*/
    createPattern(){
        this.#colorPattern.push(Math.floor(Math.random() * 4) + 1);
    }

    /*------------------------------------------------------------------------------------------------------------------
    RunGame contains the logic for the game's Artificial Intelligence (Simon)
     */
    async runGame(){
        if (this.gameOver) return;//if game ended, we don't run Simon
        this.createPattern();
        await sleep(750);//gives the user 1 sec to get ready after the game starts
        for (let color of this.#colorPattern){//we iterate through the pattern array to show the sequence
            if (this.gameOver) break;//in case the game ends while simon is playing, we stop the game
            if (color === 1){
                await turnButtonOnAndOff(greenButton, 'limegreen', 'darkgreen', 750);
            }
            else if (color === 2) {
                await turnButtonOnAndOff(redButton, 'red', 'darkred', 750);
            }
            else if (color === 3){
                await turnButtonOnAndOff(yellowButton, 'yellow', '#B58B00', 750);
            }
            else if (color === 4){
                await turnButtonOnAndOff(blueButton, 'blue', 'darkblue', 750);
            }
            await sleep(350);//pause btw lights in case we get the same button consecutively
        }
    }

    /*------------------------------------------------------------------------------------------------------------------
    StopGame updates the gameOver boolean which is used as a conditional to run the game.*/
    stopGame(){
        this.gameOver = true;
        this.restartPattern();
    }
}

/*----------------------------------------------------------------------------------------------------------------------
The Simon class contains the methods and logic needed for the entire game */
class Simon{

    constructor() {
        this.computer = new Computer();
        this.points = 0;
        this.expectedColors = [];
        this.aButtonIsLit = false;
    }

    async continueGame() {
        turn.innerText = "Simon's turn";
        score.innerText = `${++this.points}`;
        if (bestScore.innerText === '' || parseInt(bestScore.innerText) < this.points){
            bestScore.innerText = this.points;
            bestScoreContainer.style.display = 'block';
        }
        await this.computer.runGame();
        this.expectedColors = [...this.computer.getPattern];
        console.log('Expected colors: ', this.expectedColors);
        if (!this.computer.gameOver) turn.innerText = "Your turn";
    }

    gameIsOver(){
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

        score.innerText = '0';
        turn.innerText = "Simon's turn"
        await this.computer.runGame();
        this.expectedColors = [...this.computer.getPattern];
        console.log('Expected colors: ', this.expectedColors);

        turn.innerText = "Your turn";
        greenButton.addEventListener('click', async () => {
            await this.buttonHandler(greenButton, 'limegreen', 'darkgreen', 1);
        });

        redButton.addEventListener('click', async () => {
            await this.buttonHandler(redButton, 'red', 'darkred', 2);
        });

        yellowButton.addEventListener('click', async () => {
            await this.buttonHandler(yellowButton, 'yellow', '#b58b00', 3);
        });

        blueButton.addEventListener('click', async () => {
            await this.buttonHandler(blueButton, 'blue', 'darkblue', 4);
        });
    }

    async restart(){
        this.computer.restartPattern();
        this.computer.gameOver = false;
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

    endGame.addEventListener('click', ()=> { simon.gameIsOver();});
});
