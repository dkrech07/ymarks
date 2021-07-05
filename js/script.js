var objClone = obj.slice(0);
var buttons = document.querySelectorAll('li');
var buttonStyleBlue = 'background: #00bbd8; color: #ffffff;';
var buttonStyleWhite = 'background: #ffffff; color: #00bbd8;';

var removeChild = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

var getTable = () => {
    var html = "<table class='customs-table'>";

    html += '<td>' + 'CODE' + '</td>';
    html += '<td>' + 'NAMT' + '</td>';
    html += '<td>' + 'NAME_ALL' + '</td>';
    html += '<td>' + 'ADRTAM' + '</td>';
    html += '<td>' + 'TELEFON' + '</td>';
    html += '<td>' + 'FAX' + '</td>';
    html += '<td>' + 'EMAIL' + '</td>';

    for (var i = 0; i < objClone.length; i++) {
        html += '<tr>';
        html += '<td>' + objClone[i]['CODE'] + '</td>';
        html += '<td>' + objClone[i]['NAMT'] + '</td>';
        html += '<td>' + objClone[i]['NAME_ALL'] + '</td>';
        html += '<td>' + objClone[i]['ADRTAM'] + '</td>';
        html += '<td>' + objClone[i]['TELEFON'] + '</td>';
        html += '<td>' + objClone[i]['FAX'] + '</td>';
        html += '<td>' + objClone[i]['EMAIL'] + '</td>';
        html += '</tr>';
    }
    document.getElementById('footer').innerHTML = html + '</table>';
}

var getCustoms = (buttons) => {
    var map = document.getElementById('map');
    objClone = obj.slice(0);
    buttons[0].style = buttonStyleWhite;
    buttons[0].classList.add('table-btn-active');
    getTable();

    buttons.forEach(element => {
        element.addEventListener('click', (evt) => {

            buttons.forEach(element => {
                element.style = buttonStyleBlue;
                element.classList.remove('table-btn-active');

            });

            // Если target.id === '1', вывести все таможенные посты;
            if (evt.target.id === '1') {
                objClone = obj.slice(0);
                evt.target.style = buttonStyleWhite;
                evt.target.classList.add('table-btn-active');
                removeChild(map);
                getTable();
                drawMap(objClone);
            }

            // Если target.id === '2', вывести головные таможни;
            if (evt.target.id === '2') {
                objClone = obj.slice(0);
                objHead = [];
                objClone.forEach((row) => {
                    var code = row['CODE'];
                    if (code.slice(5) === '000') {
                        objHead.push(row);
                    }
                    objClone = objHead;
                });

                evt.target.style = buttonStyleWhite;
                evt.target.classList.add('table-btn-active');
                removeChild(map);
                getTable();
                drawMap(objClone);
            }

            // Если target.id === '3', вывести посты акцизной таможни;
            if (evt.target.id === '3') {
                objClone = obj.slice(0);
                objHead = [];
                objClone.forEach((row) => {
                    var code = row['CODE'];
                    if (code.slice(0, 5) === '10009') {
                        objHead.push(row);
                    }
                    objClone = objHead;
                });

                evt.target.style = buttonStyleWhite;
                evt.target.classList.add('table-btn-active');
                removeChild(map);
                getTable();
                drawMap(objClone);
            }

            // Если target.id === '4', вывести прочие посты;
            if (evt.target.id === '4') {
                objClone = obj.slice(0);
                objHead = [];
                objClone.forEach((row) => {
                    var code = row['CODE'];
                    if (code.slice(0, 3) === '121' || code.slice(0, 3) === '122' || code.slice(0, 3) === '123' || code.slice(0, 3) === '124' || code.slice(0, 3) === '125') {
                        objHead.push(row);
                    }
                    objClone = objHead;
                });

                evt.target.style = buttonStyleWhite;
                evt.target.classList.add('table-btn-active');
                removeChild(map);
                getTable();
                drawMap(objClone);
            }

        });
    });
};
// 121,122,123,124,125
getCustoms(buttons);