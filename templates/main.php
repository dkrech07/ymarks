<div id="map" style="width: 100%; height:500px"></div>

<link rel="stylesheet" href="css/style.css">
<script src="https://api-maps.yandex.ru/2.1/?apikey=613134a3-0b21-4574-9499-1a61e9868d74&lang=ru_RU" type="text/javascript"></script>
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
        myGeoObjects.add(new ymaps.Placemark([13.38, 52.51])); // Сюда нужно сохранить координаты из базы;
    <?php endforeach; ?>
 
    myMap.geoObjects.add(myGeoObjects);
    
    // Сделаем у карты автомасштаб, чтобы были видны все метки;
    myMap.setBounds(myCollection.getBounds(),{checkZoomRange:true, zoomMargin:9});
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