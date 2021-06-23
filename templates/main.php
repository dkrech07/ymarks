<div id="map" style="width: 100%; height:500px"></div>

<link rel="stylesheet" href="css/style.css">
<script src="https://api-maps.yandex.ru/2.1/?apikey=81bba49d-e474-4b34-88c8-83eb62970f6c&lang=ru_RU" type="text/javascript"></script>
<script src="direct_geocode.js" type="text/javascript"></script>

<script type="text/javascript">
ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 2
    }, {
        searchControlProvider: 'yandex#search'
    });
 
    var myGeoObjects = new ymaps.GeoObjectCollection({}, {
        preset: "islands#redCircleIcon",
        strokeWidth: 4,
        geodesic: true
    });

    <?php foreach ($list as $row): ?>
<<<<<<< HEAD

    // Поиск координат переданного адреса;
    ymaps.geocode('<?php echo $row['ADRTAM']; ?>', {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Сортировка результатов от центра окна карты.
        // boundedBy: myMap.getBounds(),
        // strictBounds: true,
        // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
        // Если нужен только один результат, экономим трафик пользователей.
        results: 1
    }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
                // Координаты геообъекта.
                coords = firstGeoObject.geometry.getCoordinates(),
                // Область видимости геообъекта.
                bounds = firstGeoObject.properties.get('boundedBy');

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // Получаем строку с адресом и выводим в иконке геообъекта.
            firstGeoObject.properties.set('iconCaption', '<?php echo $row['CODE'] . ' ' . $row['NAMT']; ?>');

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
            
            // myGeoObjects.add(new ymaps.Placemark(firstGeoObject));
        });









=======
       
            myGeoObjects.add(new ymaps.Placemark([<?php echo $row['COORDS']; ?>], {
            balloonContent: <?php echo $row['CODE'] ?>,
            // iconCaption: 'текст'
        }, {
            preset: 'islands#greenDotIconWithCaption'
        }))
>>>>>>> d14911332c417edc63ab207321ffff89aa5c54b0

    <?php endforeach; ?>
 
    // myMap.geoObjects.add(myGeoObjects);
    
    // Сделаем у карты автомасштаб, чтобы были видны все метки;
    // myMap.setBounds(myCollection.getBounds(),{checkZoomRange:true, zoomMargin:9});
}
</script>

<form class="upload-form" method="post" action="index.php" enctype="multipart/form-data">
    <input type="hidden" name="MAX_FILE_SIZE" value="2000000" />
    <input type="file" name="uploadfile">
    <input type="submit" value="Загрузить файл">
</form>

<?php if ($show_addresses === 1) : ?>
    <a href="?show_addresses=0">Скрыть таблицу с адресами</a>
    <br>
    <?php
        

 echo '<table style="border-collapse: collapse" border="1">';
 // Перебор строк
 foreach($list as $row){
   echo '<tr>';
   // Перебор столбцов
   foreach($row as $col){
     echo '<td>'.$col.'</td>';
 }
 echo '</tr>';
 }
 echo '</table>';


    ?>
<?php else : ?>
    <a href="?show_addresses=1">Показать таблицу с адресами</a>
<?php endif; ?>

<p class="adt">ВАЖНО!</p>

<p class="adt">Столбец с адресами в загружаемой таблице должен быть назван: ADRTAM </p>
<p class="adt">Столбец с кодами таможенным постов должен быть назван: CODE </p>