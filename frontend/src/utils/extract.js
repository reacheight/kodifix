export function extract(code) {
  if (typeof code !== 'string') {
    return null;
  }

  const index = code.indexOf('(');

  if (index) {
    const name = code.slice(0, index);
    const brackets = code.slice(index + 1, -1);
    return { name, brackets: `(${brackets})` };
  }

  return null;
}
