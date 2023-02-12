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
}

class Simon{

    constructor() {
        this.computer = new Computer();
        this.user = new User();
    }

    gameOver = false;

    async startGame() {
        //if (this.gameOver) return;
        await this.computer.runGame();
        let expectedColors = [...this.computer.getPattern]
        console.log('Expected colors: ', expectedColors);

        console.log('users turn')
        greenButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                greenButton.style.background = 'limegreen';
                this.user.pattern.push(1);
                greenButton.style.background = 'darkgreen';
            }
            this.isAButtonOn = false;
            let expectedColor = expectedColors.shift();
            if (expectedColor){
                if (expectedColors.length === 0){
                    await this.startGame();
                }
            }
            else{
                console.log('game over green')
                this.gameOver = true;
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
            let expectedColor = expectedColors.shift();
            if (expectedColor===2){
                if (expectedColors.length === 0){
                    await this.startGame();
                }
            }
            else{
                console.log('game over red')
                this.gameOver = true;
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
            let expectedColor = expectedColors.shift();
            if (expectedColor===3){
                if (expectedColors.length === 0){
                    await this.startGame();
                }
            }
            else{
                console.log('game over yellow')
                this.gameOver = true;
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
            let expectedColor = expectedColors.shift();
            if (expectedColor===4){
                if (expectedColors.length === 0){
                    await this.startGame();
                }
            }
            else{
                console.log('game over blue')
                this.gameOver = true;
            }
        });

    }
}


simon = new Simon();
simon.startGame().then(r => {});
