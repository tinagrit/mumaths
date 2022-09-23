function valurl() {
    if (window.location.href.includes('game.html')) {
        return true
    } else {return false}
}

// detectmobilebrowsers.com's mobile and tablet checker
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fuction of adding comma to every three number digits
function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function of starting
function start() {
    if (startState == true) {
        console.error('The game is already running');
        return true;
    }

    // Hiding the get ready prompt
    _('.getready').css('opacity','0');
    _('.answer').class.add('started');
    _('.answer').placeholder = "";

    // Start the game after for animation
    setTimeout(function () {
        _('.getready').css('display','none')
        fn();
        nextQuestion();
        // console.log('Started')
    }, 300)
}





// onload

// Show the get ready prompt
if (valurl()) _('.getready').css('opacity','1');

// Check if viewport is mobile and apply mobile class
if (valurl()) if (window.mobileAndTabletCheck()) {
    _('.getready').class.add('mobile')
    _('.question').class.add('mobile')
}


let questionValue,digitValue,digitInput,themeValue,themeInput,themeString,negative,autochange,operation;

// Get URL parameters
const params = window.location.search;
const urlParams = new URLSearchParams(params);

configuration = localStorage.getItem('TGMATHS_Config');
configuration = JSON.parse(configuration);


if (valurl()) {
    if (!configuration) {
        // Set default value if parameter is empty
        if (params == '' || null) {
            questionValue = '10';
            digitInput = '2';
            themeInput = 'addition';
            negative = null;
            autochange = "yes";
        } else {
            questionValue = urlParams.get('questions');
            digitInput = urlParams.get('digits');
            themeInput = urlParams.get('mode');
            negative = urlParams.get('negative');
            autochange = urlParams.get('autochange');
        }
    } else {
        questionValue = configuration.questions
        digitInput = configuration.digits
        themeInput = configuration.mode
        negative = configuration.negative
        autochange = configuration.autochange
    }
}



// Set default value if any of the value is empty

if (questionValue == '' || questionValue == null) {
    questionValue = '10';
}

if (digitInput == '' || digitInput == null) {
    digitInput = '2';
}

switch(digitInput) {
    case '1': digitValue = 1; break;
    case '1-2': digitValue = 2; break;
    case '2' : digitValue = 3; break;
    case '2-3': digitValue = 4; break;
    case '3': digitValue = 5; break;
    case '3-4': digitValue = 6; break;
    case '4' : digitValue =7; break;
    default: digitInput = '2'; digitValue = 3; break;
}
digitString = digitInput;

if (themeInput == '' || themeInput == null) {
    themeInput = 'addition';
}

switch(themeInput.toLowerCase()) {
    case 'addition': themeValue = 1; break;
    case 'subtraction': themeValue = 2; break;
    case 'multiplication': themeValue = 3; break;
    case 'division': themeValue = 4; break;
    case 'shuffle': themeValue = 5; break;
    default: themeInput = 'addition'; themeValue=1; break;
}
themeString = themeInput;

if (negative == '' || negative == undefined) {
    negative = null;
}

if (autochange == '' || autochange == undefined || autochange == 'no') {
    autochange = null;
}

// Convert number strings to numbers
questionValue = Number(questionValue);
digitValue = Number(digitValue);
themeValue = Number(themeValue);


// Set default value to invalid/malicious inputs

if (valurl()) if (questionValue < 0 || isNaN(questionValue)) {
    questionValue = '10'
}

if (valurl()) if (digitValue > 7 || digitValue < 1 || isNaN(digitValue)) {
    digitValue = 3;
}

if (valurl()) if (themeValue > 5 || themeValue < 1 || isNaN(themeValue)) {
    themeValue = 1;
}

// Add "s" to the word if value is not 1

function makePlural(word,val) {
    return (val==1) ? word : word + 's';
}

let startState = false;
let finishState = false;
let seconds = 0;
let questions = 0;
let skippedQuestion = 0;


