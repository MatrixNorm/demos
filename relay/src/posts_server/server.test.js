/* globals describe test expect */
import * as s from './server'

describe('decodeCursor', () => {

  const base = {nodeId: 'post3', orderedByField: 'createdAt'}

  test('1', () => {
    const cursor = {...base, desc: true}
    expect(s.decodeCursor(JSON.stringify(cursor))).toEqual(['post3', {field: 'createdAt', desc: true}]);
  });

  test('2', () => {
    const cursor = {...base, desc: false}
    expect(s.decodeCursor(JSON.stringify(cursor))).toEqual(['post3', {field: 'createdAt', desc: false}]);
  });

  test('3', () => {
    const cursor = {...base}
    expect(s.decodeCursor(JSON.stringify(cursor))).toEqual(['post3', {field: 'createdAt', desc: false}]);
  });

  test('4', () => {
    const cursor = {...base, desc: null}
    expect(s.decodeCursor(JSON.stringify(cursor))).toEqual(['post3', {field: 'createdAt', desc: false}]);
  });

  test('5', () => {
    const cursor = {...base, desc: undefined}
    expect(s.decodeCursor(JSON.stringify(cursor))).toEqual(['post3', {field: 'createdAt', desc: false}]);
  });

})

