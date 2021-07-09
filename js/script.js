var objClone = obj.slice(0);
var buttons = document.querySelectorAll('li');
var buttonStyleBlue = 'background: #00bbd8; color: #ffffff;';
var buttonStyleWhite = 'background: #ffffff; color: #00bbd8;';

var removeChild = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function doSmth(a) {
    for (var q = 1, i = 1; q < a.length; ++q) {
        if (a[q] !== a[q - 1]) {
            a[i++] = a[q];
        }
    }

    a.length = i;
    return a;
}

var customsTypes = [];

// В параметрах функции передаем ['main', 'head'...];
var getCustoms = (customsType) => {

    objFiltered = {
        'main': [],
        'head': [],
    };

    customsTypes.push(customsType);


    // if (customsTypes.length > 0) {
    //     for (var i = 0; i < customsTypes.length; i++) {
    //         if (customsTypes[i] === customsType) {
    //             objFiltered[customsType] = [];
    //             delete customsTypes[i];
    //         }
    //     }
    // } else {
    //
    // }
    console.log(customsTypes);
    console.log(customsTypes.length);

    for (var customNumber = 0; customNumber < customsTypes.length; customNumber++) {
        if (customsTypes[customNumber] === 'main') {
            for (var i = 0; i < objClone.length; i++) {
                var row = objClone[i];
                var code = row['CODE'];
                if (code.slice(5) !== '000' && code.slice(0, 5) !== '10009' && code.slice(0, 3) !== '121' && code.slice(0, 3) !== '122' && code.slice(0, 3) !== '123' && code.slice(0, 3) !== '124' && code.slice(0, 3) !== '125') {
                    objFiltered['main'].push(row);
                }
            }
        }

        if (customsTypes[customNumber] === 'head') {
            for (var i = 0; i < objClone.length; i++) {
                var row = objClone[i];
                var code = row['CODE'];
                if (code.slice(5) === '000') {
                    objFiltered['head'].push(row);
                }
            }
        }
    }

    console.log(objFiltered);
    return objFiltered;
};

buttons.forEach(element => {
    element.addEventListener('click', (evt) => {

        buttons.forEach(element => {
            element.style = buttonStyleBlue;
            element.classList.remove('table-btn-active');

        });

        // Если target.id === '1', вывести все таможенные посты;
        if (evt.target.id === '1') {
            evt.target.style = buttonStyleWhite;
            evt.target.classList.add('table-btn-active');
            removeChild(map);
            var mainCustoms = getCustoms('main');
            drawMap(mainCustoms);

            // getTable(mainCustoms);
        }

        // Если target.id === '2', вывести головные таможни;
        if (evt.target.id === '2') {
            evt.target.style = buttonStyleWhite;
            evt.target.classList.add('table-btn-active');
            removeChild(map);
            var headCustoms = getCustoms('head');
            drawMap(headCustoms);

            // getTable(headCustoms);
        }

    });
});