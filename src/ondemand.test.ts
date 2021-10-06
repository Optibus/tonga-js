import { Ondemand } from './ondemand';
import { ContextAttributes } from './constructor-types';

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
