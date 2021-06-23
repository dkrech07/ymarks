<?php
require_once "includes/db_connect.inc.php";
require_once "includes/functions.inc.php";

$show_addresses = filter_input(INPUT_GET, 'show_addresses', FILTER_VALIDATE_INT);

$excel = upload_file($connection);

$list = select_query($connection, "SELECT * FROM excel2mysql");

$page_content = include_template('main.php', [
    'list' => $list,
    'show_addresses' => $show_addresses,
]);

echo ($page_content);
