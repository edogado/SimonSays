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
        this.computer = new Computer();//creating the AI for the color sequence
        this.points = 0;
        this.expectedColors = [];//a copy of the AI color list; we won't change the original list
        this.aButtonIsLit = false;//if a button is lit, we don't let other buttons turn on
    }

    /*------------------------------------------------------------------------------------------------------------------
    This method allows the game to continue when the user manages to complete a full sequence correctly.
    It also updates the user's score. */
    async continueGame() {
        turn.innerText = "Simon's turn";
        score.innerText = `${++this.points}`;
        //if the user gets a higher score than their previous high score, we update best score
        if (bestScore.innerText === '' || parseInt(bestScore.innerText) < this.points){
            bestScore.innerText = this.points;
            bestScoreContainer.style.display = 'block';//best score is hidden until we start the game and complete a sequence
        }
        await this.computer.runGame();//we request a new random color for a new sequence
        this.expectedColors = [...this.computer.getPattern];//we update the new list of colors the user has to click correctly
        //console.log('Expected colors: ', this.expectedColors);
        if (!this.computer.gameOver) turn.innerText = "Your turn";//if user hasn't stop the game midway, we update the screen
    }

    /*------------------------------------------------------------------------------------------------------------------
    This method is used when the user decides to stop the game or when they got a sequence wrong.*/
    gameIsOver(){
        this.aButtonIsLit = true;//disabling all buttons
        turn.innerText = 'Game Over';//updating screen
        this.computer.stopGame();// stopping AI
    }

    /*------------------------------------------------------------------------------------------------------------------
    This method will light up the buttons the user pressed. Parameters required are the pressed button, color when
    lighting up, color when turning off, and the number representing each button.
    1 -> green button,
    2 -> red button,
    3 -> yellow button,
    4 -> blue button*/
    async buttonHandler(button, onColor, offColor, buttonNumber) {
        //if a button has been pressed, or the AI colors isn't ready, we don't do anything
        if (this.aButtonIsLit || this.expectedColors.length === 0) return;
        this.aButtonIsLit = true;//we disable buttons for user since a button was just pressed
        await turnButtonOnAndOff(button, onColor, offColor, 500);//turn on pressed button for 500ms
        let colorToCurrentlyGuess = this.expectedColors.shift();//we need to compare the pressed button with the first color of the sequence
        //console.log('Color expected: ', colorToCurrentlyGuess);

        if (colorToCurrentlyGuess === buttonNumber){ //if the first/next AI's color in the sequence matches the pressed button
            if (this.expectedColors.length === 0) {// and if user continue the sequence correctly and there are no more colors
                await this.continueGame();//we request a new color for a longer sequence
            }
            this.aButtonIsLit = false;//we enable buttons again for the user to click and continue the sequence/game
        }
        else { //if the button doesn't match the AI's first/next color in the sequence
            this.gameIsOver();
        }
    }

    /*------------------------------------------------------------------------------------------------------------------
    This method starts the whole game and allows the restart and end game buttons to appear on the screen while the start button
    disappears.*/
    async startGame() {
        restartGame.classList.remove('invisibleButton');
        endGame.classList.remove('invisibleButton');
        startGame.classList.add('invisibleButton');

        score.innerText = '0';//initial user's score
        turn.innerText = "Simon's turn"
        await this.computer.runGame();//AI creates a sequence
        this.expectedColors = [...this.computer.getPattern];//copy AI sequence for comparison in the button handler
        //console.log('Expected colors: ', this.expectedColors);

        turn.innerText = "Your turn";

        //every button calls the buttonHandler method when it is clicked and passes on their number for comparison
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
