

const emailGameInterface = document.getElementById("emailGameInterface")
const emailLossInterface = document.getElementById("emailLoss")
const emailSuccessInterface = document.getElementById("emailSuccess")
const emailBeyInterface = document.getElementById("emailBeyInterface")
const gameInterface = document.getElementById("game")
const authInterface = document.getElementById("authentication")
let btnAuthentication = document.getElementById("authValidation")
let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("password")



if(localStorage.getItem("email")) {
    authInterface.style.display = "none"
    gameInterface.style.display = "block"
    emailGameInterface.innerHTML = localStorage.getItem("email")
    emailLossInterface.innerHTML = localStorage.getItem("email")
    emailSuccessInterface.innerHTML = localStorage.getItem("email")
    emailBeyInterface.innerHTML = localStorage.getItem("email") 
}

btnAuthentication.addEventListener("click", (event) =>{
    event.preventDefault()
    // showName()
    let email = emailInput.value
    let password = passwordInput.value
    if (email && password) {
        fetch("https://reqres.in/api/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json", 
            },
            body : JSON.stringify({
                email : email,
                password: password,
            }),
        } )
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if (result.token) {
                authInterface.style.display = "none"
                gameInterface.style.display = "block"
                localStorage.setItem("email", emailInput.value)
                emailGameInterface.innerHTML = emailInput.value
                emailLossInterface.innerHTML = emailInput.value
                emailSuccessInterface.innerHTML = emailInput.value
                emailBeyInterface.innerHTML = emailInput.value
            } else if (result.error) {
                alert(result.error)
            }
        })
    }
})

//variables to get the labels + radio buttons + div of game rules + game instuctions
let easyLabel = document.getElementById("easy")
let mediumLabel  = document.getElementById("medium")
let difficultLabel  = document.getElementById("difficult")
let easyInput = document.getElementById("facile")
let mediumInput = document.getElementById("moyen")
let difficultInput = document.getElementById("difficile")
let instructionEasy = document.getElementById("instructionEasy")
let instructionMedium = document.getElementById("instructionMedium")
let instructionDifficult = document.getElementById("instructionDifficult")
let levelMessage = document.getElementById("chooseLevel")

//functions changing the style of a label, showing the game rules and generating a random number
const labelEasy = () =>{
    easyLabel.style.color = "#00FF00"
    easyLabel.style.fontWeight = "bold"
    mediumLabel.style.color = "#CCFF00"
    mediumLabel.style.fontWeight = "normal"
    difficultLabel.style.color = "#CCFF00"
    difficultLabel.style.fontWeight = "normal"
}

const ruleEasy = () =>{
    instructionEasy.style.display = "block"
    instructionMedium.style.display = "none"
    instructionDifficult.style.display = "none"
    levelMessage.style.display = "none"
}

const randomNumber = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let nbr;
easyInput.addEventListener("click", (event)=>{
    nbr = randomNumber(1, 10)
    console.log(nbr)
    labelEasy()
    ruleEasy()
})

const labelMedium = () =>{
    mediumLabel.style.color = "#00FF00"
    mediumLabel.style.fontWeight = "bold"
    easyLabel.style.color = "#CCFF00"
    easyLabel.style.fontWeight = "normal"
    difficultLabel.style.color = "#CCFF00"
    difficultLabel.style.fontWeight = "normal"
}

const ruleMedium = () =>{
    instructionMedium.style.display = "block"
    instructionEasy.style.display = "none"
    instructionDifficult.style.display = "none"
    levelMessage.style.display = "none"
}

mediumInput.addEventListener("click", (event)=>{
    nbr = randomNumber(10, 100)
    console.log(nbr)
    labelMedium()
    ruleMedium()
})

const labelDifficult = ()=>{
    difficultLabel.style.color = "#00FF00"
    difficultLabel.style.fontWeight = "bold"
    easyLabel.style.color = "#CCFF00"
    easyLabel.style.fontWeight = "normal"
    mediumLabel.style.color = "#CCFF00"
    mediumLabel.style.fontWeight = "normal"
}

const ruleDifficult = ()=>{
    instructionDifficult.style.display = "block"
    instructionMedium.style.display = "none"
    instructionEasy.style.display = "none"
    levelMessage.style.display = "none"
}

difficultInput.addEventListener("click", (event)=>{
    nbr = randomNumber(100, 1000)
    console.log(nbr)
    labelDifficult()
    ruleDifficult()
})

// variables to get different messages + input value
let wrongNumber = document.getElementById("errorMessage")
let triesMessage = document.getElementById("nbrOfTries")
let inputValue = document.getElementById("inputNumber")
let lossInterface = document.getElementById("loss")
let successInterface = document.getElementById("success")
let validNbrMessage1 = document.getElementById("easyValidNbr")
let validNbrMessage2 = document.getElementById("mediumValidNbr")
let validNbrMessage3 = document.getElementById("difficultValidNbr")
let nbrEasyPoint = document.getElementById("nbrEasyPoint")
let nbrEasyTries = document.getElementById("nbrEasyTries")
let nbrMediumPoint = document.getElementById("nbrMediumPoint")
let nbrMediumTies = document.getElementById("nbrMediumTies") 
let nbrDifficultPoint = document.getElementById("nbrDifficultPoint")
let nbrDifficultTries = document.getElementById("nbrDifficultTries")
let totalScore = document.getElementById("score")
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;


// functions to play the game

if(localStorage.getItem("score")) {
    totalScore.innerHTML = localStorage.getItem("score");
}

