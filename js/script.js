var customsFormElement = document.querySelector('.customs-form');
var customsTypes = customsFormElement.querySelectorAll('input');
var customsTypesButtons = customsFormElement.querySelectorAll('label');
var objClone = obj.slice(0);
var buttonStyleBlue = 'background: #00bbd8; color: #ffffff;';
var buttonStyleWhite = 'background: #ffffff; color: #00bbd8;';
var map = document.querySelector('#map');
var tableFooter = document.querySelector('#table-footer');

var removeChild = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

var checkButtons = function(buttonNuber, check) {
    if (check) {
        customsTypesButtons[buttonNuber].style = buttonStyleWhite;
        customsTypesButtons[buttonNuber].classList.add('table-btn-active');
    } else {
        customsTypesButtons[buttonNuber].style = buttonStyleBlue;
        customsTypesButtons[buttonNuber].classList.remove('table-btn-active');
    }
}

objFiltered = {
    'main': [],
    'head': [],
    'excise': [],
    'others': [],
};

var customsCount = 0;
// В параметрах функции передаем ['main', 'head'...];
var getCustoms = (customsType, check) => {

    if (customsType === 'main' && check === true) {
        for (var i = 0; i < objClone.length; i++) {
            var row = objClone[i];
            var code = row['CODE'];
            if (code.slice(5) !== '000' && code.slice(0, 5) !== '10009' && code.slice(0, 3) !== '121' && code.slice(0, 3) !== '122' && code.slice(0, 3) !== '123' && code.slice(0, 3) !== '124' && code.slice(0, 3) !== '125') {
                customsCount++;
                objFiltered['main'].push(row);
            }
        }
    } else if (customsType === 'main' && check === false) {
        customsCount -= objFiltered['main'].length;
        objFiltered['main'] = [];
    }

    if (customsType === 'head' && check === true) {
        for (var i = 0; i < objClone.length; i++) {
            var row = objClone[i];
            var code = row['CODE'];
            if (code.slice(5) === '000') {
                customsCount++;
                objFiltered['head'].push(row);
            }
        }
    } else if (customsType === 'head' && check === false) {
        customsCount -= objFiltered['head'].length;
        objFiltered['head'] = [];
    }

    if (customsType === 'excise' && check === true) {
        objClone.forEach((row) => {
            var code = row['CODE'];
            if (code.slice(0, 5) === '10009') {
                customsCount++;
                objFiltered['excise'].push(row);
            }
        });
    } else if (customsType === 'excise' && check === false) {
        customsCount -= objFiltered['excise'].length;
        objFiltered['excise'] = [];
    }


    if (customsType === 'others' && check === true) {
        objClone.forEach((row) => {
            var code = row['CODE'];
            if (code.slice(0, 3) === '121' || code.slice(0, 3) === '122' || code.slice(0, 3) === '123' || code.slice(0, 3) === '124' || code.slice(0, 3) === '125') {
                customsCount++;
                objFiltered['others'].push(row);
            }
        });
    } else if (customsType === 'others' && check === false) {
        customsCount -= objFiltered['others'].length;
        objFiltered['others'] = [];
    }

    document.querySelector(".customs-count-number").innerHTML = customsCount;
    return objFiltered;
};

var getTable = (allObjFiltered) => {
    var html = "<table class='customs-table'>";

    for (objKey in allObjFiltered) {
        var objFiltered = allObjFiltered[objKey];
        if (objFiltered.length > 0) {
            html += '<tr>';
            html += "<td style='background: #ffffff' colspan='8'>" + objKey + "</td>";
            html += '</tr>';

            html += '<td>' + '№' + '</td>';
            html += '<td>' + 'CODE' + '</td>';
            html += '<td>' + 'NAMT' + '</td>';
            html += '<td>' + 'NAME_ALL' + '</td>';
            html += '<td>' + 'ADRTAM' + '</td>';
            html += '<td>' + 'TELEFON' + '</td>';
            html += '<td>' + 'FAX' + '</td>';
            html += '<td>' + 'EMAIL' + '</td>';

            for (var i = 0; i < objFiltered.length; i++) {
                html += '<tr>';
                html += '<td>' + (i + 1) + '</td>';
                html += '<td>' + objFiltered[i]['CODE'] + '</td>';
                html += '<td>' + objFiltered[i]['NAMT'] + '</td>';
                html += '<td>' + objFiltered[i]['NAME_ALL'] + '</td>';
                html += '<td>' + objFiltered[i]['ADRTAM'] + '</td>';
                html += '<td>' + objFiltered[i]['TELEFON'] + '</td>';
                html += '<td>' + objFiltered[i]['FAX'] + '</td>';
                html += '<td>' + objFiltered[i]['EMAIL'] + '</td>';
                html += '</tr>';
            }
            document.getElementById('table-footer').innerHTML = html + '</table>';
        }

    }

}

customsTypes.forEach(element => {
    element.addEventListener('click', (evt) => {
        var customsType = evt.target.id;
        var check = evt.target.checked;

        if (evt.target.id === 'main') {
            customsTypesButtons[0].style = buttonStyleWhite;
            customsTypesButtons[0].classList.add('table-btn-active');
            var mainCustoms = getCustoms(customsType, check);
            checkButtons(0, check);
            removeChild(map);
            removeChild(tableFooter);
            drawMap(mainCustoms);
            getTable(mainCustoms);
        }

        if (evt.target.id === 'head') {
            customsTypesButtons[1].style = buttonStyleWhite;
            customsTypesButtons[1].classList.add('table-btn-active');
            var headCustoms = getCustoms(customsType, check);
            checkButtons(1, check);
            removeChild(map);
            removeChild(tableFooter);
            drawMap(headCustoms);
            getTable(headCustoms);
        }

        if (evt.target.id === 'excise') {
            customsTypesButtons[2].style = buttonStyleWhite;
            customsTypesButtons[2].classList.add('table-btn-active');
            var exciseCustoms = getCustoms(customsType, check);
            checkButtons(2, check);
            removeChild(map);
            removeChild(tableFooter);
            drawMap(exciseCustoms);
            getTable(exciseCustoms);
        }

        if (evt.target.id === 'others') {
            customsTypesButtons[3].style = buttonStyleWhite;
            customsTypesButtons[3].classList.add('table-btn-active');
            var othersCustoms = getCustoms(customsType, check);
            checkButtons(3, check);
            removeChild(map);
            removeChild(tableFooter);
            drawMap(othersCustoms);
            getTable(othersCustoms);
        }
    });
});