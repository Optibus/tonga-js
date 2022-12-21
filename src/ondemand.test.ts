import { Ondemand } from './ondemand';
import { ContextAttributes } from './constructor-types';
import { createAnalytics, AnalyticsEmitter } from './utils-for-tests';
import EventEmitter from 'events';

type CounterObj = {
  counter: number;
  path: string;
  context: ContextAttributes;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createMockGetFlag = (path: string, value: number, counterObj: CounterObj) => {
  return (path: string, context: ContextAttributes) => {
    counterObj.counter++;
    counterObj.path = path;
    counterObj.context = context;
    return new Promise((resolve) => resolve(value));
  };
};

test('basic', async () => {
  const counterObj = { counter: 0, path: '', context: {} };
  const context = { user: 'me' };
  const path = 'a';
  const value = 1;
  const getFlag = createMockGetFlag(path, value, counterObj);
  const ondemand = new Ondemand({ getFlag }, context);
  const result = await ondemand.get(path);
  expect(result).toBe(value);
  const result1 = await ondemand.get(path);
  expect(result1).toBe(value);
  expect(counterObj.counter).toBe(1); // cache was used
  expect(counterObj.context).toBe(context);
  expect(counterObj.path).toBe(path);
});

test('analytics', (done) => {
  const emitter = new EventEmitter();
  const analytics = createAnalytics(emitter);
  const counterObj = { counter: 0, path: '', context: {} };
  const context = { user: 'me' };
  const path = 'a';
  const value = 1;
  const getFlag = createMockGetFlag(path, value, counterObj);
  const ondemand = new Ondemand({ getFlag, analytics }, context);
  ondemand.get(path).then(() => {
    emitter.on('invoked', ({ debounceArgs, invocationCounter }: AnalyticsEmitter) => {
      expect(invocationCounter).toBe(1);
      const paths = debounceArgs.map((o) => o.flagKey);
      const values = debounceArgs.map((o) => o.flagValue);
      expect(paths).toEqual(['a']);
      expect(values).toEqual([1]);
      done();
    });
  });
});

describe('grave yard', () => {
  test('no graveyard but still works', async () => {
    const counterObj = { counter: 0, path: '', context: {} };
    const path = 'a';
    const value = 1;
    const getFlag = createMockGetFlag(path, value, counterObj);
    const ondemand = new Ondemand({ getFlag }, { user: 'me' });
    const result = await ondemand.get(path);
    expect(result).toBe(value);
  });

  test('no graveyard but still works', async () => {
    const counterObj = { counter: 0, path: '', context: {} };
    const path = 'shouldBeDeleted';
    const value = 1;
    const getFlag = createMockGetFlag(path, value, counterObj);
    const ondemand = new Ondemand({ getFlag }, { user: 'me' }, { graveYard: { key: 'graveYard' } });
    const result = await ondemand.get(path);
    expect(result).toBe(value);
  });
});
