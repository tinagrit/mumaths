function htmlEncode ( html )
{
    return html.replace(/[&"'\<\>]/g, function(c) 
    {
          switch (c) 
          {
              case "&":
                return "&amp;";
              case "'":
                return "&#39;";
              case '"':
                return "&quot;";
              case "<":
                return "&lt;";
              default:
                return "&gt;";
          }
    });
};
//https://stackoverflow.com/questions/37118381/js-to-show-html-tags

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//https://stackoverflow.com/questions/4122268/using-settimeout-synchronously-in-javascript

window.scrollTo(0,0);

// BEGIN TYPER

document.getElementById('typer').classList.remove('active');

document.getElementById('typererror').style.display = 'none';
let typerStatus = false;
let typerCloseable = false;
let selectScroller = false;
let selectedIndex = false;


const typerError = [
    {
        text: typerUnknownError,
        searchTerm: typerUnknownErrorSearch,
        handler: ()=>{location.reload()}
    }
];

const listElem = document.getElementById('typerlists');

async function openTyper (arr = typerError, closeable = true) {
    if (typerStatus) {
        selectScroller = false;
        selectedIndex = false;
        document.getElementById('typerinput').removeEventListener('input',()=>{showQueryFromTerm(arr)});
        document.getElementById('typerinput').value = '';
    }

    if (typeof arr != 'object') {
        arr = typerError
    }

    listElem.innerHTML = '';

    showQueryFromTerm(arr)

    if (!typerStatus) document.getElementById('typer').style.opacity = '0'
    document.getElementById('typer').classList.add('active');

    setTimeout(()=>{
        document.getElementById('typer').style.opacity = '1'
    },10)

    await sleep(10)

    document.getElementById('typerinput').focus();

    typerStatus = true;
    typerCloseable = closeable;

    document.getElementById('typerinput').addEventListener('input',()=>{showQueryFromTerm(arr)})
}

document.getElementById('typerinput').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (selectScroller && selectScroller.length > 0) {
            selectScroller[selectedIndex].handler();
        }
    }  
});

window.addEventListener('click', function(e){   
    if (!document.getElementById('typerui').contains(e.target)){
        if (typerStatus) {
            closeTyper();
        }
    }
});

document.addEventListener('keydown',function(event) {
    if (typerStatus) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (selectScroller && selectScroller.length > 0) {
                if (selectScroller.length - 1 > selectedIndex) {
                    selectedIndex++;
                } else if (selectScroller.length - 1 == selectedIndex) {
                    selectedIndex = 0;
                }
                if (document.querySelector('#typer #typercontent #typerlists .list.active')) {
                    document.querySelector('#typer #typercontent #typerlists .list.active').classList.remove('active');
                }
                document.querySelectorAll('#typer #typercontent #typerlists .list')[selectedIndex].classList.add('active');
            }
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (selectScroller && selectScroller.length > 0) {
                if (selectedIndex > 0) {
                    selectedIndex--;
                } else if (selectedIndex === 0) {
                    selectedIndex = selectScroller.length - 1;
                }
                if (document.querySelector('#typer #typercontent #typerlists .list.active')) {
                    document.querySelector('#typer #typercontent #typerlists .list.active').classList.remove('active');
                }
                document.querySelectorAll('#typer #typercontent #typerlists .list')[selectedIndex].classList.add('active');
            }
        }
    }
})

