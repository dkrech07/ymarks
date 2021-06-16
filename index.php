<?php
require_once "includes/db_connect.inc.php";
require_once "includes/functions.inc.php";

upload_file($connection);

$list = select_query($connection, "SELECT * FROM excel2mysql");

$page_content = include_template('main.php', [
    'list' => $list,
]);

echo ($page_content);