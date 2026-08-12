/**
 * calculator.test.js
 *
 * Unit tests for the calculator functions (add, subtract, multiply, divide,
 * modulo, power, squareRoot) defined in src/calculator.js.
 *
 * Basic examples covered (from images/calc-basic-operations.png):
 *   2 + 3  = 5
 *   10 - 4 = 6
 *   45 * 2 = 90
 *   20 / 5 = 4
 *
 * Extended examples covered (from images/calc-extended-operations.png):
 *   5 % 2  = 1
 *   2 ^ 3  = 8
 *   √16    = 4
 *
 * Additional edge cases are covered for each operation, including
 * negative numbers, decimals, zero, division by zero, modulo by zero,
 * and square root of a negative number.
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
  test('example: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('returns 0 when evenly divisible', () => {
    expect(modulo(10, 5)).toBe(0);
  });

  test('handles negative dividend', () => {
    expect(modulo(-7, 3)).toBe(-1);
  });

  test('handles negative divisor', () => {
    expect(modulo(7, -3)).toBe(1);
  });

  test('handles decimal operands', () => {
    expect(modulo(5.5, 2)).toBeCloseTo(1.5);
  });

  test('throws an error when modulo by zero', () => {
    expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('example: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('raises a number to the power of 0', () => {
    expect(power(5, 0)).toBe(1);
  });

  test('raises a number to the power of 1', () => {
    expect(power(9, 1)).toBe(9);
  });

  test('handles negative exponents', () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });

  test('handles a negative base with an even exponent', () => {
    expect(power(-2, 2)).toBe(4);
  });

  test('handles a negative base with an odd exponent', () => {
    expect(power(-2, 3)).toBe(-8);
  });

  test('handles decimal base and exponent', () => {
    expect(power(2.5, 2)).toBeCloseTo(6.25);
  });
});

describe('squareRoot', () => {
  test('example: √16 = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('returns 0 for the square root of 0', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('returns a decimal result for non-perfect squares', () => {
    expect(squareRoot(2)).toBeCloseTo(1.4142135623730951);
  });

  test('returns a decimal input square root correctly', () => {
    expect(squareRoot(6.25)).toBeCloseTo(2.5);
  });

  test('throws an error for negative numbers', () => {
    expect(() => squareRoot(-9)).toThrow(
      'Cannot compute the square root of a negative number.'
    );
  });
});
