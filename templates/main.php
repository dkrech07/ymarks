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
            <li id='4' class='table-btn'>Прочие посты</li>
        </ul>
    </main>

    <footer id="footer" >
    </footer>

    <script type="text/javascript">
        var obj = <?php echo json_encode($list, JSON_UNESCAPED_UNICODE); ?>

  

        function drawMap(obj) {
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
        }
        drawMap(obj);

        var tableFlag = 0;
        var objClone = obj.slice(0);

        var removeChild = function(element) {
            while (element.firstChild) {
            element.removeChild(element.firstChild);
            }
        }

        var getTable = () => {
            var html = "<table class='customs-table'>";
                
                    html += '<td>' + 'CODE' + '</td>';
                    html += '<td>' + 'NAMT' + '</td>';
                    html += '<td>' + 'NAME_ALL' + '</td>';
                    html += '<td>' + 'ADRTAM' + '</td>';
                    html += '<td>' + 'TELEFON' + '</td>';
                    html += '<td>' + 'FAX' + '</td>';
                    html += '<td>' + 'EMAIL' + '</td>';
         
            for(var i = 0; i < objClone.length; i++)
                {
                    html += '<tr>';
                    html += '<td>' + objClone[i]['CODE'] + '</td>';
                    html += '<td>' + objClone[i]['NAMT'] + '</td>';
                    html += '<td>' + objClone[i]['NAME_ALL'] + '</td>';
                    html += '<td>' + objClone[i]['ADRTAM'] + '</td>';
                    html += '<td>' + objClone[i]['TELEFON'] + '</td>';
                    html += '<td>' + objClone[i]['FAX'] + '</td>';
                    html += '<td>' + objClone[i]['EMAIL'] + '</td>';
                    html += '</tr>';
                }
                document.getElementById('footer').innerHTML = html + '</table>';
                tableFlag = 1;
        }


        var table = document.createDocumentFragment();

        var buttons = document.querySelectorAll('li');

        var getCustoms = (buttons) => {
            var map = document.getElementById('map');

            buttons.forEach(element => {
                element.addEventListener('click', (evt) => {
                    // Если target.id === '1', вывести все таможенные посты;
                    if (evt.target.id === '1') {
                        if (tableFlag === 1) {
                            var footer = document.querySelector('footer');
                            tableFlag = 0;
                            removeChild(footer);
                            return;
                        }
                        getTable();
                    }

                    // Если target.id === '1', вывести головные таможни;
                    if (evt.target.id === '2') {
                        if (tableFlag == 2) {
                            console.log(tableFlag);
                            objClone = obj;
                            removeChild(map);
                            drawMap(objClone);
                            getTable();
                            return;
                        }

                        tableFlag = 2;

                        objHead = [];
                        objClone.forEach((row)=>{
                            var code = row['CODE'];
                            if (code.slice(5) === '000') {
                                objHead.push(row);
                            }
                            objClone = objHead;
                        });

                        removeChild(map);
                        drawMap(objClone);
                        getTable();
                        // if (tableFlag === 1) {
                        //     var footer = document.querySelector('footer');
                        //     tableFlag = 0;
                        //     removeChild(footer);
                        //     return;
                        // }
                        // getTable();
                    }
                        
                });
            });
        };

        getCustoms(buttons);


    </script>

</body>

</html>