const calculatorNumber = document.querySelectorAll(".calculatorNumber");
const operatorNumher = document.querySelectorAll(".calculatorNumber.operatorNumber");
const operator = ['-', '+', '/', 'x'];
let calculatorDisplay = document.querySelector('#calculateDisplay');
let choosenValue = ''

calculatorNumber.forEach(element => {
    if (element.textContent == "AC") {
        clearDisplay(element);
    } else if (element.textContent == "DEL") {
        deleteChoosenValue(element);
    } else {
        chooseValue(element);
    }
});

function clearDisplay(element) {
    element.addEventListener('click', () => {
        choosenValue = ""
        calculatorDisplay.textContent = "";
        console.log("Display clean");
    })
}

function chooseValue(element) {
    element.addEventListener('click', () => {
        if (operator.includes(element.textContent)) {
            console.log("you choose an operator");
            choosenValue = choosenValue + ` ${element.textContent} `;
        } else {
            choosenValue = choosenValue + element.textContent;
        }

        calculatorDisplay.textContent = choosenValue;
    })
}

function deleteChoosenValue(element) {
    element.addEventListener('click', () => {
        console.log("You choose delete button");
        choosenValue = calculatorDisplay.textContent.slice(0, -1)
        calculatorDisplay.textContent = choosenValue;
    })
}

