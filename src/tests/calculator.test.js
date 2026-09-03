const { calculate } = require('../calculator');

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

  test('throws for an unsupported operator', () => {
    expect(() => calculate(2, '%', 3)).toThrow(
      'Unsupported operator "%". Use +, -, *, or /.'
    );
  });

  test('does not silently accept missing operands', () => {
    expect(() => calculate(undefined, '+', 3)).toThrow();
    expect(() => calculate(2, '+', undefined)).toThrow();
  });
});
