/**
 * calculator.test.js
 *
 * Unit tests for the calculator functions
 * defined in src/calculator.js.
 *
 * Basic examples covered (from images/calc-basic-operations.png):
 *   2 + 3  = 5
 *   10 - 4 = 6
 *   45 * 2 = 90
 *   20 / 5 = 4
 *
 * Additional edge cases are covered for each operation, including
 * negative numbers, decimals, zero, and operation-specific error handling.
 */

const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('add', () => {
  test('example: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds two positive numbers', () => {
    expect(add(10, 15)).toBe(25);
  });

  test('adds a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  test('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds zero to a number', () => {
    expect(add(7, 0)).toBe(7);
  });

  test('adds decimal numbers', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });
});

describe('subtract', () => {
  test('example: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts two positive numbers', () => {
    expect(subtract(20, 8)).toBe(12);
  });

  test('subtracts resulting in a negative number', () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test('subtracts a negative number', () => {
    expect(subtract(5, -5)).toBe(10);
  });

  test('subtracts zero from a number', () => {
    expect(subtract(9, 0)).toBe(9);
  });

  test('subtracts decimal numbers', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

describe('multiply', () => {
  test('example: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies two positive numbers', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test('multiplies by zero', () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test('multiplies two negative numbers (result positive)', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  test('multiplies a positive and a negative number (result negative)', () => {
    expect(multiply(-3, 4)).toBe(-12);
  });

  test('multiplies decimal numbers', () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
  });
});

describe('divide', () => {
  test('example: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides two positive numbers', () => {
    expect(divide(9, 3)).toBe(3);
  });

  test('divides resulting in a decimal', () => {
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test('divides a negative number by a positive number', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('divides two negative numbers (result positive)', () => {
    expect(divide(-12, -4)).toBe(3);
  });

  test('divides zero by a non-zero number', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws an error when dividing zero by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('modulo', () => {
  test('returns the remainder of two positive numbers', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('returns zero when the dividend is evenly divisible', () => {
    expect(modulo(12, 4)).toBe(0);
  });

  test('returns the JavaScript remainder for negative dividends', () => {
    expect(modulo(-10, 3)).toBe(-1);
  });

  test('throws an error when taking modulo by zero', () => {
    expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('raises a number to a positive exponent', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('returns 1 when the exponent is zero', () => {
    expect(power(9, 0)).toBe(1);
  });

  test('supports negative exponents', () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });
});

describe('squareRoot', () => {
  test('returns the square root of a perfect square', () => {
    expect(squareRoot(9)).toBe(3);
  });

  test('returns zero for zero', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('returns the square root of a decimal number', () => {
    expect(squareRoot(2.25)).toBeCloseTo(1.5);
  });

  test('throws an error for negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed.');
  });
});
