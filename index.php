<?php

    $dbh = new PDO('mysql:dbname=ymarks;host=localhost', 'root', 'root');

    $sth = $dbh->prepare("SELECT * FROM excel2mysql");
    $sth->execute();
    $list = $sth->fetchAll(PDO::FETCH_ASSOC);

    // Подключаем форму для загрузки документов с адресами;
    require_once "form.php";

    // Выводим Яндекс Карту на страницу;
    require_once "ymap.php";
?>