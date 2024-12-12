const displayCurrent = document.querySelector("#current-displayed-number");
const displayPrevious = document.querySelector("#previous-displayed-number");
const actionButtons = document.querySelectorAll("#action-button");
const operatorButtons = document.querySelectorAll("#operator-button");
const equalButton = document.querySelector("#equal-button");
const allClearButton = document.querySelector("#all-clear-button");
const deleteButton = document.querySelector("#delete-button");

let isSum = false;

let current = "";
let previous = "";
let operator = "";

function updateDisplay() {
  displayCurrent.textContent = current;
  displayPrevious.textContent = previous + operator;
}

function allClear() {
  current = "";
  previous = "";
  operator = "";
  updateDisplay();
}

function deleteSingle() {
  current = current.substring(0, current.length - 1);
  updateDisplay();
}

function operate(num1, operator, num2) {
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);
  switch(operator) {
    case "+":
      return number1 + number2;
    case "×":
      return number1 * number2;
    case "÷":
      return number1 / number2;
    case "-": 
      return number1 - number2;
  }
}

function addNumber(number) {
  if (isSum) {
    allClear();
    isSum = false;
  }
  if (!(number == "." && !current || number == "." && current.includes("."))) {
    current += number;
    updateDisplay();
  } 
}

function addOperator(opt) {
  if (isSum) {
    isSum = false;
  }
  if (previous) {
      current = operate(previous, operator, current);
      operator = "";
    }
    operator = opt;
    previous = current;
    current = "";
    updateDisplay();
}

actionButtons.forEach(button => {
  button.addEventListener("click", () => addNumber(button.textContent))
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => addOperator(button.textContent))
})

equalButton.addEventListener("click", () => {
  if (previous && operator && current) {
    current = operate(previous, operator, current);
    previous = "";
    operator = "";
    isSum = true;
    updateDisplay();
  }
});

deleteButton.addEventListener("click", deleteSingle);

allClearButton.addEventListener("click", allClear);