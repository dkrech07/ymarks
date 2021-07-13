var getTable = (objFiltered) => {
    var html = "<table class='customs-table'>";

    html += '<td>' + 'CODE' + '</td>';
    html += '<td>' + 'NAMT' + '</td>';
    html += '<td>' + 'NAME_ALL' + '</td>';
    html += '<td>' + 'ADRTAM' + '</td>';
    html += '<td>' + 'TELEFON' + '</td>';
    html += '<td>' + 'FAX' + '</td>';
    html += '<td>' + 'EMAIL' + '</td>';

    for (var i = 0; i < objFiltered.length; i++) {
        html += '<tr>';
        html += '<td>' + objFiltered[i]['CODE'] + '</td>';
        html += '<td>' + objFiltered[i]['NAMT'] + '</td>';
        html += '<td>' + objFiltered[i]['NAME_ALL'] + '</td>';
        html += '<td>' + objFiltered[i]['ADRTAM'] + '</td>';
        html += '<td>' + objFiltered[i]['TELEFON'] + '</td>';
        html += '<td>' + objFiltered[i]['FAX'] + '</td>';
        html += '<td>' + objFiltered[i]['EMAIL'] + '</td>';
        html += '</tr>';
    }
    document.getElementById('footer').innerHTML = html + '</table>';
}



var customsTypes = [];
objClone = obj.slice(0);



var map = document.getElementById('map');
objClone = obj.slice(0);
buttons[0].style = buttonStyleWhite;
buttons[0].classList.add('table-btn-active');
var mainCustoms = getCustoms('main');
drawMap(mainCustoms);
// getTable();

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
            // drawMap(mainCustoms);
            // getTable(mainCustoms);
        }

        // Если target.id === '2', вывести головные таможни;
        if (evt.target.id === '2') {
            // evt.target.style = buttonStyleWhite;
            // evt.target.classList.add('table-btn-active');
            removeChild(map);
            // var headCustoms = getCustoms('head');
            // drawMap(headCustoms);
            // getTable(headCustoms);
        }

        // Если target.id === '3', вывести посты акцизной таможни;
        if (evt.target.id === '3') {
            // objClone = obj.slice(0);
            // objHead = [];
            // objClone.forEach((row) => {
            //     var code = row['CODE'];
            //     if (code.slice(0, 5) === '10009') {
            //         objHead.push(row);
            //     }
            //     objClone = objHead;
            // });

            // evt.target.style = buttonStyleWhite;
            // evt.target.classList.add('table-btn-active');
            // removeChild(map);
            // getTable();
            // drawMap(objClone);
        }

        // Если target.id === '4', вывести прочие посты;
        if (evt.target.id === '4') {
            // objClone = obj.slice(0);
            // objHead = [];
            // objClone.forEach((row) => {
            //     var code = row['CODE'];
            //     if (code.slice(0, 3) === '121' || code.slice(0, 3) === '122' || code.slice(0, 3) === '123' || code.slice(0, 3) === '124' || code.slice(0, 3) === '125') {
            //         objHead.push(row);
            //     }
            //     objClone = objHead;
            // });

            // evt.target.style = buttonStyleWhite;
            // evt.target.classList.add('table-btn-active');
            // removeChild(map);
            // getTable();
            // drawMap(objClone);
        }

    });
});



//
// if (customsType === 'excise') {
//     objClone.forEach((row) => {
//         var code = row['CODE'];
//         if (code.slice(0, 5) === '10009') {
//             objHead.push(row);
//         }
//         // objClone = objHead;
//     });
// }
//
// if (customsType === 'others') {
//     objClone.forEach((row) => {
//         var code = row['CODE'];
//         if (code.slice(0, 3) === '121' || code.slice(0, 3) === '122' || code.slice(0, 3) === '123' || code.slice(0, 3) === '124' || code.slice(0, 3) === '125') {
//             objHead.push(row);
//         }
//         // objClone = objHead;
//     });
// }