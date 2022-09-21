function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function start() {
    $('.getready').fadeOut();

    setTimeout(function () {
        fn();
        nextQuestion();
    }, 500)
}


// onload

$('.getready').fadeIn();
let questionValue, digitValue, negativeValue, themeValue;


const params = window.location.search;
console.log(params);
const urlParams = new URLSearchParams(params);

if (params == '' || null) {
    questionValue = '10';
    digitValue = '3';
    themeValue = '1';
} else {
    questionValue = urlParams.get('questions');
    digitValue = urlParams.get('digits');
    negativeValue = urlParams.get('negative');
    themeValue = urlParams.get('theme')
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

if (questionValue < 0) {
    questionValue = '10'
}


questionValue = Number(questionValue);
digitValue = Number(digitValue);
themeValue = Number(themeValue);
negativeValue = negativeValue;


let startState = false;
let seconds = 0;
let startButton = document.querySelector('.buttonStart')
let questions = 0;
let skippedQuestion = 0;
startButton.addEventListener('click', start)
document.querySelector('.buttonExit').addEventListener('click', function () {
    window.location.href = 'https://math.tinagrit.com'
})
document.querySelector('.buttonTryAgain').addEventListener('click', function () {
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

let negativeString;
if (negativeValue == 'true') {negativeString = ', answers could be negative'}
else {negativeString =''}

document.querySelector('.description').innerHTML = 'You will be asked ' + comma(questionValue) + ' questions, all about subtraction, in ' + digitString + ' digits' + negativeString;


let timer = null;


function fn() {
    timer = setTimeout(function () {
        seconds++;
        console.log(seconds + " seconds passed")
        fn()
    }, 1000)



}

function nextQuestion() {
    if (questions < questionValue) {
        questions++;
        document.querySelector('#questionNumber').innerHTML = 'Question ' + comma(questions) + ' of ' + comma(questionValue);


        let firstNumber, secondNumber

        if (negativeValue == 'true') {
            switch (digitValue) {
                case 1:
                    firstNumber = Math.floor(Math.random() * 10);
                    secondNumber = Math.floor(Math.random() * 10);
                    break;
                case 2:
                    firstNumber = Math.floor(Math.random() * 100);
                    secondNumber = Math.floor(Math.random() * 100);
                    break;
                case 3:
                    firstNumber = Math.floor(Math.random() * 90 + 10);
                    secondNumber = Math.floor(Math.random() * 90 + 10);
                    break;
                case 4:
                    firstNumber = Math.floor(Math.random() * (1000 - 10) + 10)
                    secondNumber = Math.floor(Math.random() * (1000 - 10) + 10)
                    break;
                case 5:
                    firstNumber = Math.floor(Math.random() * (1000 - 100) + 100)
                    secondNumber = Math.floor(Math.random() * (1000 - 100) + 100)
                    break;
                case 6:
                    firstNumber = Math.floor(Math.random() * (10000 - 100) + 100)
                    secondNumber = Math.floor(Math.random() * (10000 - 100) + 100)
                    break;
                case 7:
                    firstNumber = Math.floor(Math.random() * (10000 - 1000) + 1000)
                    secondNumber = Math.floor(Math.random() * (10000 - 1000) + 1000)
                    break;
            }
        } else if (negativeValue != 'true') {
            switch (digitValue) {
                case 1:
                    firstRandom = Math.floor(Math.random() * 10);
                    secondRandom = Math.floor(Math.random() * 10);
                    break;
                case 2:
                    firstRandom = Math.floor(Math.random() * 100);
                    secondRandom = Math.floor(Math.random() * 100);
                    break;
                case 3:
                    firstRandom = Math.floor(Math.random() * 90 + 10);
                    secondRandom = Math.floor(Math.random() * 90 + 10);
                    break;
                case 4:
                    firstRandom = Math.floor(Math.random() * (1000 - 10) + 10)
                    secondRandom = Math.floor(Math.random() * (1000 - 10) + 10)
                    break;
                case 5:
                    firstRandom = Math.floor(Math.random() * (1000 - 100) + 100)
                    secondRandom = Math.floor(Math.random() * (1000 - 100) + 100)
                    break;
                case 6:
                    firstRandom = Math.floor(Math.random() * (10000 - 100) + 100)
                    secondRandom = Math.floor(Math.random() * (10000 - 100) + 100)
                    break;
                case 7:
                    firstRandom = Math.floor(Math.random() * (10000 - 1000) + 1000)
                    secondRandom = Math.floor(Math.random() * (10000 - 1000) + 1000)
                    break;
            }

            if (firstRandom >= secondRandom) {
                firstNumber = firstRandom;
                secondNumber = secondRandom
            } else if (secondRandom > firstRandom) {
                secondNumber = firstRandom;
                firstNumber = secondRandom
            }
        }



        answer = firstNumber - secondNumber

        document.querySelector('#questionMath').innerHTML = comma(firstNumber) + ' - ' + comma(secondNumber);


        $('.question').fadeIn();
        $('.answer').on('keyup', function () {
            if (this.value == answer) {
                this.value = '';
                console.log('done doing question ' + questions)
                nextQuestion();
            } else if (this.value == '000') {
                this.value = '';
                console.log('skipped question ' + questions);
                skippedQuestion++;
                nextQuestion();
            }
        });
    } else {
        userGetScore = questionValue - skippedQuestion;
        userGetPercent = (userGetScore * 100) / questionValue

        document.querySelector('#wholeScore').innerHTML = 'You got ' + comma(userGetScore) + ' out of ' + comma(questionValue);
        document.querySelector('#whatDigits').innerHTML = 'of ' + digitString + ' digits substraction within'
        document.querySelector('#percentScore').innerHTML = userGetPercent + '%';



        done();
    }



}

function done() {
    clearTimeout(timer);
    timer = null;
    console.log("done at " + seconds + " seconds");
    document.querySelector('#secondScore').innerHTML = comma(seconds) + ' seconds';
    $('.question').fadeOut();
    setTimeout(function () {
        $('.score').fadeIn();
    }, 500)

}