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
        await this.sleep(1000).then(()=> {})
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

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    play(){
        greenButton.addEventListener('click', async () => {
            greenButton.style.background = 'limegreen';
            await this.sleep(1000);
            greenButton.style.background = 'darkgreen';
        });

        redButton.addEventListener('click', async () => {
            redButton.style.background = 'red';
            await  this.sleep(1000);
            redButton.style.background = 'darkred';
        });

        yellowButton.addEventListener('click', async ()=> {
            yellowButton.style.background = 'yellow';
            await this.sleep(1000);
            yellowButton.style.background = '#B58B00';
        });

    }
}

simon = new Simon;
user = new User;
user.play();

console.log(simon.getPattern);
