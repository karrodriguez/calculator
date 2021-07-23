// ---------------------------- OPERATIONS ---------------------------- //
const add = function(a, b) {
    return a + b;
  };
  
const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
}

const power = function(a, b) {
    return a**b;    
};

const factorial = function(a) {
    if (a == 0) {
        return 1;
    }
    return a * factorial(a - 1);
}

const percentOf = function(a, b) {
    return b * (a / 100);
}

const operate = function(operator, a, b) {
    return operator(a, b);
}

// ---------------------------- DISPLAY CALLBACKS ---------------------------- //
const keyPadButtons = document.querySelectorAll(".keyPadBtn");
const expressionPanel = document.querySelector("#expressionText");

const operatorPointers = {
    "factorial": factorial,
    "power": power,
    "multiply": multiply,
    "divide": divide,
    "add": add,
    "subtract": subtract,
    "calculate": "calculate",
};

let currentNumber = "";
let expression = [];

function displayButtonVal() {
    if (this.classList.contains("number") || this.classList.contains("arithmetic")) {
        const textClicked = document.createElement("span");
        textClicked.textContent = this.textContent;
        textClicked.style.cssText = "color: white; font-size: 18px; padding: 1px";

        expressionPanel.appendChild(textClicked);
    }
}

function getButtonType() {
    if (this.classList.contains("number")) {
        currentNumber += this.textContent;
    }

    else if (this.classList.contains("operator")) {
        if (currentNumber !== "") {expression.push(+currentNumber)};
        currentNumber = "";
        expression.push(operatorPointers[this.id]);
    }

    if (this.id === "calculate") {
        expression = expression.filter(elem => (elem !== "calculate") ? true:false);
        const finalResult = calculate();
    }
}

function calculate() {
    while (typeof expression[1] === "function") {
        let currentResult = operate(expression[1], expression[0], expression[2]);
        expression.splice(0, 3, currentResult);
    }

    return expression[0];
}

keyPadButtons.forEach(btn => btn.addEventListener("click", displayButtonVal));
keyPadButtons.forEach(btn => btn.addEventListener("click", getButtonType));