// Assign the start button to the start function
// startButton.addEventListener('click', start)

if (valurl()) document.querySelector('.answer').addEventListener('focus',()=>{
    if (!startState) {
        start()
    }
    setTimeout(() => {window.scrollTo(0,55)}, 50)
})

// Link the exit button to home
if (valurl()) document.querySelector('.buttonExit').addEventListener('click', function() {
    window.location.href = '.'
})

// Link the try again button to refresh
if (valurl()) document.querySelector('.buttonTryAgain').addEventListener('click', function() {
    location.reload();
})

// Set explanation value
if (valurl()) document.querySelector('#descq').innerHTML = comma(questionValue) + ' ' + makePlural('question',questionValue);
if (valurl()) document.querySelector('#desco').innerHTML = capitalizeFirstLetter(themeString);
if (valurl()) document.querySelector('#descd').innerHTML = digitString + ' ' + makePlural('digit',digitValue);

if (valurl()) {
    if (themeString == 'subtraction' && negative) {
        document.querySelector('#descn').style.display = 'list-item';
    }
    
    if (autochange) {
        document.querySelector('#descs').innerHTML = "Automatically moves on upon correct answer";
        document.querySelector('#descc').innerHTML = 'Type 000 to skip';
    } else {
        document.querySelector('#descs').innerHTML = "Press ENTER to submit";
        document.querySelector('#descc').innerHTML = 'Submitting nothing will skip the question';
    }
}

let elapsedMiliseconds = 0
let elapsedSeconds = 0
let elapsedMinutes = 0

// fade in animation of the first question
let animationDelay = 300;

let startTimestamp, currentTimestamp, endingTimestamp;

function addZeroToSingleDigit(num) {return num.toString().padStart(2, '0')}

// Function of counter
let timer = null;
function fn() {
    startState = true;
    startTimestamp = Date.now();

    timer = setInterval(function () {
        currentTimestamp = Date.now() - startTimestamp;

        currentTimestamp = currentTimestamp - animationDelay;
        
        elapsedMiliseconds = Number(String(Math.floor((currentTimestamp)/10)).slice(-2));
        elapsedSeconds = Math.floor(currentTimestamp/1000) % 60;
        elapsedMinutes = Math.floor(Math.floor(currentTimestamp/1000) / 60);

        if (currentTimestamp < 0) {
            elapsedMiliseconds = 0;
            elapsedSeconds = 0;
            elapsedMinutes = 0;
        }

        document.getElementById('timeElapsed').innerHTML = addZeroToSingleDigit(elapsedMinutes) + ':' + addZeroToSingleDigit(elapsedSeconds) + ':' + addZeroToSingleDigit(elapsedMiliseconds);
    }, 1)
}


let firstNumber,secondNumber,tempNumber,answer,divider;

// Function to return random divisible numbers
// F and S define the digit of the random numbers
// Function will not return if the random numbers are not divisible
// MUST run function until it returns (USE WHILE)
function divisible(f,s) {
    var firstRandomNumber = Math.floor(Math.random() * ((10 ** f) - (10 ** (f-1))) + (10 ** (f-1))) + 1;
    var secondRandomNumber = Math.floor(Math.random() * ((10 ** s) - (10 ** (s-1))) + (10 ** (s-1))) + 1;
    if (firstRandomNumber % secondRandomNumber === 0) {
      return [firstRandomNumber , secondRandomNumber];
    }
}

