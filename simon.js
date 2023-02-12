let score  = document.getElementById('score');
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');


class Computer {
    #pattern = []
    get getPattern(){
        return this.#pattern;
    }
    createPattern(){
        this.#pattern.push(Math.floor(Math.random() * 4) + 1);
    }

    sleep (ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runGame(){
        this.createPattern();
        await this.sleep(1000);
        for (let i =0; i < this.#pattern.length; i++){
            if (this.#pattern[i] === 1){
                greenButton.style.background = 'limegreen';
                await this.sleep(1000);
                greenButton.style.background = 'darkgreen';
            }
            else if (this.#pattern[i] === 2) {
                redButton.style.background = 'red';
                await  this.sleep(1000);
                redButton.style.background = 'darkred';
            }
            else if (this.#pattern[i] === 3){
                yellowButton.style.background = 'yellow';
                await this.sleep(1000);
                yellowButton.style.background = '#B58B00';
            }
            else if (this.#pattern[i] === 4){
                blueButton.style.background = 'blue';
                await this.sleep(1000);
                blueButton.style.background = 'darkblue';
            }
            await this.sleep(1000);//pause btw lights in case we get the same button consecutively
        }
    }
}

class User{
    pattern = [];

    continue = false;
    isAButtonOn = false;
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    comparePattern(computersPattern){
        for (let i = 0; i < computersPattern.length; i++){
            console.log(computersPattern[i] + ' ==> ' +this.pattern[i]);
            if (computersPattern[i] !== this.pattern[i]){
                console.log('wrong button')
                return false;
            }
        }
        return true;
    }

    /*async play(computersPattern){
        let rightPattern;

        await greenButton.addEventListener('click',  async () => {
            if(!this.isAButtonOn){
                this.isAButtonOn = true;
                greenButton.style.background = 'limegreen';
                this.pattern.push(1);
                await this.sleep(1000);
                greenButton.style.background = 'darkgreen';
            }
            this.isAButtonOn = false;
            rightPattern = this.comparePattern(computersPattern);
        });

        await redButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                redButton.style.background = 'red';
                this.pattern.push(2);
                await this.sleep(1000);
                redButton.style.background = 'darkred';
            }
            this.isAButtonOn = false;
            rightPattern = this.comparePattern(computersPattern);
        });

        await yellowButton.addEventListener('click', async ()=> {
            if (!this.isAButtonOn){
                this.isAButtonOn = true;
                yellowButton.style.background = 'yellow';
                this.pattern.push(3);
                await this.sleep(1000);
                yellowButton.style.background = '#B58B00';
            }
            this.isAButtonOn = false;
            rightPattern = this.comparePattern(computersPattern);
        });

        await blueButton.addEventListener('click', async ()=> {
            if (!this.isAButtonOn){
                this.isAButtonOn = true;
                blueButton.style.background = 'blue';
                this.pattern.push(4);
                await this.sleep(1000);
                blueButton.style.background = 'darkblue';
            }
            this.isAButtonOn = false;
            rightPattern = this.comparePattern(computersPattern);
        });

        return rightPattern;
    }*/
}

class Simon{

    constructor() {
        this.computer = new Computer();
        this.user = new User();
    }
    playing = true;
    computersTurn = true;
    usersTurn = false;
    computer = new Computer();
    user = new User();
    continueGame = false;

    async startGame() {
        await this.computer.runGame();

        console.log('users turn')
        greenButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                greenButton.style.background = 'limegreen';
                this.user.pattern.push(1);
                greenButton.style.background = 'darkgreen';
            }
            this.isAButtonOn = false;
            this.continueGame = this.user.comparePattern(this.computer.getPattern);
            if (this.continueGame) {
                await this.startGame()
            } else {
                console.log('game over')
            }
        });

        redButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                redButton.style.background = 'red';
                this.user.pattern.push(2);
                redButton.style.background = 'darkred';
            }
            this.isAButtonOn = false;
            this.continueGame = this.user.comparePattern(this.computer.getPattern);
            if (this.continueGame) {
                await this.startGame();
            } else {
                console.log('game over')
            }
        });

        yellowButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                yellowButton.style.background = 'yellow';
                this.user.pattern.push(3);
                yellowButton.style.background = '#B58B00';
            }
            this.isAButtonOn = false;
            this.continueGame = this.user.comparePattern(this.computer.getPattern);
            if (this.continueGame) {
                await this.startGame()
            } else {
                console.log('game over')
            }
        });

        blueButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                blueButton.style.background = 'blue';
                this.user.pattern.push(4);
                blueButton.style.background = 'darkblue';
            }
            this.isAButtonOn = false;
            this.continueGame = this.user.comparePattern(this.computer.getPattern);
            if (this.continueGame) {
                await this.startGame()
            } else {
                console.log("game over")
            }
        });

    }
}

//simon = new Computer;
//simon.runGame();
//user = new User;
//user.play(simon.getPattern);

simon = new Simon();
simon.startGame().then(r => {});
