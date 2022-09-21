function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start() {
    _('.getready').css('opacity','0')

    setTimeout(function () {
        _('.getready').css('display','none')
        fn();
        nextQuestion();
    }, 500)
}


// onload

_('.getready').css('opacity','1')


let questionValue,digitValue,themeValue,themeString,negative;


const params = window.location.search;
const urlParams = new URLSearchParams(params);

if (params == '' || null) {
    questionValue = '10';
    digitValue = '3';
    themeValue = '1';
    negative = null;
} else {
    questionValue = urlParams.get('questions');
    digitValue = urlParams.get('digits');
    themeValue = urlParams.get('type');
    negative = urlParams.get('negative');
}

if (questionValue == '' || null) {
    questionValue = '10';
}

if (digitValue == '' || null) {
    digitValue = '3';
}

if (themeValue == '' || null) {
    themeValue = '1';
}

if (negative == '' || undefined) {
    negative = null;
}


questionValue = Number(questionValue);
digitValue = Number(digitValue);
themeValue = Number(themeValue);



if (questionValue < 0 || isNaN(questionValue)) {
    questionValue = '10'
}

if (digitValue > 7 || digitValue < 1 || isNaN(digitValue)) {
    digitValue = 3;
}

if (themeValue > 5 || themeValue < 1 || isNaN(themeValue)) {
    themeValue = 1;
}

function makePlural(word,val) {
    return (val==1) ? word : word + 's';
}


let startState = false;
let seconds = 0;
let startButton = document.querySelector('.buttonStart')
let questions = 0;
let skippedQuestion = 0;
startButton.addEventListener('click', start)
document.querySelector('.buttonExit').addEventListener('click', function() {
    window.location.href = '.'
})
document.querySelector('.buttonTryAgain').addEventListener('click', function() {
    location.reload();
})

let digitString;
switch(digitValue) {
    case 1:
        digitString = '1';
        break
    case 2:
        digitString = '1-2';
        break
    case 3:
        digitString = '2';
        break
    case 4:
        digitString = '2-3';
        break
    case 5:
        digitString = '3';
        break
    case 6:
        digitString = '3-4';
        break
    case 7:
        digitString = '4';
        break
}

switch(themeValue) {
    case 1 : themeString = 'addition'; break;
    case 2 : themeString = 'subtraction'; break;
    case 3 : themeString = 'multiplication'; break;
    case 4 : themeString = 'division'; break;
    case 5 : themeString = 'shuffle'; break;
}


document.querySelector('.description').innerHTML = 'You will be asked ' + comma(questionValue) + ' '+ makePlural('question',questionValue) +', all about '+themeString+', in ' + digitString + ' ' + makePlural('digit',digitValue);

if (themeValue ==5) {
    document.querySelector('.description').innerHTML = 'You will be asked ' + comma(questionValue) + ' '+ makePlural('question',questionValue)+', in shuffle, in ' + digitString + ' ' + makePlural('digit',digitValue);
}

let timer = null;


function fn() {
    timer = setTimeout(function () {
        seconds++;
        console.info(seconds + " seconds have passed")
        fn()
    }, 1000)



}

let firstNumber,secondNumber,tempNumber,answer,divider;

function divisible(f,s) {
    var firstRandomNumber = Math.floor(Math.random() * ((10 ** f) - (10 ** (f-1))) + (10 ** (f-1))) + 1;
    var secondRandomNumber = Math.floor(Math.random() * ((10 ** s) - (10 ** (s-1))) + (10 ** (s-1))) + 1;
    if (firstRandomNumber % secondRandomNumber === 0) {
      return [firstRandomNumber , secondRandomNumber];
    }
}

function randomit(x) {
    switch(x) {
        case 1:
            return Math.floor(Math.random() * 10);
        case 2:
            return Math.floor(Math.random() * 100);
        case 3:
            return Math.floor(Math.random() * (100 - 10) + 10);
        case 4:
            return Math.floor(Math.random() * (1000 - 10) + 10)
        case 5:
            return Math.floor(Math.random() * (1000 - 100) + 100)
        case 6:
            return Math.floor(Math.random() * (10000 - 100) + 100)
        case 7:
            return Math.floor(Math.random() * (10000 - 1000) + 1000)
    }
}

