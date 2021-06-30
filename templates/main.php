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

    </header>

    <main>
        <div id="map" style="width: 95%; height:550px"></div>
        <ul>
            <li id='1' class='table-btn'>Показать таблицу</li>

            <li id='2' class='table-btn'>Головные таможни</li>
            <li id='3' class='table-btn'>Посты акцизной таможни</li>
            <li id ="4" class='table-btn'>Прочие посты</li>
        </ul>
    </main>

    <footer id="footer" >
    </footer>

    <script type="text/javascript">
        var obj = <?php echo json_encode($list, JSON_UNESCAPED_UNICODE); ?>

        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            });

            var myCollection = new ymaps.GeoObjectCollection();

            obj.forEach((row) => {
                var coords = row['COORDS'][0] + ',' + row['COORDS'][1];
                console.log(typeof(coords));
                console.log(coords.split(","));
                var myPlacemark = new ymaps.Placemark(coords.split(","), {
                    balloonContent: "'" + row['CODE'] + ' ' + row['NAMT'] + ' ' + row['ADRTAM'] + "'",
                    iconCaption: "'" + row['CODE'] + ' ' + row['NAMT'] + "'"
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0000ff'
                });
                myCollection.add(myPlacemark);
            });

            myMap.geoObjects.add(myCollection);

            // Сделаем у карты автомасштаб чтобы были видны все метки.
            myMap.setBounds(myCollection.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 9
            });
        }


        var tableFlag = 0;


        var removeChild = function(element) {
            while (element.firstChild) {
            element.removeChild(element.firstChild);
            }
        }

        var getTable = () => {
            var html = "<table class='table'>";

            for(var i = 0; i < obj.length; i++)
                {
                    html += '<tr>';
                    html += '<td>' + obj[i]['CODE'] + '</td>';
                    html += '<td>' + obj[i]['ADRTAM'] + '</td>';
                    html += '</tr>';
                }
                document.getElementById('footer').innerHTML = html + '</table>';
                tableFlag = 1;
        }


        var table = document.createDocumentFragment();

        var buttons = document.querySelectorAll('li');

        var getCustoms = (buttons) => {
            buttons.forEach(element => {
                element.addEventListener('click', (evt) => {
                    if (evt.target.id === '1') {
                        if (tableFlag === 1) {
                            var footer = document.querySelector('footer');
                            tableFlag = 0;
                            removeChild(footer);
                            return;
                        }
                        getTable();
                    }
                        
                });
            });
        };

        getCustoms(buttons);


    </script>

</body>

</html>