<?php
require_once "includes/db_connect.inc.php";
require_once "includes/functions.inc.php";

$show_addresses = filter_input(INPUT_GET, 'show_addresses', FILTER_VALIDATE_INT);

$excel = upload_file($connection);

//$lists = [];
//foreach($excel ->getWorksheetIterator() as $worksheet) {
//    $lists[] = $worksheet->toArray();
//   }

mysqli_query($connection, "ALTER TABLE excel2mysql ADD COORDS VARCHAR(128)");

mysqli_query($connection, "INSERT INTO excel2mysql SET COORDS = 'test' WHERE CODE = '10000000'");

$list = select_query($connection, "SELECT * FROM excel2mysql");


foreach ($list as $custom) {
    $address = $custom['ADRTAM'];

    // Получает координаты по адресу таможенного поста;
    $custom_coords = get_coords($address);

    // // $sql = "INSERT INTO excel2mysql ('COORDS') VALUES ($custom_coords) WHERE 'CODE' = " . $custom['CODE'];
    // mysqli_query($connection, "INSERT INTO excel2mysql (COORDS) VALUES ('test') WHERE CODE = 10000010");

    

    print($custom_coords);
}

$page_content = include_template('main.php', [
    'list' => $list,
    'show_addresses' => $show_addresses,
]);

echo ($page_content);
