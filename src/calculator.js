#!/usr/bin/env node

const USAGE = [
  'Usage:',
  '  node src/calculator.js <number> <operator> <number>',
  '  node src/calculator.js sqrt <number>',
].join('\n');

/**
 * Ensure an operand is a finite number before performing a calculation.
 *
 * @param {number} value
 * @param {string} name
 */
function validateOperand(value, name) {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number.`);
  }
}

/**
 * Return the remainder of a division.
 *
 * @param {number} dividend
 * @param {number} divisor
 * @returns {number}
 */
function modulo(dividend, divisor) {
  validateOperand(dividend, 'The first operand');
  validateOperand(divisor, 'The second operand');

  if (divisor === 0) {
    throw new Error('Cannot calculate modulo with zero.');
  }

  return dividend % divisor;
}

/**
 * Raise a base to an exponent.
 *
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
  validateOperand(base, 'The base');
  validateOperand(exponent, 'The exponent');

  return base ** exponent;
}

/**
 * Return the square root of a non-negative number.
 *
 * @param {number} value
 * @returns {number}
 */
function squareRoot(value) {
  validateOperand(value, 'The operand');

  if (value < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(value);
}

/**
 * Calculate a result using arithmetic operations:
 * addition (+), subtraction (-), multiplication (*), division (/),
 * modulo (%), or exponentiation (^). The square root operation is also
 * available as calculate(value, 'sqrt').
 *
 * @param {number} leftOperand
 * @param {string} operator
 * @param {number} [rightOperand]
 * @returns {number}
 */
function calculate(leftOperand, operator, rightOperand) {
  if (operator === 'sqrt' || operator === '√') {
    if (rightOperand !== undefined) {
      throw new Error('Square root accepts one operand.');
    }
    return squareRoot(leftOperand);
  }

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
    // Modulo
    case '%':
      return modulo(leftOperand, rightOperand);
    // Exponentiation
    case '^':
      return power(leftOperand, rightOperand);
    default:
      throw new Error(
        `Unsupported operator "${operator}". Use +, -, *, /, %, ^, or sqrt.`
      );
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
  const args = process.argv.slice(2);

  if (args.length === 2 && (args[0] === 'sqrt' || args[0] === '√')) {
    const value = parseNumber(args[1], 'The operand');
    console.log(squareRoot(value));
    return;
  }

  if (args.length !== 3) {
    throw new Error(USAGE);
  }

  const [leftValue, operator, rightValue] = args;
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

module.exports = { calculate, modulo, power, squareRoot };
