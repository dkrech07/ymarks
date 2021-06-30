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



        





