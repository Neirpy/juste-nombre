import {choiceDifficulty} from "./timer.js";

const random = (max)=>{
    return Math.floor(Math.random()*max);
}

let game={
    score:1,
    name: "",
    win:false,
    time:undefined,
    countdown:undefined,
    justeNumber:random(99),
    displayScore: document.getElementById("score"),
    timer: document.getElementById("timer"),
    restart :document.getElementById("restart"),
    numberForm:document.getElementById("numberForm"),
    choice:document.querySelector(".choice"),
    validateNumber() {
        this.start();
        let submit = document.getElementById("submit");
        submit.addEventListener("click", this.checkNumber);
    },
    calcScore(){
        game.score++;
        this.displayScore.innerText ="Score : "+game.score;
    },
    checkNumber() {
        let number = document.getElementById("numberInput").value;
        if (number < 1 || number > 100) {
            alert("Le number doit être compris entre 1 et 100");
        }
        else {
            let message = document.getElementById("result");
            number=parseInt(number);
            console.log(game.justeNumber);
            document.getElementById("numberInput").value = "";
            if (number===game.justeNumber){
                game.victory();
            }
            else if (number<game.justeNumber){
                message.innerHTML="C'est plus";
                game.calcScore();
            }
            else if (number>game.justeNumber){
                message.innerHTML="C'est moins";
                game.calcScore();
            }
        }
    },

    getName(){
        let submitName = document.getElementById("submitName");
        let nameInput = document.getElementById("nameInput");
        submitName.addEventListener("click", () => {
            this.name = nameInput.value;
            game.save();
            game.reset();
        })
    },

    showGameMenu(){
        document.getElementById("numberForm").classList.remove("form-hide");
    },

    showNameMenu() {
        document.getElementById("numberForm").classList.add("form-hide");
        document.getElementById("nameForm").classList.remove("form-hide");   
    },

    save(){
        let liste_score = (JSON.parse(localStorage.getItem("list")) || []);
        liste_score.push({name:this.name, score:this.score, time:this.time});
        localStorage.setItem("list", JSON.stringify(liste_score));
        },

    reset() {
        game.restart.classList.add("form-hide");
        document.getElementById("nameForm").classList.add("form-hide");
        game.timer.innerText = "";
        game.displayScore.innerText = "";
        game.score = 1;
        game.win=false;
        game.choice.classList.remove("form-hide");
        game.justeNumber=random(99);
        document.getElementById("submit").disabled = false;
        document.getElementById("result").innerHTML="";
        let parent=document.getElementById("result").parentNode;
        parent.classList.remove("victory");
        choiceDifficulty();
    },

    victory(){
        document.getElementById("submit").disabled = true;
        game.win=true;
        let message = document.getElementById("result");
        message.innerHTML="C'est gagné ! Vous avez trouvé le number en "+game.score+" coups";
        let parent=message.parentNode;
        parent.classList.add("victory");
        clearInterval(game.countdown);
        game.showNameMenu();
        game.getName();
    },
    defeat(){
        document.getElementById("submit").disabled = true;
        let message = document.getElementById("result");
        message.innerHTML="C'est perdu ! Vous avez perdu en "+game.score+" coups";
        game.numberForm.classList.add("form-hide");
        game.restart.classList.remove("form-hide");
        game.restart.addEventListener("click", ()=>{
            game.reset();
        });
    },


    start(){
        choiceDifficulty();
        start.addEventListener("click", ()=>{
            this.displayScore.innerText="Score : "+game.score;
            game.time=game.timer.innerText;
            game.startTimer=true;
            console.log(game.startTimer);
            console.log(game.time);
            if (game.time==="" ) {
                alert("Veuillez choisir une difficulté");
            }
            else{
                game.choice.classList.add("form-hide");
                this.showGameMenu();
                const timerElement = game.timer;
                game.countdown =setInterval(function count() {
                    timerElement.innerText = `${game.time}`
                    if (game.time <= 0){
                        if(!game.win) {
                            game.defeat();
                            clearInterval(game.countdown);
                        }
                    }
                    else {
                        game.time--;
                    }

                }, 1000)

            }
        });
    }
}

game.validateNumber();
