let display = document.getElementById('display');
let currentInput = '';
let isOpenBracket = true;

function appendNumber(num) {
  if (num === '+/-') {
    toggleSign();
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (op === '()') {
    currentInput += isOpenBracket ? '(' : ')';
    isOpenBracket = !isOpenBracket;
  } else if (op === '%') {
    currentInput += '/100';
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  display.textContent = '0';
  isOpenBracket = true;
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function calculate() {
  try {
    // Replace symbols with JS-valid syntax
    let expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    let result = eval(expression);
    display.textContent = result;
    currentInput = result.toString();
  } catch (error) {
    display.textContent = 'Error';
    currentInput = '';
  }
}

function toggleSign() {
  // Try to find the last number and toggle its sign
  let tokens = currentInput.match(/(-?\d+\.?\d*)$/);
  if (tokens) {
    let number = tokens[0];
    let negated = parseFloat(number) * -1;
    currentInput = currentInput.slice(0, -number.length) + negated;
  }
}
