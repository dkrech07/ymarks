var objClone = obj.slice(0);
var buttons = document.querySelectorAll('li');
var buttonStyleBlue = 'background: #00bbd8; color: #ffffff;';
var buttonStyleWhite = 'background: #ffffff; color: #00bbd8;';

var removeChild = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

var getTable = (allObjFiltered) => {
    var html = "<table class='customs-table'>";

    html += '<td>' + 'CODE' + '</td>';
    html += '<td>' + 'NAMT' + '</td>';
    html += '<td>' + 'NAME_ALL' + '</td>';
    html += '<td>' + 'ADRTAM' + '</td>';
    html += '<td>' + 'TELEFON' + '</td>';
    html += '<td>' + 'FAX' + '</td>';
    html += '<td>' + 'EMAIL' + '</td>';

    for (var i = 0; i < allObjFiltered.length; i++) {
        var objFiltered = allObjFiltered[i];
        console.log(objFiltered);
        // for (var j = 0; j < objFiltered.length; j++) {
        //     html += '<tr>';
        //     html += '<td>' + objFiltered[j]['CODE'] + '</td>';
        //     html += '<td>' + objFiltered[j]['NAMT'] + '</td>';
        //     html += '<td>' + objFiltered[j]['NAME_ALL'] + '</td>';
        //     html += '<td>' + objFiltered[j]['ADRTAM'] + '</td>';
        //     html += '<td>' + objFiltered[j]['TELEFON'] + '</td>';
        //     html += '<td>' + objFiltered[j]['FAX'] + '</td>';
        //     html += '<td>' + objFiltered[j]['EMAIL'] + '</td>';
        //     html += '</tr>';
        // }
        // document.getElementById('footer').innerHTML = html + '</table>';

    }
}

var customsTypes = [];

// В параметрах функции передаем ['main', 'head'...];
var getCustoms = (customsType) => {
    var customsCount = 0;
    objFiltered = {
        'main': [],
        'head': [],
    };

    customsTypes.push(customsType);
    var count = 0;
    for (var i = 0; i < customsTypes.length; i++) {
        if (customsTypes[i] === customsType) {
            count++;
            if (count>=2) {
                objFiltered[customsType] = [];
                customsTypes.splice(i, 1);
                customsTypes.splice(-1);
            }
        }
    }

    for (var customNumber = 0; customNumber < customsTypes.length; customNumber++) {
        if (customsTypes[customNumber] === 'main') {
            for (var i = 0; i < objClone.length; i++) {
                var row = objClone[i];
                var code = row['CODE'];
                if (code.slice(5) !== '000' && code.slice(0, 5) !== '10009' && code.slice(0, 3) !== '121' && code.slice(0, 3) !== '122' && code.slice(0, 3) !== '123' && code.slice(0, 3) !== '124' && code.slice(0, 3) !== '125') {
                    objFiltered['main'].push(row);
                    customsCount++;
                }
            }
        }

        if (customsTypes[customNumber] === 'head') {
            for (var i = 0; i < objClone.length; i++) {
                var row = objClone[i];
                var code = row['CODE'];
                if (code.slice(5) === '000') {
                    objFiltered['head'].push(row);
                    customsCount++;
                }
            }
        }
    }

    // console.log(objFiltered);
    // console.log(customsTypes);
    // console.log(customsCount);
    document.querySelector(".customs-count").innerHTML = customsCount;

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
            getTable(mainCustoms);
        }

        // Если target.id === '2', вывести головные таможни;
        if (evt.target.id === '2') {
            evt.target.style = buttonStyleWhite;
            evt.target.classList.add('table-btn-active');
            removeChild(map);
            var headCustoms = getCustoms('head');
            drawMap(headCustoms);
            getTable(headCustoms);
        }

    });
});
