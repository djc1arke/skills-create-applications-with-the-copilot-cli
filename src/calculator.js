#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic
 * arithmetic operations, plus additional operations:
 *   - Addition          (+)
 *   - Subtraction       (-)
 *   - Multiplication    (* or x)
 *   - Division          (/)
 *   - Modulo            (%)
 *   - Exponentiation    (^ or **)
 *   - Square Root       (sqrt) - unary operation
 *
 * Usage:
 *   node calculator.js <operation> <a> [b]
 *   (square root only takes a single operand: <a>)
 *
 * Examples:
 *   node calculator.js add 2 3          -> 5
 *   node calculator.js subtract 5 3      -> 2
 *   node calculator.js multiply 4 3      -> 12
 *   node calculator.js divide 10 2       -> 5
 *   node calculator.js modulo 10 3       -> 1
 *   node calculator.js power 2 8         -> 256
 *   node calculator.js sqrt 16           -> 4
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
 * Returns the remainder of a divided by b.
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
 * Raises a base number to the given exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number} base raised to the power of exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Returns the square root of a number.
 * Throws an error if the number is negative.
 * @param {number} n
 * @returns {number} square root of n
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot compute the square root of a negative number.');
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
  '**': power,
  sqrt: squareRoot,
  squareroot: squareRoot,
};

// Operations that take only a single operand (unary), e.g. square root.
const unaryOperations = new Set(['sqrt', 'squareroot']);

/**
 * Runs the CLI: parses arguments, performs the requested operation,
 * and prints the result (or an error message) to the console.
 */
function main() {
  const [, , operation, rawA, rawB] = process.argv;
  const supported = 'add, subtract, multiply, divide, modulo, power, sqrt';

  if (!operation || rawA === undefined) {
    console.error(`Usage: node calculator.js <${supported}> <a> [b]`);
    process.exitCode = 1;
    return;
  }

  const opKey = operation.toLowerCase();
  const fn = operations[opKey];
  if (!fn) {
    console.error(`Unknown operation "${operation}". Supported operations: ${supported}.`);
    process.exitCode = 1;
    return;
  }

  const isUnary = unaryOperations.has(opKey);

  if (!isUnary && rawB === undefined) {
    console.error(`Operation "${operation}" requires two operands: <a> <b>.`);
    process.exitCode = 1;
    return;
  }

  const a = Number(rawA);
  const b = isUnary ? undefined : Number(rawB);

  if (Number.isNaN(a) || (!isUnary && Number.isNaN(b))) {
    console.error('All operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = isUnary ? fn(a) : fn(a, b);
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
