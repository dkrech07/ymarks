<?php

    $dbh = new PDO('mysql:dbname=ymarks;host=localhost', 'root', 'root');

    $sth = $dbh->prepare("SELECT * FROM `objects` ORDER BY `name`");
    $sth->execute();
    $list = $sth->fetchAll(PDO::FETCH_ASSOC);

    // Выводим Яндекс Карту на страницу;
    require_once "ymap.php";
?>