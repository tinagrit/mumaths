document.querySelector('#chooseModeBtn>.desc').innerHTML = `${lang.gamemode.ModeSmall}`
document.querySelector('#chooseQuesBtn>.desc').innerHTML = `${lang.gamemode.QuestionSmall}`
document.querySelector('#chooseDigitBtn>.desc').innerHTML = `${lang.gamemode.DigitSmall}`


document.querySelector('#chooseModeBtn>h1').innerHTML = questionSVG
document.getElementById('chooseModeBtn').addEventListener('click',()=>{openTyper(gameModeTyper)});

document.querySelector('#chooseQuesBtn>h1').innerHTML = '10'
document.getElementById('chooseQuesBtn').addEventListener('click',()=>{openTyper(questionTimeTyper)});

document.querySelector('#chooseDigitBtn>h1').innerHTML = '1-2'
document.getElementById('chooseDigitBtn').addEventListener('click',()=>{openTyper(digitsTyper)});

let calculationMode = 'addition';
let calculationEnds = 'question';
let calculationQues = 10;
let calculationDigits = '1-2';
let calculationInProgress = false;

const changeCalculationMode = (to) => {
    if (!calculationInProgress) {
        calculationMode = to;

        if (document.querySelector(`#chooseoper a.active`)) {
            document.querySelector(`#chooseoper a.active`).classList.remove('active')
        }
    
        if (document.querySelector(`#chooseoper a[data-menu='${to}']`)) {
            document.querySelector(`#chooseoper a[data-menu='${to}']`).classList.add('active')
        }
    }
}

document.querySelector(`#chooseoper a[data-menu='addition']`).addEventListener('click',()=>{changeCalculationMode('addition')})
document.querySelector(`#chooseoper a[data-menu='subtraction']`).addEventListener('click',()=>{changeCalculationMode('subtraction')})
document.querySelector(`#chooseoper a[data-menu='multiplication']`).addEventListener('click',()=>{changeCalculationMode('multiplication')})
document.querySelector(`#chooseoper a[data-menu='division']`).addEventListener('click',()=>{changeCalculationMode('division')})
document.querySelector(`#chooseoper a[data-menu='shuffle']`).addEventListener('click',()=>{changeCalculationMode('shuffle')})