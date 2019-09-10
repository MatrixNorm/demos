import * as s from './server'

//const sum = server.__get__('sum')

test('adds 1 + 2 to equal 3', () => {
  expect(s.sum(1, 2)).toBe(3);
});