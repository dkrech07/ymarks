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

function checkButtons() {

}

var getCustoms = (buttons) => {
    var map = document.getElementById('map');
    objClone = obj;
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
                objClone = obj;
                evt.target.style = buttonStyleWhite;
                evt.target.classList.add('table-btn-active');
                getTable();
                drawMap(objClone);
            }

            // Если target.id === '1', вывести все таможенные посты;
            if (evt.target.id === '2') {

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
                getTable();
                drawMap(objClone);
            }

        });
    });
};

getCustoms(buttons);