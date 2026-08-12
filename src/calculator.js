#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting arithmetic operations:
 *   - Addition        (+)
 *   - Subtraction      (-)
 *   - Multiplication   (* or x)
 *   - Division         (/)
 *   - Modulo           (%)
 *   - Exponentiation   (^)
 *   - Square root      (sqrt)
 *
 * Usage:
 *   node calculator.js <operation> <a> [b]
 *
 * Examples:
 *   node calculator.js add 2 3        -> 5
 *   node calculator.js subtract 5 3    -> 2
 *   node calculator.js multiply 4 3    -> 12
 *   node calculator.js divide 10 2     -> 5
 *   node calculator.js modulo 10 3     -> 1
 *   node calculator.js power 2 3       -> 8
 *   node calculator.js sqrt 9          -> 3
 */

/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a
 * @param {number} b
 * @returns {number} difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides the first number by the second.
 * Throws an error if dividing by zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} quotient of a and b
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/**
 * Returns the remainder when dividing the first number by the second.
 * Throws an error if dividing by zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} remainder of a divided by b
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

/**
 * Raises the first number to the power of the second.
 * @param {number} a
 * @param {number} b
 * @returns {number} a raised to the power of b
 */
function power(a, b) {
  return a ** b;
}

/**
 * Returns the square root of a number.
 * Throws an error for negative numbers.
 * @param {number} n
 * @returns {number} square root of n
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

// Map of supported operations (and their common aliases) to their functions.
const operations = {
  add: add,
  '+': add,
  subtract: subtract,
  '-': subtract,
  multiply: multiply,
  '*': multiply,
  x: multiply,
  divide: divide,
  '/': divide,
  modulo: modulo,
  '%': modulo,
  power: power,
  '^': power,
  sqrt: squareRoot,
  squareroot: squareRoot,
};

const unaryOperations = new Set(['sqrt', 'squareroot']);

/**
 * Runs the CLI: parses arguments, performs the requested operation,
 * and prints the result (or an error message) to the console.
 */
function main() {
  const [, , operation, ...rawOperands] = process.argv;

  if (!operation) {
    console.error(
      'Usage: node calculator.js <add|subtract|multiply|divide|modulo|power|sqrt|squareroot> <a> [b]'
    );
    process.exitCode = 1;
    return;
  }

  const normalizedOperation = operation.toLowerCase();
  const fn = operations[normalizedOperation];
  if (!fn) {
    console.error(
      `Unknown operation "${operation}". Supported operations: add, subtract, multiply, divide, modulo, power, sqrt, squareroot.`
    );
    process.exitCode = 1;
    return;
  }

  const expectedOperandCount = unaryOperations.has(normalizedOperation) ? 1 : 2;
  if (rawOperands.length !== expectedOperandCount) {
    console.error(
      expectedOperandCount === 1
        ? 'Usage: node calculator.js <sqrt|squareroot> <a>'
        : 'Usage: node calculator.js <add|subtract|multiply|divide|modulo|power> <a> <b>'
    );
    process.exitCode = 1;
    return;
  }

  const operands = rawOperands.map(Number);

  if (operands.some(Number.isNaN)) {
    console.error('All operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = fn(...operands);
    console.log(result);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

// Only run the CLI when this file is executed directly (not when required/imported).
if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
