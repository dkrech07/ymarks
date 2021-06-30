const buttons = document.querySelectorAll('li');

const getCustoms = (buttons, <?php echo $list ?>) => {
    buttons.forEach(element => {
        element.addEventListener('click', (evt) => {
            if (evt.target.id === '1') {
               console.log(list);
            }
            return evt.target.id;
        });
    });
};

getCustoms(buttons);



        
obj.forEach(($row) => {
    var myPlacemark = new ymaps.Placemark([
        "[" . $row['COORDS'][0] . ' ,' . $row['COORDS'][1]. "]"
    ], {
        balloonContent: "'" . $row['CODE'] . ' ' . $row['NAMT'] . ' ' . $row['ADRTAM'] . "'",
        iconCaption: "'" . echo $row['CODE'] . ' ' . $row['NAMT'] . "'"
    }, {
        preset: 'islands#icon',
        iconColor: '#0000ff'
    });
    myCollection.add(myPlacemark);
});





