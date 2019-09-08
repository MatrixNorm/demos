import * as db from './database'


test('adds 1 + 2 to equal 3', () => {
  const _index = [
    {id: '22'}, {id: '6'}, {id: '3'}, {id: '15'}, {id: '4'}, {id: '11'}, {id: '1'}, {id: '12'}, {id: '9'}, {id: '7'}
  ]
  const index = new db.Index(_index)
  expect(index.getAfter('3', 4)).toBe({
    items: [{id: '15'}, {id: '4'}, {id: '11'}, {id: '1'}], 
    hasNext: true, 
    hasPrev: true,
  });
});