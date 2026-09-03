const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('calculate', () => {
  describe('addition', () => {
    test('adds the example operands from the basic operations image', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('adds negative and decimal numbers', () => {
      expect(calculate(-2.5, '+', 3.75)).toBeCloseTo(1.25);
    });

    test('returns the same value when adding zero', () => {
      expect(calculate(42, '+', 0)).toBe(42);
    });
  });

  describe('subtraction', () => {
    test('subtracts the example operands from the basic operations image', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('supports negative and decimal numbers', () => {
      expect(calculate(-2.5, '-', 3.75)).toBeCloseTo(-6.25);
    });

    test('returns the same value when subtracting zero', () => {
      expect(calculate(42, '-', 0)).toBe(42);
    });
  });

  describe('multiplication', () => {
    test('multiplies the example operands from the basic operations image', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('supports negative and decimal numbers', () => {
      expect(calculate(-2.5, '*', 3.2)).toBeCloseTo(-8);
    });

    test('returns zero when multiplying by zero', () => {
      expect(calculate(42, '*', 0)).toBe(0);
    });
  });

  describe('division', () => {
    test('divides the example operands from the basic operations image', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('supports negative and decimal numbers', () => {
      expect(calculate(-7.5, '/', 2.5)).toBeCloseTo(-3);
    });

    test('throws when dividing by zero', () => {
      expect(() => calculate(20, '/', 0)).toThrow('Cannot divide by zero.');
    });
  });

  describe('modulo', () => {
    test('returns the remainder of a division', () => {
      expect(calculate(5, '%', 2)).toBe(1);
    });

    test('supports negative and decimal numbers', () => {
      expect(modulo(-7.5, 2)).toBeCloseTo(-1.5);
    });

    test('returns zero for evenly divisible operands', () => {
      expect(modulo(42, 7)).toBe(0);
    });

    test('throws when the divisor is zero', () => {
      expect(() => modulo(5, 0)).toThrow('Cannot calculate modulo with zero.');
      expect(() => calculate(5, '%', 0)).toThrow(
        'Cannot calculate modulo with zero.'
      );
    });

    test('throws when an operand is not finite', () => {
      expect(() => modulo(Infinity, 2)).toThrow(
        'The first operand must be a finite number.'
      );
      expect(() => modulo(5, NaN)).toThrow(
        'The second operand must be a finite number.'
      );
    });
  });

  describe('power', () => {
    test('raises a base to an exponent', () => {
      expect(calculate(2, '^', 3)).toBe(8);
      expect(power(2, 3)).toBe(8);
    });

    test('supports zero, negative, and fractional exponents', () => {
      expect(power(7, 0)).toBe(1);
      expect(power(2, -3)).toBeCloseTo(0.125);
      expect(power(9, 0.5)).toBe(3);
    });

    test('throws when an operand is not finite', () => {
      expect(() => power(Infinity, 2)).toThrow(
        'The base must be a finite number.'
      );
      expect(() => power(2, NaN)).toThrow(
        'The exponent must be a finite number.'
      );
    });
  });

  describe('square root', () => {
    test('returns the square root of a non-negative number', () => {
      expect(squareRoot(16)).toBe(4);
      expect(calculate(16, 'sqrt')).toBe(4);
    });

    test('supports zero and decimal numbers', () => {
      expect(squareRoot(0)).toBe(0);
      expect(squareRoot(2.25)).toBe(1.5);
    });

    test('throws for negative numbers', () => {
      expect(() => squareRoot(-1)).toThrow(
        'Cannot calculate the square root of a negative number.'
      );
      expect(() => calculate(-1, '√')).toThrow(
        'Cannot calculate the square root of a negative number.'
      );
    });

    test('throws when the operand is not finite', () => {
      expect(() => squareRoot(Infinity)).toThrow(
        'The operand must be a finite number.'
      );
      expect(() => squareRoot(NaN)).toThrow(
        'The operand must be a finite number.'
      );
    });

    test('does not accept a second operand', () => {
      expect(() => calculate(16, 'sqrt', 2)).toThrow(
        'Square root accepts one operand.'
      );
    });
  });

  test('throws for an unsupported operator', () => {
    expect(() => calculate(2, '?', 3)).toThrow(
      'Unsupported operator "?". Use +, -, *, /, %, ^, or sqrt.'
    );
  });

  test('does not silently accept missing operands', () => {
    expect(() => calculate(undefined, '+', 3)).toThrow();
    expect(() => calculate(2, '+', undefined)).toThrow();
  });
});
