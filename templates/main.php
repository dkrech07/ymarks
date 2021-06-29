<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://api-maps.yandex.ru/2.1/?apikey=4f3c09de-626b-498a-bc29-cff656b39532&lang=ru_RU" type="text/javascript"></script>
    <script src="direct_geocode.js" type="text/javascript"></script>
    <title>Where is my custom</title>
</head>

<body class="wrapper">
    <header class="main-section main-header">
        <b class="index-logo">Where is my customs?</b>
        <!-- <nav class="main-navigation">
            <ul class="site-navigation">
                <li><a href="#">Информация</a></li>
                <li><a href="#">Фото и видео</a></li>
                <li><a href="#">Карта Штата</a></li>
                <li><a href="catalog.html">Гостиницы</a></li>
            </ul>
        </nav> -->
    </header>

    <div id="map" style="width: 95%; height:550px"></div>

    <script type="text/javascript">
        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            });

            var myCollection = new ymaps.GeoObjectCollection();

            <?php foreach ($list as $row) : ?>
                var myPlacemark = new ymaps.Placemark([
                    <?php echo $row['COORDS'][0] . ' ,' . $row['COORDS'][1]; ?>
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
            myMap.setBounds(myCollection.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 9
            });
        }
    </script>

</body>

</html>