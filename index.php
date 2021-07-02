<?php
require_once "includes/all_customs.php";
require_once "includes/functions.inc.php";

$page_content = include_template('main.php', [
    'list' => $list,
    'show_addresses' => $show_addresses,
]);

echo ($page_content);

