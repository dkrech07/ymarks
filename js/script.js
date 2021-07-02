var objClone = obj.slice(0);
var buttons = document.querySelectorAll('li');
var buttonStyleBlue = 'background: #00bbd8; color: #ffffff;';
var buttonStyleWhite = 'background: #ffffff; color: #00bbd8;';
var customsTableFlag = 0;

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

    buttons.forEach(element => {
        element.addEventListener('click', (evt) => {

            buttons.forEach(element => {
                element.style = buttonStyleBlue;
            });

            if (customsTableFlag === 1) {
                customsTableFlag = 0;
                evt.target.style = buttonStyleBlue;
                var footer = document.querySelector('footer');
                removeChild(footer);
                return;
            }

            // Если target.id === '1', вывести все таможенные посты;
            if (evt.target.id === '1') {
                objClone = obj;
                evt.target.style = buttonStyleWhite;
                customsTableFlag = 1;
                getTable();
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
                customsTableFlag = 1;
                getTable();
            }

        });
    });
};

getCustoms(buttons);

// var getCustoms = (buttons) => {
//     var map = document.getElementById('map');
//
//     buttons.forEach(element => {
//         element.addEventListener('click', (evt) => {
//             // Если target.id === '1', вывести все таможенные посты;
//             if (evt.target.id === '1') {
//                 if (allCustomsFlag === 1) {
//                     var footer = document.querySelector('footer');
//                     allCustomsFlag = 0;
//                     removeChild(footer);
//                     return;
//                 }
//                 getTable();
//             }
//
//             // Если target.id === '1', вывести головные таможни;
//             if (evt.target.id === '2') {
//                 if (allCustomsFlag == 2) {
//                     console.log(allCustomsFlag);
//                     objClone = obj;
//                     removeChild(map);
//                     drawMap(objClone);
//                     getTable();
//                     return;
//                 }
//
//                 allCustomsFlag = 2;
//
//                 objHead = [];
//                 objClone.forEach((row) => {
//                     var code = row['CODE'];
//                     if (code.slice(5) === '000') {
//                         objHead.push(row);
//                     }
//                     objClone = objHead;
//                 });
//
//                 removeChild(map);
//                 drawMap(objClone);
//                 getTable();
//                 // if (allCustomsFlag === 1) {
//                 //     var footer = document.querySelector('footer');
//                 //     allCustomsFlag = 0;
//                 //     removeChild(footer);
//                 //     return;
//                 // }
//                 // getTable();
//             }
//
//         });
//     });
// };
//
//
//
//
//
//
//
//
//
// // var allCustomsFlag = 0;