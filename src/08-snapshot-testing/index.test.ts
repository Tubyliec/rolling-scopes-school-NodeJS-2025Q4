import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1]);
    expect(list).toStrictEqual({
      value: 1,
      next: {
        value: null,
        next: null,
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2]);
    expect(list).toMatchSnapshot({
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    });
  });
});