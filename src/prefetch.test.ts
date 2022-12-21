import { Prefetch } from './prefetch';
import { ContextAttributes, Cache } from './constructor-types';
import EventEmitter from 'events';
import { createAnalytics, AnalyticsEmitter } from './utils-for-tests';

const testData = { a: 1, b: 2, d: { f: 1 } };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getConfData = (context: ContextAttributes): Promise<Cache> =>
  new Promise((resolve) => resolve(testData));

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
    expect(result).toBe(2);
    result = preFetch.get('b');
    expect(result).toBe(2);
    result = preFetch.get('c');
    expect(result).toBe(null);
    result = preFetch.get('d');
    expect(result).toStrictEqual({ f: 1 });
    emitter.on('invoked', ({ debounceArgs, invocationCounter }: AnalyticsEmitter) => {
      expect(invocationCounter).toBe(1);
      const paths = debounceArgs.map((o) => o.flagKey);
      const values = debounceArgs.map((o) => o.flagValue);
      expect(paths).toEqual(['a', 'b', 'c']);
      expect(values).toEqual([1, 2, null]);
      done();
    });
  });
});

describe('grave yard', () => {
  test('no graveyard but still works', async () => {
    const preFetch = new Prefetch(
      {
        getConfData: () => Promise.resolve(testData),
      },
      { user: 'me' },
    );
    const readyFn = () => new Promise((resolve) => preFetch.on('ready', resolve));
    await readyFn();
    const result = preFetch.get('shouldBeDeleted');
    expect(result).toBeNull();
  }, 10000);

  test('basic', async () => {
    const preFetch = new Prefetch(
      {
        getConfData: () =>
          Promise.resolve(Object.assign({}, testData, { graveYard: { shouldBeDeleted: true } })),
      },
      { user: 'me' },
      { graveYard: { key: 'graveYard' }, isAsync: true },
    );
    const readyFn = () => new Promise((resolve) => preFetch.on('ready', resolve));
    await readyFn();
    const result = preFetch.get('shouldBeDeleted');
    expect(result).toBe(true);
  }, 10000);

  test('with log', async () => {
    const mockFn = jest.fn();
    const preFetch = new Prefetch(
      {
        getConfData: () =>
          Promise.resolve(Object.assign({}, testData, { graveYard: { shouldBeDeleted: true } })),
      },
      { user: 'me' },
      { graveYard: { key: 'graveYard', log: mockFn }, isAsync: true },
    );
    const readyFn = () => new Promise((resolve) => preFetch.on('ready', resolve));
    await readyFn();
    const result = preFetch.get('shouldBeDeleted');
    expect(result).toBe(true);
    expect(mockFn).toBeCalledTimes(1);
  }, 10000);
});
