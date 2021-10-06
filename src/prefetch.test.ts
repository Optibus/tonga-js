import { Prefetch } from './prefetch';
import { ContextAttributes } from './constructor-types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getConfData = (context: ContextAttributes) => new Promise((resolve) => resolve({ a: 1 }));

test('get', () => {
  const preFetch = new Prefetch({ getConfData }, { user: 'me' });
  expect(() => {
    preFetch.get('a');
  }).toThrow();
  preFetch.on('ready', () => {
    const result = preFetch.get('a');
    expect(result).toBe(1);
  });
});
