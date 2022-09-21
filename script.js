let browserheight = $(window).height();

// FUN FACTS
let date = new Date();
let month = date.getMonth() + 1;
let day = date.getDate();
let year = date.getFullYear();

let URLnumber = "https://numbersapi.p.rapidapi.com/" + month +"/" + day + "/date?json=true&fragment=true";
console.log(URLnumber)

fetch(URLnumber, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "85aeb5a428msh62c2f062b0fe9d8p15a8fdjsn0e56cc58d4b8",
		"x-rapidapi-host": "numbersapi.p.rapidapi.com"
	}
})
.then(response => 
	response.json()
)
.then(data => {
    
    console.log(data)
    difference = year - data.year;

    document.querySelector('#didyouknow').style.visibility = 'visible';
    document.querySelector('#didyouknow').innerHTML = 'Did you know? Today, ' + difference + ' years ago,';
    document.querySelector('#didyouknowdesc').style.visibility = 'visible'
    document.querySelector('#didyouknowdesc').innerHTML = data.text;


})
.catch(err => {
	console.error("FETCHING ERROR: " + err);
});



function hidechoosing() {
    $('.height350ifsmall').fadeOut();
    $('.contentparent').fadeOut();


    
}

function addmenu() {
    hidechoosing();
    setTimeout(function() {
        
        if (browserheight > 600) {
            $('.navs').fadeIn();
        }
        
        $('.menuadd').fadeIn();

    },500)
}
document.querySelector('.addition').addEventListener('click',addmenu)
document.querySelector('.configadd').addEventListener('click',function() {

    let questions = document.querySelector('.choosequestionadd').value;
    if (questions == '' || null) {
        questions = 10
    }

    let digits = document.querySelector('.choosedigitadd').value;
    if (digits == '' || null) {
        digits = 3
    }

    $('.menuadd').fadeOut();
    setTimeout(function() {
        window.location.href = 'https://math.tinagrit.com/addition?questions=' + questions + '&digits=' + digits;
    },500)
})




function submenu() {
    hidechoosing();
    setTimeout(function() {
        if (browserheight > 600) {
            $('.navs').fadeIn();
        }
        $('.menusub').fadeIn();

    },500)
}
document.querySelector('.subtraction').addEventListener('click',submenu)
document.querySelector('.configsub').addEventListener('click',function() {

    let questions = document.querySelector('.choosequestionsub').value;
    if (questions == '' || null) {
        questions = 10
    }

    let digits = document.querySelector('.choosedigitsub').value;
    if (digits == '' || null) {
        digits = 3
    }

    let negative = document.querySelector('.isNegative').checked;

    $('.menusub').fadeOut();
    setTimeout(function() {
        window.location.href = 'https://math.tinagrit.com/subtraction?questions=' + questions + '&digits=' + digits + '&negative=' + negative;
        
    },500)
})