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
            await this.sleep(1000).then( () => {});
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
                return false;
            }
        }
        return true;
    }

    /*async play(computersPattern){
        greenButton.addEventListener('click',  () => {
            if(!this.isAButtonOn){
                this.isAButtonOn = true;
                greenButton.style.background = 'limegreen';
                this.pattern.push(1);
                this.sleep(1000);
                greenButton.style.background = 'darkgreen';
            }
            this.isAButtonOn = false;
        });

        redButton.addEventListener('click', async () => {
            if (!this.isAButtonOn) {
                this.isAButtonOn = true;
                redButton.style.background = 'red';
                this.pattern.push(2);
                await this.sleep(1000);
                redButton.style.background = 'darkred';
            }
            this.isAButtonOn = false;
        });

        yellowButton.addEventListener('click', async ()=> {
            if (!this.isAButtonOn){
                this.isAButtonOn = true;
                yellowButton.style.background = 'yellow';
                this.pattern.push(3);
                await this.sleep(1000);
                yellowButton.style.background = '#B58B00';
            }
            this.isAButtonOn = false;
        });

        blueButton.addEventListener('click', async ()=> {
            if (!this.isAButtonOn){
                this.isAButtonOn = true;
                blueButton.style.background = 'blue';
                this.pattern.push(4);
                await this.sleep(1000);
                blueButton.style.background = 'darkblue';
            }
            this.isAButtonOn = false;
        });
        return this.comparePattern(computersPattern)
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

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async startGame() {
        while (this.playing) {
            while (this.computersTurn) {
                await this.computer.runGame();
                console.log('Ran computer')
                this.computersTurn = false;
                console.log('computer ended')
                this.usersTurn = true;
                console.log('user is enabled')
            }

        }
        console.log('Game Over')
    }
}

//simon = new Computer;
//simon.runGame();
//user = new User;
//user.play(simon.getPattern);

simon = new Simon();
simon.startGame().then(r => console.log('nah'));
