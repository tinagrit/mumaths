let selected = 1;

function select(x) {
    _('.typeblock.active').class.remove('active');
    _('#selectme'+x).class.add('active');
    _('#typeinput').value = x;

    switch(x) {
        case 1: {
            _('#configtitle').innerHTML = 'Addition';
            _('.config .group.negative').css('display','none');
            break;
        }
        case 2: {
            _('#configtitle').innerHTML = 'Subtraction';
            _('.config .group.negative').css('display','block');
            break;
        }
        case 3: {
            _('#configtitle').innerHTML = 'Multiplication';
            _('.config .group.negative').css('display','none');
            break;
        }
        case 4: {
            _('#configtitle').innerHTML = 'Division';
            _('.config .group.negative').css('display','none');
            break;
        }
        case 5: {
            _('#configtitle').innerHTML = 'Shuffle';
            _('.config .group.negative').css('display','block');
            break;
        }
    }
}