function nextQuestion() {
    if (questions < questionValue) {
        
        if (themeValue == 5) {
            operation = Math.floor(Math.random()*4) + 1 ;
        } else {
            operation = themeValue;
        }


        

        questions++;
        document.querySelector('#questionNumber').innerHTML = 'Question ' + comma(questions) + ' of ' + comma(questionValue);

        if (operation == 3) {
            switch(digitValue) {
                case 2: firstNumber = randomit(3);
                        secondNumber = randomit(1);
                        break;
                case 4: firstNumber = randomit(5);
                        secondNumber = randomit(3);
                        break;
                case 6: firstNumber = randomit(7);
                        secondNumber = randomit(5);
                        break;
            }
        }
        
        if ((operation == 1 || operation == 2) || ((operation == 3)&&(digitValue == 1 || digitValue == 3 || digitValue == 5 || digitValue == 7))) {
            firstNumber = randomit(digitValue);
            secondNumber = randomit(digitValue);
        }

        if (operation == 4) {
            divider = null;
            switch(digitValue) {
                case 1: {
                    while(!divider) divider = divisible(1,1);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }
                case 2: {
                    while(!divider) divider = divisible(2,1);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }
                case 3: {
                    while(!divider) divider = divisible(2,2);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }
                case 4: {
                    while(!divider) divider = divisible(3,2);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }
                case 5: {
                    while(!divider) divider = divisible(3,3);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }
                case 6: {
                    while(!divider) divider = divisible(4,3);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }
                case 7: {
                    while(!divider) divider = divisible(4,4);
                    firstNumber = divider[0];
                    secondNumber = divider[1];
                    break;
                }   
            }
        }

        
        
        if (firstNumber.toString().length < secondNumber.toString().length) {
            tempNumber = firstNumber;
            firstNumber = secondNumber;
            secondNumber = tempNumber;
        }

        if ((operation == 2) && (!negative)) {
            if (firstNumber < secondNumber) {
                tempNumber = firstNumber;
                firstNumber = secondNumber; 
                secondNumber = tempNumber;
            }
        }

        if        (operation == '1') {
            answer = firstNumber + secondNumber;
            _('.question .symbol').innerHTML = '+';  
            _('.showondiv').css('display','none');
            _('.hideondiv').css('display','block'); 
            _('.question h1').css('text-align','right')            
        } else if (operation == '2') {
            answer = firstNumber - secondNumber;
            _('.question .symbol').innerHTML = '-'; 
            _('.showondiv').css('display','none');
            _('.hideondiv').css('display','block');
            _('.question h1').css('text-align','right')
        } else if (operation == '3') {
            answer = firstNumber * secondNumber;
            _('.question .symbol').innerHTML = '×'; 
            _('.showondiv').css('display','none');
            _('.hideondiv').css('display','block');
            _('.question h1').css('text-align','right')
        } else if (operation == '4') {
            answer = firstNumber / secondNumber; 
            _('.question .symbol').innerHTML = '';
            _('.showondiv').css('display','block');
            _('.hideondiv').css('display','none');
            _('.question h1').css('text-align','center')
        }
        
        document.querySelector('#questionMath').innerHTML = comma(firstNumber)  ;
        document.querySelector('#questionMath2').innerHTML = comma(secondNumber)

        _('.question').css('display','flex');

        setTimeout(()=> {
            _('.question').css('opacity','1');
        },1)

        _('.answer').focus();
        
        _('.answer').on('keyup', function () {
            if (this.value == answer) {
                this.value = '';
                console.info('Question ' + questions + ' is done')
                nextQuestion();
            } else if (this.value == '000') {
                this.value = '';
                console.info('Question ' + questions + ' is skipped');
                skippedQuestion++;
                nextQuestion();
            }
        });
    } else {
        userGetScore = questionValue-skippedQuestion;
        if (userGetScore < 0) userGetScore = 0;
        userGetPercent = (userGetScore * 100) / questionValue;

        if (isNaN(userGetPercent)) {
            userGetPercent = 0;
        } else {
            if (userGetPercent % 1 != 0) {
                userGetPercent = userGetPercent.toFixed(2)
            }
        }

        document.querySelector('#wholeScore').innerHTML = 'You got ' + comma(userGetScore) + ' out of ' + comma(questionValue);
        document.querySelector('#whatDigits').innerHTML = 'of ' + digitString + ' ' + makePlural('digit',digitValue) + ' '+ themeString +' within'
        document.querySelector('#percentScore').innerHTML = userGetPercent + '%';
        


        done();
    }



}

function done() {
    clearTimeout(timer);
    timer = null;
    console.info("Finished at " + seconds + " seconds");
    document.querySelector('#secondScore').innerHTML = comma(seconds) + ' seconds';
    _('.question').css('opacity','0');
    setTimeout(function() {
        _('.question').css('display','none'); 
        _('.score').css('display','block');
        if (document.querySelector('.template__anno')) {
            _('.template__anno').css('display','block');
        }
        _('#in').css('display','block');
        showresult();
        }
    , 500)
    
}

function showresult() {
    setTimeout(()=>{     
        _('.score').css('opacity','1');
    },500)
}
