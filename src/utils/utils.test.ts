import { _getter as getter, ObjectSet, debounce, throttle } from './index';
import EventEmitter from 'events';

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

    test('false', () => {
      const obj = { a: { b: false } };
      const result = getter(obj, 'a.b');
      expect(result).toBe(false);
    });

    test('array', () => {
      const obj = { a: { b: ['x', 'y'] } };
      const result = getter(obj, 'a.b.1');
      expect(result).toBe('y');
    });
  });

  describe('Debounce & Throttle', () => {
    test('debounce basic', (done) => {
      const emitter = new EventEmitter();
      const originalFn = (arr: number[]) => {
        const result = arr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        emitter.emit('done', result);
        return result;
      };
      const debouncedFn = debounce(originalFn, 100);
      emitter.on('done', (value) => {
        expect(value).toBe(3);
        done();
      });
      debouncedFn(1);
      debouncedFn(1);
      debouncedFn(1);
      debouncedFn(2);
    });
    test('throttle basic', (done) => {
      const emitter = new EventEmitter();
      const originalFn = (arr: number[]) => {
        const result = arr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        emitter.emit('done', result);
        return result;
      };
      const throttledFn = throttle(originalFn, 100);
      emitter.on('done', (value) => {
        expect(value).toBe(3);
        done();
      });
      throttledFn(1);
      throttledFn(1);
      throttledFn(1);
      throttledFn(2);
    });
  });

  describe('ObjectSet', () => {
    test('addMany should add only 1', () => {
      const obj = new ObjectSet();
      obj.addMany([
        {
          flagKey: '1',
          flagValue: '2',
        },
        {
          flagKey: '1',
          flagValue: '2',
        },
      ]);
      const size = obj.size();
      expect(size).toBe(1);
    });

    test('add twice should add only 1', () => {
      const obj = new ObjectSet();
      obj.add({
        flagKey: '1',
        flagValue: '2',
      });
      obj.add({
        flagKey: '1',
        flagValue: '2',
      });
      const size = obj.size();
      expect(size).toBe(1);
    });

    test('getAll', () => {
      const obj = new ObjectSet();
      obj.add({
        flagKey: '1',
        flagValue: '2',
      });
      obj.add({
        flagKey: '3',
        flagValue: '3',
      });
      obj.add({
        flagKey: '1',
        flagValue: '2',
      });
      const size = obj.size();
      expect(size).toBe(2);
      const all = obj.getAll();
      expect(all.length).toBe(2);
    });
  });
});
