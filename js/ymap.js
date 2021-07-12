function drawMap(customsTypes) {
    
    // ymaps.ready(init);

    // function init() {
    //     var myMap = new ymaps.Map("map", {
    //         center: [55.76, 37.64],
    //         zoom: 10
    //     }, {
    //         searchControlProvider: 'yandex#search'
    //     });

    //     var myCollection = new ymaps.GeoObjectCollection();
    //     for (let customType in customsTypes) {
    //         var obj = customsTypes[customType]
    //         for (var i = 0; i < obj.length; i++) {
    //             var row = obj[i];
    //             var coords = row['COORDS'][0] + ',' + row['COORDS'][1];
    //             var myPlacemark = new ymaps.Placemark(coords.split(","), {
    //                 balloonContent: "'" + row['CODE'] + ' ' + row['NAMT'] + ' ' + row['ADRTAM'] + "'",
    //                 iconCaption: "'" + row['CODE'] + ' ' + row['NAMT'] + "'"
    //             }, {
    //                 preset: 'islands#icon',
    //                 iconColor: '#0000ff'
    //             });
    //             myCollection.add(myPlacemark);
    //         }
    //     }

        // customType.forEach((obj) => {
        //     obj.forEach((row) => {
        //         var coords = row['COORDS'][0] + ',' + row['COORDS'][1];
        //
        //         var myPlacemark = new ymaps.Placemark(coords.split(","), {
        //             balloonContent: "'" + row['CODE'] + ' ' + row['NAMT'] + ' ' + row['ADRTAM'] + "'",
        //             iconCaption: "'" + row['CODE'] + ' ' + row['NAMT'] + "'"
        //         }, {
        //             preset: 'islands#icon',
        //             iconColor: '#0000ff'
        //         });
        //         myCollection.add(myPlacemark);
        //     });
        // });

    //     myMap.geoObjects.add(myCollection);

    //     myMap.setBounds(myCollection.getBounds(), {
    //         checkZoomRange: true,
    //         zoomMargin: 9
    //     });
    // }
}

// drawMap(getCustoms('main'));