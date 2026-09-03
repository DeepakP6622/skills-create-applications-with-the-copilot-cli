#!/usr/bin/env node

const USAGE = 'Usage: node src/calculator.js <number> <operator> <number>';

/**
 * Calculate a result using one of the four basic arithmetic operations:
 * addition (+), subtraction (-), multiplication (*), or division (/).
 *
 * @param {number} leftOperand
 * @param {string} operator
 * @param {number} rightOperand
 * @returns {number}
 */
function calculate(leftOperand, operator, rightOperand) {
  if (!Number.isFinite(leftOperand) || !Number.isFinite(rightOperand)) {
    throw new Error('Operands must be finite numbers.');
  }

  switch (operator) {
    // Addition
    case '+':
      return leftOperand + rightOperand;
    // Subtraction
    case '-':
      return leftOperand - rightOperand;
    // Multiplication
    case '*':
      return leftOperand * rightOperand;
    // Division
    case '/':
      if (rightOperand === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return leftOperand / rightOperand;
    default:
      throw new Error(`Unsupported operator "${operator}". Use +, -, *, or /.`);
  }
}

function parseNumber(value, name) {
  const number = Number(value);

  if (value === undefined || value.trim() === '' || !Number.isFinite(number)) {
    throw new Error(`${name} must be a finite number.`);
  }

  return number;
}

function main() {
  const [, , leftValue, operator, rightValue] = process.argv;

  if (leftValue === undefined || operator === undefined || rightValue === undefined) {
    throw new Error(USAGE);
  }

  const leftOperand = parseNumber(leftValue, 'The first operand');
  const rightOperand = parseNumber(rightValue, 'The second operand');
  const result = calculate(leftOperand, operator, rightOperand);

  console.log(result);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(USAGE);
    process.exitCode = 1;
  }
}

module.exports = { calculate };