const showQueryFromTerm = (arr) => {
    if (document.querySelector('#typer #typercontent #typerlists .list.active')) {
        document.querySelector('#typer #typercontent #typerlists .list.active').classList.remove('active');
    }

    if (arr.length < 1) {
        listElem.innerHTML = nothingInListTyper;
        return;
    }
    listElem.innerHTML = '';
    term = document.getElementById('typerinput').value;
    result = [];

    if (arr[0] !== 'input') {
        result = arr.filter(item => item.searchTerm.toUpperCase().startsWith(term.toUpperCase()));
        result = result.concat(arr.filter(item => !item.searchTerm.toUpperCase().startsWith(term.toUpperCase()) && item.searchTerm.toUpperCase().includes(term.toUpperCase())))
    } else {
        if (term === '') {
            if (arr[1].current) {
                result = [{
                    text: arr[1].textWithQuery.replace(/{query}/gi,htmlEncode(arr[1].currentQuery)),
                    checked: true,
                    handler: () => {arr[1].handler(arr[1].currentQuery)}
                }]
            }
        } else {
            if (arr[1].numbersOnly) {
                if (isNaN(term)) {
                    result = [{
                        text: lang.error.NumbersOnly,
                        errlist: true
                    }]
                } else {
                    if (arr[1].integerOnly) {
                        term = String(Math.floor(Number(term)))
                    }
                    if (Number(term) > arr[1].numbersMaximum) {
                        result = [{
                            text: lang.error.ExceedNumbers.replace(/{query}/gi,arr[1].numbersMaximum),
                            errlist: true
                        }]
                    } else if (Number(term) < arr[1].numbersMinimum) {
                        result = [{
                            text: lang.error.SmallNumbers.replace(/{query}/gi,arr[1].numbersMinimum),
                            errlist: true
                        }]
                    } else {
                        if (Number(term) == 1) {
                            result = [{
                                text: arr[1].textWithQuerySingular.replace(/{query}/gi,htmlEncode(term)),
                                handler: () => {arr[1].handler(term)}
                            }]
                        } else {
                            result = [{
                                text: arr[1].textWithQuery.replace(/{query}/gi,htmlEncode(term)),
                                handler: () => {arr[1].handler(term)}
                            }]
                        }
                    }
                }
            } else {
                result = [{
                    text: arr[1].textWithQuery.replace(/{query}/gi,htmlEncode(term)),
                    handler: () => {arr[1].handler(term)}
                }]
            }
        }
        result.push({
            text: arr[1].text,
            errlist: true
        })
    }

    if (result.length < 1) {
        listElem.innerHTML = queryNotMatchTyper.replace(/{query}/gi,htmlEncode(term));
        return;
    }

    result.forEach(each=>{
        list = document.createElement('div');
        
        list.innerHTML = '';

        if (each.headingimg) {
            list.classList.add('headingimg');
            list.innerHTML += '<div class="svgcontainer">' + each.headingimg + '</div>';
        }

        list.innerHTML += each.text;

        if (each.checked == true) {
            list.classList.add('check');
            list.innerHTML += checkmarkSVG;
        }

        if (each.errlist == true) {
            list.classList.add('errlist')
        } else {
            list.classList.add('list');
        }

        listElem.appendChild(list);

        if (!each.handler) {each.handler = () => {}}
        list.addEventListener('click',each.handler);
    })

    if (document.querySelector('#typer #typercontent #typerlists .list')) {
        document.querySelectorAll('#typer #typercontent #typerlists .list')[0].classList.add('active');
        selectedIndex = 0;
        if (term === '') {
            for (i=0; i<result.length; i++) {
                if (result[i].checked) {
                    document.querySelector('#typer #typercontent #typerlists .list.active').classList.remove('active');
                    document.querySelectorAll('#typer #typercontent #typerlists .list')[i].classList.add('active');
                    selectedIndex = i;
                    break;
                }
            }
        }
    }

    selectScroller = result.filter(item => !item.errlist);
}

async function closeTyper () {
    if (typerCloseable) {
        document.getElementById('typer').style.opacity = '0'
        setTimeout(()=>{
            document.getElementById('typer').classList.remove('active')
        },200)
        await sleep(200);
    
        listElem.innerHTML = '';
        typerStatus = false;
        document.getElementById('typerinput').removeEventListener('input',()=>{showQueryFromTerm(arr)});
        document.getElementById('typerinput').value = '';
        selectScroller = false;
        selectedIndex = false;
        typerCloseable = false;
    }
}

document.getElementById('closetyperX').addEventListener('click',closeTyper);

// END TYPER

document.getElementById('game').style.minHeight = "calc(100vh - " + (Number(window.getComputedStyle(document.getElementById('mainWidthcontroller')).paddingTop.slice(0,-2)) + Number(window.getComputedStyle(document.getElementById('topbar')).height.slice(0,-2)) + Number(window.getComputedStyle(document.getElementById('game')).marginTop.slice(0,-2))) + "px)"