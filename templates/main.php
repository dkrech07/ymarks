<div id="map" style="width: 100%; height:500px"></div>

<link rel="stylesheet" href="css/style.css">
<script src="https://api-maps.yandex.ru/2.1/?apikey=4f3c09de-626b-498a-bc29-cff656b39532&lang=ru_RU" type="text/javascript"></script>
<script src="direct_geocode.js" type="text/javascript"></script>

<script type="text/javascript">
ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [<?php echo $list[0]['point']; ?>],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });
 
    var myCollection = new ymaps.GeoObjectCollection(); 

    <?php foreach ($list as $row): ?>
    var myPlacemark = new ymaps.Placemark([
        <?php echo $row['COORDS'][0] . ' ,' . $row['COORDS'][1] ; ?>
    ], {
        balloonContent: '<?php echo $row['CODE'] . ' ' . $row['NAMT'] . ' ' . $row['ADRTAM']; ?>',
        iconCaption: '<?php echo $row['CODE'] . ' ' . $row['NAMT']; ?>'
    }, {
        preset: 'islands#icon',
        iconColor: '#0000ff'
    });
    myCollection.add(myPlacemark);
    <?php endforeach; ?>
 
    myMap.geoObjects.add(myCollection);
    
    // Сделаем у карты автомасштаб чтобы были видны все метки.
    myMap.setBounds(myCollection.getBounds(),{checkZoomRange:true, zoomMargin:9});
}
</script>

<form class="upload-form" method="post" action="index.php" enctype="multipart/form-data">
    <input type="hidden" name="MAX_FILE_SIZE" value="2000000" />
    <input type="file" name="uploadfile">
    <input type="submit" value="Загрузить файл">
</form>

<?php if ($show_addresses == 1) : ?>
    <a href="?show_addresses=0">Скрыть таблицу с адресами</a>
    <br>
    <?php
        

 echo '<table style="border-collapse: collapse" border="1">';
 // Перебор строк
 foreach($list as $row){
   echo "<tr class='customs-table'>";
   // Перебор столбцов
   foreach($row as $col){
     if (is_array($col)) {
        echo '<td>'.$col[0] . ',' . $con[1] .'</td>';
     } else {
        echo '<td>'.$col.'</td>';
     }
 }
 echo "</tr>";
 }
 echo '</table>';


    ?>
<?php else : ?>
    <a href="?show_addresses=1">Показать таблицу с адресами</a>
<?php endif; ?>

<!-- <p class="adt">ВАЖНО! Столбец с адресами в загружаемой таблице должен быть назван: ADRTAM </p> -->