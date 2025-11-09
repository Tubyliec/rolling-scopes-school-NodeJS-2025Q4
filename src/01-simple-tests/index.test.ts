import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 4, action: Action.Add });
    expect(result).toEqual(6);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 3, action: Action.Subtract });
    expect(result).toEqual(4);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: Action.Multiply });
    expect(result).toEqual(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 32, b: 8, action: Action.Divide });
    expect(result).toEqual(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 3, b: 3, action: '42' });
    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 12, b: '32', action: Action.Divide });
    expect(result).toEqual(null);
  });
});