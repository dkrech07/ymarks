<?php
// Соединение с базой MySQL
$connection = mysqli_connect('localhost', 'root', 'root', 'ymarks') or trigger_error('Ошибка подключения: ' . mysqli_connect_error(), E_USER_ERROR);

// Выбираем кодировку UTF-8
$connection->set_charset("utf8");