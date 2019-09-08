/* globals describe test expect */
import * as db from './database'


describe('Index API', () => {

  const _index = [
    {id: '22'}, {id: '6'}, {id: '3'}, {id: '15'}, {id: '4'}, {id: '11'}, {id: '1'}, {id: '12'}, {id: '9'}, {id: '7'}
  ]
  const index = new db.Index(_index)

  test('a1', () => {
    expect(index.getAfter('3', 4)).toEqual({
      items: [{id: '15'}, {id: '4'}, {id: '11'}, {id: '1'}], 
      hasNext: true, 
      hasPrev: true,
    });
  });

  test('a2', () => {
    expect(index.getAfter(null, 3)).toEqual({
      items: [{id: '22'}, {id: '6'}, {id: '3'}], 
      hasNext: true, 
      hasPrev: false,
    });
  });

  test('a3', () => {
    expect(index.getAfter('12', 10)).toEqual({
      items: [{id: '9'}, {id: '7'}], 
      hasNext: false, 
      hasPrev: true,
    });
  });

  test('b1', () => {
    expect(index.getBefore('1', 4)).toEqual({
      items: [{id: '3'}, {id: '15'}, {id: '4'}, {id: '11'}], 
      hasNext: true, 
      hasPrev: true,
    });
  });

  test('b2', () => {
    expect(index.getBefore(null, 3)).toEqual({
      items: [{id: '12'}, {id: '9'}, {id: '7'}], 
      hasNext: false, 
      hasPrev: true,
    });
  });

  test('b3', () => {
    expect(index.getBefore('3', 10)).toEqual({
      items: [{id: '22'}, {id: '6'}], 
      hasNext: true, 
      hasPrev: false,
    });
  });
});

