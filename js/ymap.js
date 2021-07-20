function drawMap(customsTypes) {

    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

        var myCollection = new ymaps.GeoObjectCollection();
        for (let customType in customsTypes) {
            var obj = customsTypes[customType]
            for (var i = 0; i < obj.length; i++) {
                var row = obj[i];
                var coords = row['COORDS'][0] + ',' + row['COORDS'][1];
                var myPlacemark = new ymaps.Placemark(coords.split(","), {
                    balloonContent: row['CODE'] + ' ' + row['NAMT'] + ' ' + row['ADRTAM'],
                    iconCaption: row['CODE'] + ' ' + row['NAMT'],
                    code: row['CODE'],
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0000ff',
                });
                myCollection.add(myPlacemark);
            }
        }

        myMap.geoObjects.add(myCollection);

        myMap.setBounds(myCollection.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 9
        });

        myMap.geoObjects.events.add('click', function(e) {
            var code = e.get('target').properties._data.code;
            var table = document.querySelector('.customs-table');
            var tableRows = document.querySelectorAll('tr');
            tableRows.forEach((element) => {
                element.classList.remove('customs-table-red')
            });

            if (table) {
                var tableRow = document.getElementById(code);
                tableRow.classList.add('customs-table-red');
                tableRow.scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                });
            }
        });

        var getNearestCustoms = (address, coords) => {
            var popupWrapper = document.querySelector('.popup-wrapper');
            removeChild(popupWrapper);

            var html = "<div class='customs-popup'>";
            html += '<h1>' + 'Вы искали: ' + address + '</h1>';
            html += '<p>' + 'Его координаты: ' + coords + '</p>';

            html += '<h2>' + 'Ближайшие таможенные посты:' + '</h2>';
            html += "<span class='close'>" + 'Закрыть' + '</span>';
            // html += '<h1>' + 'Вы искали: ' + currentAddress + '</h1>';

            html += '</div>';
            popupWrapper.insertAdjacentHTML("afterbegin", html);

            var popupCloseButton = document.querySelector('.close');
            popupCloseButton.addEventListener('click', evt => {
                removeChild(popupWrapper);
            });
        }

        var searchControl = myMap.controls.get('searchControl');
        // searchControl.search('Московская, 4');
        // getNearestCustoms('Московская, 4');
        searchControl.events.add('load', function(event) {
            var geoObjectsArray = searchControl.getResultsArray();
            var address = geoObjectsArray[0].properties.get('name');
            var coords = geoObjectsArray[0].geometry._coordinates;



            var allCoords = [].sort();
            objClone.forEach((element) => {
                allCoords.push(element['COORDS']);
            });

            var nearestCoords = {
                'nearest': [],
                'away': [],
                'far': [],
            };

            allCoords.forEach((element) => {
                var x = element[0] - coords[0];
                var y = element[1] - coords[1];

                if (x < 5 && y < 5) {
                    nearestCoords['nearest'].push(element);
                } else if (x < 7 && y < 7) {
                    nearestCoords['away'].push(element);
                } else {
                    nearestCoords['far'].push(element);
                }
            });

            nearestCoords['nearest'].sort()

            var nearestCustoms = [];
            // for (var i = 0; i < objClone.length; i++) {
            //     for (var j = 0; j < nearestCoords['nearest'].length; j++) {
            //         console.log(objClone[i]['COORDS']);
            //         if (objClone[i]['COORDS'] === nearestCoords['nearest'][j]) {
            //             nearestCustoms.push(objClone[i]);
            //         }
            //     }
            // }
            for (var i = 0; i < nearestCoords['nearest'].length; i++) {
                for (var j = 0; j < objClone.length; j++) {
                    if (nearestCoords['nearest'][i] === objClone[j]['COORDS']) {
                        nearestCustoms.push(objClone[j]);
                    }
                }
            }

            console.log(nearestCustoms);

            var currentAddress = geoObjectsArray[0].properties.get('name');
            getNearestCustoms(address, coords);
        });



    }
}

var mainCustoms = getCustoms('main', true);
drawMap(mainCustoms);
getTable(mainCustoms);
checkButtons(0, true);