const calculatorNumber = document.querySelectorAll(".calculatorNumber");
const operatorNumher = document.querySelectorAll(".calculatorNumber.operatorNumber");
const operator = ['-', '+', '/', '*'];
const operateIcon = document.querySelector("#equalIcon");
const calculatorDisplay = document.querySelector('#calculateDisplay');
const resultDisplay = document.querySelector('#resultDisplay');
let choosenValue = ''

calculatorNumber.forEach(element => {
    if (element.textContent == "AC") {
        clearDisplay(element);
    } else if (element.textContent == "DEL") {
        deleteChoosenValue(element);
    } else if (element.textContent == "=") {
        operate(element);
    } else {
        chooseValue(element);
    }
});

function clearDisplay(element) {
    element.addEventListener('click', clearDisplayFunction)
}

function clearDisplayFunction() {
    choosenValue = ""
    calculatorDisplay.textContent = "";
    resultDisplay.textContent = "";
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

// impelemnt stack to calculate with BODMAS
function calculateBODMAS(expression) {
    const operators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    function applyOperator(operatorsStack, valuesStack) {
        const operator = operatorsStack.pop();
        const right = valuesStack.pop();
        const left = valuesStack.pop();
        switch (operator) {
            case '+':
                valuesStack.push(left + right);
                break;
            case '-':
                valuesStack.push(left - right);
                break;
            case '*':
                valuesStack.push(left * right);
                break;
            case '/':
                valuesStack.push(left / right);
                break;
        }
    }

    const tokens = expression.map(token => {
        if (!isNaN(token)) {
            return parseFloat(token); // Use parseFloat to handle floating-point numbers
        }
        return token;
    });

    const valuesStack = [];
    const operatorsStack = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (typeof token === 'number') {
            valuesStack.push(token);
        } else if (token in operators) {
            while (
                operatorsStack.length > 0 &&
                operatorsStack[operatorsStack.length - 1] in operators &&
                operators[operatorsStack[operatorsStack.length - 1]] >= operators[token]
            ) {
                applyOperator(operatorsStack, valuesStack);
            }
            operatorsStack.push(token);
        }
    }

    while (operatorsStack.length > 0) {
        applyOperator(operatorsStack, valuesStack);
    }

    return valuesStack[0];
}

function operate(element) {
    element.addEventListener('click', () => {
        let calculatorDisplayValue = calculatorDisplay.textContent
        const expression = calculatorDisplayValue.split(' ');

        console.log(expression);

        let result = calculateBODMAS(expression);

        updateResultDisplay(result)
    })
}

function updateResultDisplay(value) {
    calculatorDisplay.textContent = value;
    resultDisplay.textContent = value;
}
