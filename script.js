var userScore = 0;
var compScore = 0;
var rnd = 1;
var selectedRounds=false;
const display_rnd = document.querySelector("#display-round");
const userScore_span = document.querySelector("#user-score");
const computerScore_span = document.querySelector("#computer-score");
const result_div = document.querySelector("#final_result");
const user_result = document.querySelector("#user_choice_result");
const comp_result = document.querySelector("#comp_choice_result");
const rock_div = document.querySelector("#r");
const paper_div = document.querySelector("#p");
const scissors_div = document.querySelector("#s");

display_rnd.innerHTML = localStorage.getItem("LOCAL_SAVE_ROUND")? `${localStorage.getItem("LOCAL_SAVE_ROUND")}`:''

if (localStorage.getItem("LOCAL_SAVE_USCORE") || localStorage.getItem("LOCAL_SAVE_CSCORE")) {
    userScore = localStorage.getItem("LOCAL_SAVE_USCORE")
    userScore_span.innerHTML = userScore
    compScore = localStorage.getItem("LOCAL_SAVE_CSCORE")
    computerScore_span.innerHTML = compScore;
}
rock_div.addEventListener('click',function(){
    if(!selectedRounds){
        alert("Kindly select the rounds first!");
    }
});
paper_div.addEventListener('click',function(){
    if(!selectedRounds){
    alert("Kindly select the rounds first!");
    }
});
scissors_div.addEventListener('click',function(){
    if(!selectedRounds){
    alert("Kindly select the rounds first!");
    }
});

function computerChoice() {
    const arr = ["r", "p", "s"];
    return arr[Math.floor(Math.random() * 3)];
}

function win(userChoice, comp_choice) {
    userScore++;
    result_div.innerHTML = "You Won!!!";
    document.getElementById(userChoice).classList.add("green-glow");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("green-glow") }, 1000);
    console.log("User Choice : " + userChoice + " Computer Choice : " + comp_choice + "\n");
    console.log("User Score : " + userScore + " Computer Score : " + compScore + "\n");
    console.log("User Won!!");
    console.log(rnd);
    display_rnd.innerHTML = rnd;
    saveScore(userScore, compScore,rnd)
}

function lose(userChoice, comp_choice) {
    compScore++;
    result_div.innerHTML = "Computer Won!!!";
    document.getElementById(userChoice).classList.add("red-glow");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("red-glow") }, 1000);
    console.log("User Choice : " + userChoice + " Computer Choice : " + comp_choice + "\n");
    console.log("User Score : " + userScore + " Computer Score : " + compScore + "\n");
    console.log("Computer Won!!");
    console.log(rnd);
    display_rnd.innerHTML = rnd;
    saveScore(userScore, compScore,rnd)
}

function draw(userChoice, comp_choice) {
    result_div.innerHTML = "It's a Draw!!";
    document.getElementById(userChoice).classList.add("blue-glow");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("blue-glow") }, 1000);
    console.log("User Choice : " + userChoice + " Computer Choice : " + comp_choice + "\n");
    console.log("User Score : " + userScore + " Computer Score : " + compScore + "\n");
    console.log("Draw!!");
    console.log(rnd);
    display_rnd.innerHTML = rnd;
    saveScore(userScore, compScore,rnd)
}

function resetRounds(){
    localStorage.setItem("LOCAL_SAVE_USCORE", 0)
    localStorage.setItem("LOCAL_SAVE_CSCORE", 0)
    localStorage.setItem("LOCAL_SAVE_ROUND", 0)
}


function compare(userChoice, round_num) {
    const comp_choice = computerChoice();
    if (rnd <= round_num) {
        switch (userChoice + comp_choice) {
            case "rs":
            case "pr":
            case "sp":
                win(userChoice, comp_choice);
                break;
            case "sr":
            case "rp":
            case "ps":
                lose(userChoice, comp_choice);
                break;
            case "rr":
            case "pp":
            case "ss":
                draw(userChoice, comp_choice);
                break;
        }
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = compScore;
        const obj = { "r": "Rock", "p": "Paper", "s": "Scissors" };
        user_result.innerHTML = obj[userChoice];
        comp_result.innerHTML = obj[comp_choice];
    }
    if (rnd == round_num) {
        var str;
        if (userScore < compScore) {
            str = "Computer Won!! You Lost !! Better Luck Next Time 👍";
        }
        else if (userScore > compScore) {
            str = "Congrats You Won!! 😄"
        }
        else {
            str = "Its a Draw!! 😃"
        }
        setTimeout(function(){
            document.querySelector("#final").style.display = "block";
            document.querySelector("#game-section").style.display = "none";
            document.querySelector("#final-result").innerHTML = str;
        },1000)
        
        resetRounds();
        return;
    }
}

function move(round_num) {
    if (rnd <= round_num) {
        display_rnd.innerHTML = rnd;
        rock_div.addEventListener("click", function () {
            compare("r", round_num);
            rnd++;
        });
        paper_div.addEventListener("click", function () {
            compare("p", round_num);
            rnd++;
        });
        scissors_div.addEventListener("click", function () {
            compare("s", round_num);
            rnd++;
        });
    }
    if (rnd == round_num) {
        return;
    }
}

function saveScore(uScore, cScore,rounds) {
    localStorage.setItem("LOCAL_SAVE_USCORE", uScore)
    localStorage.setItem("LOCAL_SAVE_CSCORE", cScore)
    localStorage.setItem("LOCAL_SAVE_ROUND", rounds)
}

function selectRound() {
    var round_num = document.querySelector("#round").value;
    if (round_num <= 0) {
        alert("Invalid Choice !!");
        return;
    }
    else {
        alert("Total Rounds selected : " + round_num);
        selectedRounds=true;
        move(round_num);
    }
}