let countEasy = 3
const playEasyLevel = () =>{
    if (inputValue.value >= 1 && inputValue.value <= 10){
        if (!(inputValue.value == nbr) && easyInput.checked){
            if (countEasy > 1){
                countEasy--;
                mediumInput.disabled = true;
                difficultInput.disabled = true;
                wrongNumber.style.display = "block";
                instructionEasy.style.display = "none";
                levelMessage.style.display = "none";
                triesMessage.innerHTML = `Il vous reste ${countEasy} essais`;
            } else {
                lossInterface.style.display = "block"
                gameInterface.style.display = "none"
                authInterface.style.display = "none"
            }
        } else if (inputValue.value == nbr && easyInput.checked){
            successInterface.style.display = "block"
            gameInterface.style.display = "none"
            authInterface.style.display = "none"
            score++;
            totalScore.innerHTML = score
            localStorage.setItem("score", score)
        }
    } else {
        instructionEasy.style.display = "block"
        validNbrMessage1.style.color = "red"
        nbrEasyPoint.style.display = "none"
        nbrEasyTries.style.display = "none"
        wrongNumber.style.display = "none"
        triesMessage.innerHTML = `Il vous reste ${countEasy} essais`
    }
    
}

let countMedium = 5
const playMediumLevel = () =>{
    if (inputValue.value >= 10 && inputValue.value <= 100){
        if(!(inputValue.value == nbr) && mediumInput.checked ){
            if (countMedium >1){
                countMedium--
                easyInput.disabled = true
                difficultInput.disabled = true
                wrongNumber.style.display = "block"
                instructionMedium.style.display = "none"
                levelMessage.style.display = "none"
                triesMessage.innerHTML = `Il vous reste ${countMedium} essais`
            } else {
                lossInterface.style.display = "block"
                gameInterface.style.display = "none"
                authInterface.style.display = "none"
            }
        } else if (inputValue.value == nbr && mediumInput.checked){
            successInterface.style.display = "block"
            gameInterface.style.display = "none"
            authInterface.style.display = "none"
            score = score+3
            totalScore.innerHTML = score
            localStorage.setItem("score", score)
        }
    } else {
        instructionMedium.style.display = "block"
        validNbrMessage2.style.color = "red"
        nbrMediumPoint.style.display = "none"
        nbrMediumTies.style.display = "none"
        wrongNumber.style.display = "none"
        triesMessage.innerHTML = `Il vous reste ${countMedium} essais`
    }
}

let countDifficult = 10
const playDifficultLevel = () =>{
    if (inputValue.value >= 100 && inputValue.value <= 1000) {
        if (!(inputValue.value == nbr) && difficultInput.checked) {
            if (countDifficult > 1) {
                countDifficult--
                easyInput.disabled = true
                mediumInput.disabled = true
                wrongNumber.style.display = "block"
                instructionDifficult.style.display = "none"
                levelMessage.style.display = "none"
                triesMessage.innerHTML = `Il vous reste ${countDifficult} essais`
            } else {
                lossInterface.style.display = "block"
                gameInterface.style.display = "none"
                authInterface.style.display = "none"
            }
        } else if (inputValue.value == nbr && difficultInput.checked){
            successInterface.style.display = "block"
            gameInterface.style.display = "none"
            authInterface.style.display = "none"
            score = score+5
            totalScore.innerHTML = score
            localStorage.setItem("score", score)
        }
    } else {
        instructionDifficult.style.display = "block"
        validNbrMessage3.style.color = "red"
        nbrDifficultPoint.style.display = "none"
        nbrDifficultTries.style.display = "none"
        wrongNumber.style.display = "none"
        triesMessage.innerHTML = `Il vous reste ${countDifficult} essais`
    }
    
}

const errorMessage = () =>{
    if (inputValue.value == "" && !(easyInput.checked || mediumInput.checked || difficultInput.checked)){
        levelMessage.style.display = "block"
        levelMessage.style.color = "red"
    } else if (inputValue.value == "" && easyInput.checked) {
        validNbrMessage1.style.display = "block"
        validNbrMessage1.style.color = "red"
        levelMessage.style.display = "none"
    } else if (inputValue.value == "" && mediumInput.checked) {
        validNbrMessage2.style.display = "block"
        validNbrMessage2.style.color = "red"
        levelMessage.style.display = "none"
    } else if (inputValue.value == "" && difficultInput.checked) {
        validNbrMessage3.style.display = "block"
        validNbrMessage3.style.color = "red"
        levelMessage.style.display = "none"
    } 
}

document.getElementById("play").addEventListener("click", (event)=>{
    event.preventDefault()
    errorMessage()
    if (easyInput.checked == true){
        playEasyLevel()
    }
    if (mediumInput.checked == true){
        playMediumLevel()
    }
    if (difficultInput.checked){
        playDifficultLevel()
    }
})

// functions to stop the game in the loss or success interface
let beyInterface = document.getElementById("goodBey")
const goodBey = (event) =>{
    event.preventDefault()
    successInterface.style.display = "none"
    lossInterface.style.display = "none"
    beyInterface.style.display = "block"
}

document.getElementById("noLoss").addEventListener("click", goodBey)
document.getElementById("noSuccess").addEventListener("click", goodBey)

const restart = (event) =>{
    event.preventDefault()
    location.reload(gameInterface)
}
document.getElementById("yesLoss").addEventListener("click", restart)
document.getElementById("yesSuccess").addEventListener("click", restart)



