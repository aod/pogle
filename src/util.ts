import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

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

export function createPublisher<Subject extends (...args: any) => any>(
  subject: Subject
) {
  type Return = ReturnType<Subject>;
  type Subscriber = (arg: Return) => void;

  const subscribers = new Set<Subscriber>();

  const publisher = (...args: Parameters<Subject>): Return => {
    const result = subject(args);
    subscribers.forEach((fn) => {
      fn(result);
    });
    return result;
  };

  const subscribe = (sub: Subscriber) => {
    onMount(() => subscribers.add(sub));
    onCleanup(() => subscribers.delete(sub));
  };

  return { publisher, subscribe };
}

export function createStorageSignal<T>(
  key: string,
  ...args: Parameters<typeof createSignal<T>>
): ReturnType<typeof createSignal<T>> {
  const [accessor, setter] = createSignal(...args);

  const item = window.localStorage.getItem(key)
  if (item) {
    try {
      const value = JSON.parse(item) as T
      // @ts-ignore
      setter(value)
    } catch {}
  }

  createEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(accessor()))
  });

  return [accessor, setter];
}
