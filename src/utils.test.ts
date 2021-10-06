import { getter } from './utils';

describe('Util functions', () => {
  describe('Getter', () => {
    test('basic', () => {
      const obj = { a: { b: '1' } };
      const result = getter(obj, 'a.b');
      expect(result).toBe('1');
    });
    test('empty', () => {
      const obj = { a: { b: '1' } };
      const result = getter(obj, 'a.b.c.d');
      expect(result).toBeNull();
    });
    test('array', () => {
      const obj = { a: { b: ['x', 'y'] } };
      const result = getter(obj, 'a.b.1');
      expect(result).toBe('y');
    });
  });
});
