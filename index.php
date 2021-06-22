<?php
require_once "includes/db_connect.inc.php";
require_once "includes/functions.inc.php";

$show_addresses = filter_input(INPUT_GET, 'show_addresses', FILTER_VALIDATE_INT);

$excel = upload_file($connection);

mysqli_query($connection, "ALTER TABLE excel2mysql ADD COORDS VARCHAR(128)");

$list = select_query($connection, "SELECT * FROM excel2mysql");

foreach ($list as $custom) {
    $address = $custom['ADRTAM'];

    if (isset($address) || $address == true){
        // Получает координаты по адресу таможенного поста;
        $custom_coords = get_coords($address);
        $custom_code = $custom['CODE'];

        mysqli_query($connection, "UPDATE excel2mysql SET COORDS = '$custom_coords' WHERE CODE = '$custom_code'");
    }
}

$page_content = include_template('main.php', [
    'list' => $list,
    'show_addresses' => $show_addresses,
]);

echo ($page_content);
