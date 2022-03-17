import {
  batch,
  createEffect,
  createMemo,
  createReaction,
  createSignal,
  JSXElement,
} from "solid-js";

import emotes from "./assets/emotes.json";
import { check, createStats, Guess, Spot, Stats } from "./lib";
import { dailyRNG, daysSinceEpoch } from "./util";

const CACHE_KEY_ID = "cacheKey";
const CACHE_KEY = daysSinceEpoch();

export const todaysRandomEmote = emotes[Math.floor(dailyRNG() * emotes.length)];

const [guess, setGuess] = createSignal(
  window.localStorage.getItem("guess") ?? ""
);
const [history, setHistory] = createSignal<Guess[]>(
  JSON.parse(window.localStorage.getItem("history")!) ?? []
);
const [stats, setStats] = createSignal<Stats>(
  JSON.parse(window.localStorage.getItem("stats")!) ?? createStats()
);
const [modalContent, setModalContent] = createSignal<JSXElement>();
export { guess, history, modalContent, stats };

createEffect(() => window.localStorage.setItem("guess", guess()));
createEffect(() =>
  window.localStorage.setItem("history", JSON.stringify(history()))
);
createEffect(() =>
  window.localStorage.setItem("stats", JSON.stringify(stats()))
);

if (window.localStorage.getItem(CACHE_KEY_ID) !== CACHE_KEY.toString()) {
  window.localStorage.setItem(CACHE_KEY_ID, CACHE_KEY.toString());
  batch(() => {
    setGuess("");
    setHistory([]);
    setStats((prev) => ({ ...prev, prevGuesses: -1 }));
  });
}

export const pushLetter = (letter: string) => {
  if (guess().length >= 5 || hasWon()) {
    return;
  }
  setGuess((g) => g + letter);
};

export const popLetter = () => {
  setGuess((g) => g.slice(0, -1));
};

export const tryGuess = () => {
  if (guess().length < 5 || history().length >= 6) {
    return false;
  }
  if (!emotes.includes(guess())) {
    return false;
  }

  setHistory((h) => [...h, check(todaysRandomEmote, guess())]);
  setGuess("");

  return true;
};

export const keyboard = createMemo(() => {
  const lut: Record<string, Spot> = {};

  for (const his of history()) {
    for (let i = 0; i < his.guess.length; i++) {
      const c = his.guess[i];

      lut[c] ??= his.spots[i];
      if (his.spots[i] > lut[c]) lut[c] = his.spots[i];
    }
  }

  return lut;
});

export const hasWon = createMemo(() => {
  const his = history();
  return (
    his.length !== 0 &&
    his[his.length - 1].spots.every((spot) => spot === Spot.Correct)
  );
});
export const hasLost = createMemo(() => history().length === 6 && !hasWon());

export const showModal = (content: JSXElement) => {
  setModalContent(content);
};

export const closeModal = () => {
  setModalContent(undefined);
};

const isDone = createMemo(() => history().length === 6 || hasWon());
const track = createReaction(() =>
  setStats((prev) => {
    const nextCurrentStreak = hasWon() ? prev.currentStreak + 1 : 0;

    return {
      ...prev,
      played: prev.played + 1,
      won: hasWon() ? prev.won + 1 : prev.won,
      currentStreak: nextCurrentStreak,
      maxStreak:
        nextCurrentStreak >= prev.maxStreak
          ? nextCurrentStreak
          : prev.maxStreak,
      guessDistribution: hasLost()
        ? prev.guessDistribution
        : prev.guessDistribution.map((guesses, idx) =>
            idx === history().length - 1 ? guesses + 1 : guesses
          ),
      prevGuesses: hasWon() ? history().length : -1,
    };
  })
);
track(() => isDone());
