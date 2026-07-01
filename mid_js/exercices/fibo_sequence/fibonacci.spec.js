const fibonacci = require('./fibonacci');

describe('fibonacci', () => {

  test('Gets the zero element of fibonacci', () => {
    expect(fibonacci(0)).toEqual([0]);
  });

  test('Gets the first element of fibonacci', () => {
    expect(fibonacci(1)).toEqual([0, 1]);
  });

  test('Gets the second element of fibonacci', () => {
    expect(fibonacci(2)).toEqual([0, 1, 1]);
  });

  test('Gets the third element of fibonacci', () => {
    expect(fibonacci(3)).toEqual([0, 1, 1, 2]);
  });

  test('Gets the fourth element of fibonacci', () => {
    expect(fibonacci(4)).toEqual([0, 1, 1, 2, 3]);
  });

  test('Gets the fifth element of fibonacci', () => {
    expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3, 5]);
  });

  test('Gets the sixth element of fibonacci', () => {
    expect(fibonacci(6)).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });
});