const createSeededRNG = (seed: number) => () => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const createDailyRNG = () => {
  const epoch = new Date(0);
  const now = new Date();
  const millis = now.getTime() - epoch.getTime();

  const day = 24 * 60 * 60 * 1000;
  const diff = Math.round(Math.abs(millis / day));

  return createSeededRNG(diff);
};

export const dailyRNG = createDailyRNG();

export const range = (n: number): Iterable<number> => {
  let i = 0;
  return {
    [Symbol.iterator]: () => ({
      next: () => ({ done: i >= n, value: i++ }),
    }),
  };
};
