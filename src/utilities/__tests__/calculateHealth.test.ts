import { calculateHealth } from '../calculateHealth';

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.223456789);
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
});

describe('calculateHealth', () => {
  test('Non-expressions are handled correctly', async () => {
    expect(calculateHealth('2')).toBe(2);
  });

  test('Expressions without dice throws to be calculated correctly', async () => {
    expect(calculateHealth('10 + 5 - 2 - 7 +13')).toBe(19);
  });

  test('Simple dice throw is simulated correctly', async () => {
    // According to mock, each dice throw returns 2
    expect(calculateHealth('10d6')).toBe(2 * 10);
  });

  test('Dice throw with modifier is simulated correctly', async () => {
    // According to mock, each dice throw returns 2
    expect(calculateHealth('10d6 + 17')).toBe(2 * 10 + 17);
  });

  test('Multiple dice throws with modifiers is simulated correctly', async () => {
    // According to mock, each dice throw returns 2
    expect(calculateHealth('10d6 + 17 - 2d6 + 1')).toBe(2 * 10 + 17 - 2 * 2 + 1);
  });
});
