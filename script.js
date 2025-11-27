const buttons = document.querySelectorAll("button.choice")
const userEle = document.getElementById("user")
const computerEle = document.getElementById("computer")
const result = document.getElementById("result");
const reset = document.getElementById("resetbtn");
const clickSound = new Audio("./music.mp3");
const score = document.getElementById("score")
const score2 = document.getElementById("score2")

const countValue = document.getElementById("count");
countValue.innerHTML = `<p id="roundNumber" class="text-3xl p-5 font-bold"></p>`;
const roundNumber = document.getElementById("roundNumber");

result.style.display = "none";

buttons.forEach(btn => {
    btn.style.display = "none";
});

reset.style.display = "none";
score.style.display = "none"
score2.style.display = "none"




let totalRounds = 0;
let currentRound = 0;
let gameActive = false;

let userScore =0;
let compScore =0

document.getElementById("startGame").addEventListener("click",()=>{
    totalRounds = parseInt(document.getElementById("rounds").value)

    result.style.display = "block";

    buttons.forEach(btn => {
        btn.style.display = "inline-block";
    });


    reset.style.display = "block";
    score.style.display = "block"
    score2.style.display = "block"

    if (!totalRounds || totalRounds <= 0) {
        alert("Enter a valid number of rounds!");
        return;
    }

    userScore = 0;
    compScore = 0;
    currentRound = 1;
    gameActive = true;



    userEle.textContent = userScore;
    computerEle.textContent = compScore;
    result.textContent = "";
    document.getElementById("roundInfo").textContent =
        `Game Started for ${totalRounds} rounds!`;

})


buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(!gameActive){
            alert("Please Start the Game First");
            return;
        }

        
        roundNumber.textContent = "Round Number: "+currentRound;

        
        if(currentRound > totalRounds){
            alert("Game over! Press Start Game to play again.");
            return;
        }

        clickSound.play();

        const resultFinal = play(btn.id, computerPlay());
        result.textContent = resultFinal;

        currentRound++; 

       
        if (currentRound > totalRounds) {
            if (userScore > compScore) {
                result.textContent = "🎉 You are the final winner!";
            } else if (compScore > userScore) {
                result.textContent = "💀 Computer is the final winner!";
            } else {
                result.textContent = "🤝 Final result: It's a tie!";
            }
            gameActive = false;
        }
    });
});



function computerPlay(){
    const choices = ["rock","paper","scissor"]
    const computerResult = Math.floor(Math.random()* choices.length)
    return choices[computerResult];
}


function play(userSel , compSel){
    if(userSel === compSel)
    {
        return "It is a tie";
    }
    else if((userSel === "rock" && compSel === "scissor")||
            (userSel === "paper" && compSel === "rock")||
            (userSel === "scissor" && compSel === "paper"))
{
    userScore++;
    userEle.textContent = userScore
    return `You win! ${userSel} beats ${compSel}!`
    
}
else
{
    compScore++;
    computerEle.textContent = compScore;
    return `You lose! ${compSel} beats ${userSel}!`
}
}

document.getElementById("resetbtn").addEventListener("click",()=>{
    userScore =0;
    compScore =0;
    userEle.textContent = userScore;
    computerEle.textContent = compScore;
    result.textContent = ""
    alert("Reset All")
})


