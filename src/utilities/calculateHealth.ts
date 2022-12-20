/*
 * This expression keeps the expression prefix. E.g. this expression: `2d6+10-2+1d4` will be matches like so:
 * 1. 2d6
 * 2. +10
 * 3. -2
 * 4. +1d4
 */
const DND_HEALTH_REGEX_EXPRESSION = /([+-]?(?:[0-9]+d[0-9]+|[0-9]+))/gi;

export const calculateHealth = (value: string): number => {
  const cleanedValue = value.replaceAll(' ', '').toLowerCase();
  // If all numbers, this is easyyy
  if (/^[0-9]+$/.test(cleanedValue)) {
    return parseInt(cleanedValue);
  }

  return dndHealthExpression(cleanedValue);
};

const randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const handleExpressionPrefix = (expression: string): { expression: string; negative: boolean } => ({
  expression: expression.replaceAll(/[+-]/g, ''),
  negative: expression.startsWith('-'),
});

const dndDiceThrow = (originalExpression: string): number => {
  // Some idiot might do +5d10, so lets handle prefixes as well
  const { expression, negative } = handleExpressionPrefix(originalExpression);

  const [throws, dice] = expression.split('d').map((value) => parseInt(value));

  let sum = 0;
  for (let i = 0; i < throws; i++) {
    sum += randomNumber(1, dice);
  }

  return sum * (negative ? -1 : 1);
};

const dndHealthExpression = (originalExpression: string): number => {
  const expressions = originalExpression.match(DND_HEALTH_REGEX_EXPRESSION);

  if (!expressions) {
    return 0;
  }

  let sum = 0;
  for (const subExpression of expressions) {
    // Handle DnD dice throws
    if (subExpression.includes('d')) {
      sum += dndDiceThrow(subExpression);
    } else {
      const { expression, negative } = handleExpressionPrefix(subExpression);
      sum += parseInt(expression) * (negative ? -1 : 1);
    }
  }

  return sum;
};
