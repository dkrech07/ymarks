var customsFormElement = document.querySelector('.customs-form');
var customsTypes = customsFormElement.querySelectorAll('input');
console.log(customsTypes);

customsTypes.forEach(element => {
    element.addEventListener('click', (evt) => {
        console.log(evt.target.checked);
    });
});