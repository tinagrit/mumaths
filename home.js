let selected = 1;

function isInstalled() {
    // For iOS
    if(window.navigator.standalone) return true
  
    // For Android
    if(window.matchMedia('(display-mode: standalone)').matches) return true
  
    // If neither is true, it's not installed
    return false
}

if (!isInstalled() && navigator.onLine) {
    includenav(document.getElementById('in'),'maths')
}

window.addEventListener('offline', () => {
    document.getElementById('in').remove()
})

window.addEventListener('appinstalled', () => {
    document.getElementById('in').remove()
});

function select(x) {
    _('.typeblock.active').class.remove('active');
    _('#selectme'+x).class.add('active');
    _('#typeinput').value = x;

    switch(x) {
        case "addition": {
            _('#configtitle').innerHTML = 'Addition';
            _('.config .group.negative').css('display','none');
            break;
        }
        case "subtraction": {
            _('#configtitle').innerHTML = 'Subtraction';
            _('.config .group.negative').css('display','block');
            break;
        }
        case "multiplication": {
            _('#configtitle').innerHTML = 'Multiplication';
            _('.config .group.negative').css('display','none');
            break;
        }
        case "division": {
            _('#configtitle').innerHTML = 'Division';
            _('.config .group.negative').css('display','none');
            break;
        }
        case "shuffle": {
            _('#configtitle').innerHTML = 'Shuffle';
            _('.config .group.negative').css('display','block');
            break;
        }
    }
}

configuration = localStorage.getItem('TGMATHS_Config');
configuration = JSON.parse(configuration);

if (configuration) {
    document.querySelector(`[name='questions']`).value = configuration.questions;
    document.querySelector(`[name='digits']`).value = configuration.digits;
    select(configuration.mode);
    document.querySelector(`[name='autochange']`).checked = configuration.autochange;
    document.querySelector(`[name='negative']`).checked = configuration.negative;
}

document.querySelector('.startblock').addEventListener('click',()=>{
    mode = document.querySelector(`[name='mode']`).value;
    questions = document.querySelector(`[name='questions']`).value;
    digits = document.querySelector(`[name='digits']`).value;
    autochange = document.querySelector(`[name='autochange']`).checked;
    negative = document.querySelector(`[name='negative']`).checked;
    storeConfig = {
        "mode": mode,
        "questions": questions,
        "digits": digits,
        "autochange": autochange,
        "negative": negative
    }

    localStorage.setItem('TGMATHS_Config',JSON.stringify(storeConfig));
    location.href = './game.html';
})

/* trick the service worker to cache all of these files */
fetch('./game.html').then((response)=>response.text())
fetch('./game.js').then((response)=>response.text())
fetch('./game.css').then((response)=>response.text())