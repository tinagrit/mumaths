document.querySelector('#chooseModeBtn>.desc').innerHTML = `${lang.gamemode.ModeSmall}`
document.querySelector('#chooseQuesBtn>.desc').innerHTML = `${lang.gamemode.QuestionSmall}`
document.querySelector('#chooseDigitBtn>.desc').innerHTML = `${lang.gamemode.DigitSmall}`



document.querySelector('#chooseModeBtn>h1').innerHTML = questionSVG
document.getElementById('chooseModeBtn').addEventListener('click',()=>{openTyper(gameModeTyper)});

document.querySelector('#chooseQuesBtn>h1').innerHTML = '10'
document.getElementById('chooseQuesBtn').addEventListener('click',()=>{openTyper(questionTimeTyper)});

document.querySelector('#chooseDigitBtn>h1').innerHTML = '1-2'
document.getElementById('chooseDigitBtn').addEventListener('click',()=>{openTyper(digitsTyper)});