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
            if (table) {
                var tableRow = document.getElementById(code);
                tableRow.classList.add('customs-table-red');
                tableRow.scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                });
            }
        });
    }
}

var mainCustoms = getCustoms('main', true);
drawMap(mainCustoms);
getTable(mainCustoms);
checkButtons(0, true);