#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic
 * arithmetic operations:
 *   - Addition        (+)
 *   - Subtraction      (-)
 *   - Multiplication   (* or x)
 *   - Division         (/)
 *
 * Usage:
 *   node calculator.js <operation> <a> <b>
 *
 * Examples:
 *   node calculator.js add 2 3        -> 5
 *   node calculator.js subtract 5 3    -> 2
 *   node calculator.js multiply 4 3    -> 12
 *   node calculator.js divide 10 2     -> 5
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
};

/**
 * Runs the CLI: parses arguments, performs the requested operation,
 * and prints the result (or an error message) to the console.
 */
function main() {
  const [, , operation, rawA, rawB] = process.argv;

  if (!operation || rawA === undefined || rawB === undefined) {
    console.error('Usage: node calculator.js <add|subtract|multiply|divide> <a> <b>');
    process.exitCode = 1;
    return;
  }

  const fn = operations[operation.toLowerCase()];
  if (!fn) {
    console.error(
      `Unknown operation "${operation}". Supported operations: add, subtract, multiply, divide.`
    );
    process.exitCode = 1;
    return;
  }

  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Both operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = fn(a, b);
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

module.exports = { add, subtract, multiply, divide };
