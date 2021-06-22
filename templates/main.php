<div id="map" style="width: 100%; height:500px"></div>

<link rel="stylesheet" href="css/style.css">
<script src="https://api-maps.yandex.ru/2.1/?apikey=4f3c09de-626b-498a-bc29-cff656b39532&lang=ru_RU" type="text/javascript"></script>
<script src="direct_geocode.js" type="text/javascript"></script>

<script type="text/javascript">
ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 3
    });

    <?php foreach ($list as $row): ?>

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
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
        });

    <?php endforeach; ?>
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

<p class="adt">ВАЖНО! Столбец с адресами в загружаемой таблице должен быть назван: ADRTAM </p>