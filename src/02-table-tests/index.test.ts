import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 7, b: 2, action: Action.Subtract, expected: 5 },
    { a: 11, b: 9, action: Action.Subtract, expected: 2 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 25, b: 5, action: Action.Divide, expected: 5 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
    { a: 6, b: 8, action: 'five', expected: null },
    { a: 6, b: 8, action: 'goal', expected: null },
    { a: 12, b: '27', action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `simpleCalculator with: a - "$a", b - "$b", action - "$action" should return "$expected".`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});