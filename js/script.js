var tableFlag = 0;
var objClone = obj.slice(0);

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
    tableFlag = 1;
}


var table = document.createDocumentFragment();

var buttons = document.querySelectorAll('li');

var getCustoms = (buttons) => {
    var map = document.getElementById('map');

    buttons.forEach(element => {
        element.addEventListener('click', (evt) => {
            // Если target.id === '1', вывести все таможенные посты;
            if (evt.target.id === '1') {
                if (tableFlag === 1) {
                    var footer = document.querySelector('footer');
                    tableFlag = 0;
                    removeChild(footer);
                    return;
                }
                getTable();
            }

            // Если target.id === '1', вывести головные таможни;
            if (evt.target.id === '2') {
                if (tableFlag == 2) {
                    console.log(tableFlag);
                    objClone = obj;
                    removeChild(map);
                    drawMap(objClone);
                    getTable();
                    return;
                }

                tableFlag = 2;

                objHead = [];
                objClone.forEach((row) => {
                    var code = row['CODE'];
                    if (code.slice(5) === '000') {
                        objHead.push(row);
                    }
                    objClone = objHead;
                });

                removeChild(map);
                drawMap(objClone);
                getTable();
                // if (tableFlag === 1) {
                //     var footer = document.querySelector('footer');
                //     tableFlag = 0;
                //     removeChild(footer);
                //     return;
                // }
                // getTable();
            }

        });
    });
};

getCustoms(buttons);