// Function to generate a random number
// X defines the range of generation (See digit codename translation)
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
    // Statement to only run the function if the current question is still in progress
    if (questions < questionValue) {
        
        // Statement to assign the operation variable (See mode codename translation)
        if (themeValue == 5) {
            operation = Math.floor(Math.random()*4) + 1 ;
        } else {
            operation = themeValue;
        }

        // Add the current question number and show it
        questions++;
        document.querySelector('#questionNumber').innerHTML = 'Question ' + comma(questions) + ' of ' + comma(questionValue);

        // In case of multiplication, if the wide range of digits is selected, only one of them is the bigger and one is the smaller
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
        
        // In case of addition, subtraction, multiplication (only if fixed range of digits is selected), get the random numbers
        if ((operation == 1 || operation == 2) || ((operation == 3)&&(digitValue == 1 || digitValue == 3 || digitValue == 5 || digitValue == 7))) {
            firstNumber = randomit(digitValue);
            secondNumber = randomit(digitValue);
        }

        // In case of division, get the random divisible numbers (see divisible function)
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

        
        // Always make the first number longer than the second one
        if (firstNumber.toString().length < secondNumber.toString().length) {
            tempNumber = firstNumber;
            firstNumber = secondNumber;
            secondNumber = tempNumber;
        }

        // Always make the first number larger if subtraction and no negative are selected 
        if ((operation == 2) && (!negative)) {
            if (firstNumber < secondNumber) {
                tempNumber = firstNumber;
                firstNumber = secondNumber; 
                secondNumber = tempNumber;
            }
        }


        // Show correct UI for each operation
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

        
        // Add comma (See comma function) to each number
        document.querySelector('#questionMath').innerHTML = comma(firstNumber)  ;
        document.querySelector('#questionMath2').innerHTML = comma(secondNumber)

        // Show the question
        _('.questioncomponents').css('display','block');

        // Show the question after animation wait of 1 ms
        setTimeout(()=> {
            _('.questioncomponents').css('opacity','1');
        },100)
        

    } else {
        // If current question is the last one
        // Calculate score
        calculateScoreAndFinish(questionValue);
    }
}

// If autochange is turned on, check answer while user is typing
if (valurl()) {
    if (autochange) {
        _('.answer').on('keyup', function () {
            if (this.value == answer) {
                this.value = '';
                // console.info('Question ' + questions + ' is done')
                nextQuestion();
            } else if (this.value == '000') {
                this.value = '';
                // console.info('Question ' + questions + ' is skipped');
                skippedQuestion++;
                nextQuestion();
            }
        });
    } else {
        document.addEventListener("keyup", function(event) {
            if (event.code == "Enter") {
                if (_('.answer').value == answer) {
                    _('.answer').value = '';
                    // console.info('Question ' + questions + ' is done')
                    nextQuestion();
                } else {
                    _('.answer').value = '';
                    // console.info('Question ' + questions + ' is skipped');
                    skippedQuestion++;
                    nextQuestion();
                }
            }
        });
    }
}


// Function to be called to end the game
function calculateScoreAndFinish(totalQuestions) {
    userGetScore = totalQuestions-skippedQuestion;
    if (userGetScore < 0) userGetScore = 0;
    userGetPercent = (userGetScore * 100) / totalQuestions;

    // If the percentage is anything other than numbers
    if (isNaN(userGetPercent)) {
        userGetPercent = 0;
    } else {
        if (userGetPercent % 1 != 0) {
            userGetPercent = userGetPercent.toFixed(2)
        }
    }

    if (totalQuestions < 0) totalQuestions = 0;

    // Prepare results
    document.querySelector('#wholeScore').innerHTML = 'You got ' + comma(userGetScore) + ' out of ' + comma(totalQuestions);
    document.querySelector('#whatDigits').innerHTML = 'of ' + digitString + ' ' + makePlural('digit',digitValue) + ' '+ themeString +' within'
    document.querySelector('#percentScore').innerHTML = userGetPercent + '%';

    // Call done (below)
    done();
}

// When user skips to the end with the END button, calculate the score with the current question as total
if (valurl()) document.getElementById('skiptoend').addEventListener('click',end)


