const EPOCH_DATE = new Date(0);
const DAYS_IN_MS = 24 * 60 * 60 * 1000;

const createSeededRNG = (seed: number) => () => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const daysSinceEpoch = () => {
  const now = new Date();
  const millis = now.getTime() - EPOCH_DATE.getTime();
  const days = Math.round(Math.abs(millis / DAYS_IN_MS));
  return days;
};

const createDailyRNG = () => {
  return createSeededRNG(daysSinceEpoch());
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
