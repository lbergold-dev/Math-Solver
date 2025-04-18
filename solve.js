const ORDER_OF_OPERATIONS = [
  {
    operators: ["^"],
    "^": (a, b) => a ** b,
  },
  {
    operators: ["*", "/"],
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? NaN : a / b),
  },
  {
    operators: ["+", "-"],
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  },
];

const REGEX = {
  allowedChars: /^[0-9.\-+*/^()[\]]+$/,
  spaces: /\s+/g,
  minusBeforeBracket: /(^|[^\d\)])-(?=\()/g,
  bracketContent: /\(([^()]+)\)/,
  mathTokens: /(?<=^|[+\-*/^])[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[+\-*/^]/g,
  exponential: /e([+-]\d+)/,
};

export function solveCalculation(input) {
  if (!input) return "";
  let expression = preprocessInput(input);

  if (!REGEX.allowedChars.test(expression)) return "Error";

  while (REGEX.bracketContent.test(expression)) {
    expression = expression.replace(REGEX.bracketContent, (_, inner) => evaluate(inner));
  }

  let result = evaluate(expression);
  return formatResult(result);
}

function preprocessInput(input) {
  return input.replace(REGEX.spaces, "").replace(REGEX.minusBeforeBracket, "$1-1*");
}

function evaluate(expr) {
  let tokens = tokenize(expr);
  tokens = parseNumbers(tokens);

  for (const ops of ORDER_OF_OPERATIONS) {
    tokens = applyOperations(tokens, ops);
    if (tokens.includes("Error")) return "Error";
  }

  return tokens.length === 1 ? tokens[0] : "Error";
}

function tokenize(expr) {
  return expr.match(REGEX.mathTokens) || [];
}

function parseNumbers(tokens) {
  return tokens.map(token => {
    const num = Number(token);
    return isNaN(num) ? token : num;
  });
}

function applyOperations(tokens, ops) {
  let result = [...tokens];

  while (result.some(t => ops.operators.includes(t))) {
    const i = result.findIndex(t => ops.operators.includes(t));
    const [a, op, b] = result.slice(i - 1, i + 2);
    const computed = ops[op](a, b);
    if (isNaN(computed)) return ["Error"];
    result.splice(i - 1, 3, computed);
  }

  return result;
}

function formatResult(num) {
  const str = num.toString();
  return REGEX.exponential.test(str)
    ? str.replace(REGEX.exponential, (_, exp) => `*10^${exp}`)
    : str;
}
