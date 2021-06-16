<?php

// Соединение с базой MySQL
$connection = new mysqli("localhost", "root", "root", "ymarks");
// Выбираем кодировку UTF-8
$connection->set_charset("utf8");

function select_query($con, $sql, $type = 'all')
{
    mysqli_set_charset($con, "utf8");
    $result = mysqli_query($con, $sql) or trigger_error("Ошибка в запросе к базе данных: " . mysqli_error($con), E_USER_ERROR);

    if ($type === 'assoc') {
        return mysqli_fetch_assoc($result);
    }

    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

$list = select_query($connection, "SELECT * FROM excel2mysql");

    // Выводим Яндекс Карту на страницу;
    require_once "ymap.php";

    // Подключаем форму для загрузки документов с адресами;
    require_once "form.php";
?>