// Function to clear game after it is done and put the result values in place
function done() {
    finishState = true;

    _('.answer').blur();
    clearInterval(timer);
    timer = null;
    nextQuestion = ()=>{};

    seconds = ((Math.floor((Date.now()-startTimestamp)/10))/100) - (animationDelay/1000);

    seconds = Math.floor(seconds*100) / 100;

    if (seconds < 0) seconds = 0;
    if (isNaN(seconds)) seconds = 0;

    // console.info("Finished at " + seconds + " seconds");
    document.querySelector('#secondScore').innerHTML = seconds + ' ' + makePlural('second',Math.floor(seconds));
    _('.question').css('opacity','0');
    setTimeout(function() {
        _('.question').css('display','none'); 
        _('.score').css('display','block');
        if (document.querySelector('.template__anno')) {
            _('.template__anno').css('display','block');
        }
        // _('#in').css('display','block');
        showresult();
        }
    , 200)
    
}


// Function to show the result prompt
function showresult() {
    setTimeout(()=>{     
        _('.score').css('opacity','1');
    },200)
}


if (valurl()) console.log("%cWelcome to the MATHS console!\n\n%cHere is the list of commands you could run!\n- start() : Start game\n- skip() : Skip question\n- end() : End game\n- exit() : Exit game\n- again() : Refresh game\n- key() : Give answer\n- elapsed() : Give time\n- numbers() : Give the two numbers\n- operations() : Give the operation\n- cheat() : End game with perfect score", 'font-weight: bold; font-size: 20px; color: #126e82;', 'font-weight: normal;font-size:12px;');
/*

*/
function skip() {
    if (startState == false) {
        return console.error('To skip, start the game');
    }
    if (finishState == true) {
        return console.error('The game is finished');
    }
    document.querySelector('.answer').value = '';
    skippedQuestion++;
    nextQuestion();
    console.log(`It's okay if it's too hard. Just don't give up!`);
    return true;
}

function elapsed() {
    if (startState == false) {
        return console.error('To get elapsed time, start the game');
    }
    if (finishState == true) {
        return console.error('The game is finished');
    }
    console.log((Math.floor(currentTimestamp/10) / 100) + ' seconds elapsed!');
    return (Math.floor(currentTimestamp/10) / 100);
}

function key() {
    if (startState == false) {
        return console.error('To get the answer key, start the game');
    }
    if (finishState == true) {
        return console.error('The game is finished');
    }
    console.log(answer+' - Next time do it by yourself!')
    return answer;
}

function numbers() {
    if (startState == false) {
        return console.error('To get the numbers, start the game');
    }
    if (finishState == true) {
        return console.error('The game is finished');
    }
    console.log('The numbers are '+firstNumber+' and '+secondNumber);
    return [firstNumber,secondNumber];
}

function operations() {
    if (startState == false) {
        return console.error('To get the numbers, start the game');
    }
    if (finishState == true) {
        return console.error('The game is finished');
    }
    switch(operation) {
        case 1: console.log('We are doing addition!');break;
        case 2: console.log('We are doing subtraction!');break;
        case 3: console.log('We are doing multiplication!');break;
        case 4: console.log('We are doing division!');break;
        default: console.error(`Something's not right`);break;
    }
    return operation;
}

function end() {
    if (finishState == true) {
        return console.error('The game has already ended');
    }
    calculateScoreAndFinish(questions - 1);
    return true;
}

function exit() {
    console.log('Bye bye!')
    setTimeout(()=>{
        location.href='.';
    },500)
}

function again() {
    location.reload();
}

// A funny easter egg to let user cheat in the console
// Type cheat()
// Put interval speed in miliseconds in the parameter (default is 500)
// const keyup = new Event('keyup');
// var keyenter = new KeyboardEvent('keydown');
// delete keyenter.code;
// keyenter.code = 'Enter';
function cheat(interval = 500) {
    if (startState == false) {
        start()
    }
    setTimeout(()=>{
        document.querySelector('.answer').value=answer;
        let cheatlolinterval = setInterval(()=>{
            if (finishState) {
                clearInterval(cheatlolinterval);
            }

            nextQuestion()
            document.querySelector('.answer').value=answer
        },interval)
    },500)

    return console.log(`It's true cheating gets you perfect score, but practicing gets you better mental math skills!`)
}

