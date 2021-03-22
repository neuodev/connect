export const validateInput = input => {
  if (
    input.includes('\\') ||
    input.includes('(') ||
    input.includes(')') ||
    input.includes('*') ||
    input.includes('^') ||
    input.includes('$') ||
    input.includes('+') ||
    input.includes(']') ||
    input.includes('[') ||
    input.includes('}') ||
    input.includes('{') ||
    input.includes('.') ||
    input.includes('~')
  ) {
    return false;
  }
  return true;
};
