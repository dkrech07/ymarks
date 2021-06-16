<?php

    $dbh = new PDO('mysql:dbname=ymarks;host=localhost', 'root', 'root');

    // Запись с `id` = 1
    $sth = $dbh->prepare("SELECT * FROM `objects` WHERE `id` = 1");
    $sth->execute();
    $object = $sth->fetch(PDO::FETCH_ASSOC);

    print_r($object['point']);

?>

<div id="map" style="width: 100%; height:500px"></div>

<script src="https://api-maps.yandex.ru/2.1/?lang=ru-RU" type="text/javascript"></script>
<script type="text/javascript">
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [<?php echo $object['point']; ?>],
            zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });

    var myCollection = new ymaps.GeoObjectCollection();

    // Добавим метку красного цвета.
    var myPlacemark = new ymaps.Placemark([
        <?php echo $object['point']; ?>
    ], {
        balloonContent: '<?php echo $object['name']; ?>'
    }, {
        preset: 'islands#icon',
            iconColor: '#ff0000'
    });
    myCollection.add(myPlacemark);

    myMap.geoObjects.add(myCollection);
}
</script>