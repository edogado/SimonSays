let score  = document.getElementById('score');
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');


class Simon{
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

    static isAButtonOn = false;
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    play(){

        greenButton.addEventListener('click', async () => {
            if(!this.isAButtonOn){
                this.isAButtonOn = true;
                greenButton.style.background = 'limegreen';
                this.pattern.push(1);
                await this.sleep(1000);
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
            blueButton.style.background = 'blue';
            this.pattern.push(4);
            await this.sleep(1000);
            blueButton.style.background = 'darkblue';
        });
    }
}

simon = new Simon;
user = new User;
user.play();

