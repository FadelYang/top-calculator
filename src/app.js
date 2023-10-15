const calculatorNumber = document.querySelectorAll(".calculatorNumber");
const operatorNumher = document.querySelectorAll(".calculatorNumber.operatorNumber");
const operator = ['-', '+', '/', 'x'];
let calculatorDisplay = document.querySelector('#calculateDisplay');
let choosenValue = ''

calculatorNumber.forEach(element => {
    element.addEventListener('click', () => {
        choosenValue = choosenValue + element.textContent;
        
        calculatorDisplay.textContent = choosenValue;
    })
});

function clearDisplay() {
    calculatorDisplay.textContent = ''
}