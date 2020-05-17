export function uuidGen(prefix: string) {
  return function() {
    let date = new Date().toISOString();
    let random = Math.random()
      .toString()
      .slice(2);
    return `${prefix}-${date}-${random}`;
  };
}
