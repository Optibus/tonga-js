import flatten from 'lodash/flatten';
import { Prefetch } from './prefetch';
import { ContextAttributes, Cache } from './constructor-types';
import EventEmitter from 'events';
import { createAnalytics, AnalyticsEmitter } from './utils-for-tests';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getConfData = (context: ContextAttributes): Promise<Cache> =>
  new Promise((resolve) => resolve({ a: 1 }));

test('get', (done) => {
  const preFetch = new Prefetch({ getConfData }, { user: 'me' });
  expect(() => {
    preFetch.get('a');
  }).toThrow();
  preFetch.on('ready', () => {
    const result = preFetch.get('a');
    expect(result).toBe(1);
    done();
  });
});

test('analytics', (done) => {
  const emitter = new EventEmitter();
  const analytics = createAnalytics(emitter);
  const preFetch = new Prefetch({ getConfData, analytics }, { user: 'me' });
  preFetch.on('ready', () => {
    let result = preFetch.get('a');
    expect(result).toBe(1);
    result = preFetch.get('b');
    expect(result).toBe(null);
    emitter.on('invoked', ({ throttleArgs, invocationCounter }: AnalyticsEmitter) => {
      expect(invocationCounter).toBe(1);
      const paths = throttleArgs.map((o) => o.flagKey);
      const values = throttleArgs.map((o) => o.flagValue);
      expect(paths).toEqual(['a', 'b']);
      expect(values).toEqual([1, null]);
      done();
    });
  });
});
