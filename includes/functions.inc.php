<?php
// Подключаем библиотеку
require_once "PHPExcel.php";

/**
 * Подключает шаблон, передает туда данные и возвращает итоговый HTML контент
 * @param string $name Путь к файлу шаблона относительно папки templates
 * @param array $data Ассоциативный массив с данными для шаблона
 * @return string Итоговый HTML
 */
function include_template($name, array $data = [])
{
    $name = 'templates/' . $name;
    $result = '';

    if (!is_readable($name)) {
        return $result;
    }

    ob_start();
    extract($data);
    require $name;

    $result = ob_get_clean();

    return $result;
}

/**
 * Выполняет подключение и запрос к базе данных
 * В случае ошибки при подключении к БД, возвращает сообщение об ошибке
 * @param  object $con Ресурс соединения
 * @param  string $sql SQL-запрос к базе данных
 * @param  string $type Варианты массива, полученного при обращении к базе данных
 * @return array
 */
function select_query($con, $sql, $type = 'all')
{
    mysqli_set_charset($con, "utf8");
    $result = mysqli_query($con, $sql) or trigger_error("Ошибка в запросе к базе данных: " . mysqli_error($con), E_USER_ERROR);

    if ($type === 'assoc') {
        return mysqli_fetch_assoc($result);
    }

    return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

// Функция преобразования листа Excel в таблицу MySQL, с учетом объединенных строк и столбцов.
// Значения берутся уже вычисленными. Параметры:
//     $worksheet - лист Excel
//     $connection - соединение с MySQL (mysqli)
//     $table_name - имя таблицы MySQL
//     $columns_name_line - строка с именами столбцов таблицы MySQL (0 - имена типа column + n)
function excel2mysql($worksheet, $connection, $table_name, $columns_name_line = 0)
{
    // Проверяем соединение с MySQL
    if (!$connection->connect_error) {
        // Строка для названий столбцов таблицы MySQL
        $columns_str = "";
        // Количество столбцов на листе Excel
        $columns_count = PHPExcel_Cell::columnIndexFromString($worksheet->getHighestColumn());

        // Перебираем столбцы листа Excel и генерируем строку с именами через запятую
        for ($column = 0; $column < $columns_count; $column++) {
            $columns_str .= ($columns_name_line == 0 ? "column" . $column : $worksheet->getCellByColumnAndRow($column, $columns_name_line)->getCalculatedValue()) . ",";
        }

        // Обрезаем строку, убирая запятую в конце
        $columns_str = substr($columns_str, 0, -1);

        // Удаляем таблицу MySQL, если она существовала
        if ($connection->query("DROP TABLE IF EXISTS " . $table_name)) {
            // Создаем таблицу MySQL
            if ($connection->query("CREATE TABLE " . $table_name . " (" . str_replace(",", " TEXT NOT NULL,", $columns_str) . " TEXT NOT NULL)")) {
                // Количество строк на листе Excel
                $rows_count = $worksheet->getHighestRow();

                // Перебираем строки листа Excel
                for ($row = $columns_name_line + 1; $row <= $rows_count; $row++) {
                    // Строка со значениями всех столбцов в строке листа Excel
                    $value_str = "";

                    // Перебираем столбцы листа Excel
                    for ($column = 0; $column < $columns_count; $column++) {
                        // Строка со значением объединенных ячеек листа Excel
                        $merged_value = "";
                        // Ячейка листа Excel
                        $cell = $worksheet->getCellByColumnAndRow($column, $row);

                        // Перебираем массив объединенных ячеек листа Excel
                        foreach ($worksheet->getMergeCells() as $mergedCells) {
                            // Если текущая ячейка - объединенная,
                            if ($cell->isInRange($mergedCells)) {
                                // то вычисляем значение первой объединенной ячейки, и используем её в качестве значения
                                // текущей ячейки
                                $merged_value = $worksheet->getCell(explode(":", $mergedCells)[0])->getCalculatedValue();
                                break;
                            }
                        }

                        // Проверяем, что ячейка не объединенная: если нет, то берем ее значение, иначе значение первой
                        // объединенной ячейки
                        $value_str .= "'" . (strlen($merged_value) == 0 ? $cell->getCalculatedValue() : $merged_value) . "',";
                    }

                    // Обрезаем строку, убирая запятую в конце
                    $value_str = substr($value_str, 0, -1);

                    // Добавляем строку в таблицу MySQL
                    $connection->query("INSERT INTO " . $table_name . " (" . $columns_str . ") VALUES (" . $value_str . ")");
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

// Сохраняю координаты в базу

function get_coords($address) {
    $params = array(
        'geocode' => $address, // адрес
        'format'  => 'json',                          // формат ответа
        'results' => 1,                               // количество выводимых результатов
        'apikey'     => '613134a3-0b21-4574-9499-1a61e9868d74',                           // ваш api key
    );

    $response = json_decode(file_get_contents('http://geocode-maps.yandex.ru/1.x/?' . http_build_query($params, '', '&')));

    if ($response->response->GeoObjectCollection->metaDataProperty->GeocoderResponseMetaData->found > 0)
    {
         $coords = $response->response->GeoObjectCollection->featureMember[0]->GeoObject->Point->pos;
         return '[' . str_replace(' ', ', ', $coords) . ']';
    }
    else
    {
        return 'Ничего не найдено';
    }
}


function upload_file($connection) {

    if ($_FILES['uploadfile']['name']) {
        $file_name = $_FILES['uploadfile']['name'];
        $file_path = 'uploads/';
        $file_url = 'uploads/' . $file_name;
    
        move_uploaded_file($_FILES['uploadfile']['tmp_name'], $file_path . $file_name);

        // Загружаем файл Excel
        $PHPExcel_file = PHPExcel_IOFactory::load($file_url);

        // Перебираем все листы Excel и преобразуем в таблицу MySQL
        foreach ($PHPExcel_file->getWorksheetIterator() as $index => $worksheet) {
            echo excel2mysql($worksheet, $connection, "excel2mysql" . ($index != 0 ? $index : ""), 1);
        }
        return $PHPExcel_file;
    }
}
