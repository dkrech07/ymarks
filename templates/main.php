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

<body>
    <div class="popup-wrapper"></div>

    <header class="main-header wrapper">
        <b class="index-logo">Where is my customs?</b>
    </header>

    <main class="wrapper">
        <div id="map"></div>

        <span class='customs-count'>Количество постов: </span><span class='customs-count-number'></span>

        <form class="customs-form" action="" method="post">
            <label for="main">Все посты</label>
            <input type="checkbox" id="main" name="main" value="" checked>
            <label for="head">Головные таможни</label>
            <input type="checkbox" id="head" name="head" value="">
            <label for="excise">Посты акцизной таможни</label>
            <input type="checkbox" id="excise" name="excise" value="">
            <label for="others">Прочие посты</label>
            <input type="checkbox" id="others" name="others" value="">
            <label class="table table-bottom" for="table">Показать таблицу</label>
            <input type="checkbox" id="table" name="table" value="">
        </form>
    </main>

    <div id="table-footer"></div>

    <footer class="footer">
         <span class="version-title">test</span>
    </footer>

    <script type="text/javascript">
        var obj = <?php echo json_encode($list, JSON_UNESCAPED_UNICODE); ?>
    </script>

    <script src="../js/script.js"></script>
    <script src="../js/ymap.js"></script>
</body>

</html>
