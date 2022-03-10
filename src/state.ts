import { createEffect, createMemo, createSignal } from "solid-js";

import emotes from "./emotes.json";
import todaysRandomEmote from "./emote";
import { check, Guess, Spot } from "./lib";

if (window.localStorage.getItem("forsenCD") !== todaysRandomEmote) {
  window.localStorage.setItem("forsenCD", todaysRandomEmote);
  window.localStorage.setItem("guess", "");
  window.localStorage.setItem("history", "[]");
}

const [guess, setGuess] = createSignal(
  window.localStorage.getItem("guess") ?? ""
);
const [history, setHistory] = createSignal<Guess[]>(
  JSON.parse(window.localStorage.getItem("history") ?? "[]")
);
export { guess, history };

createEffect(() => window.localStorage.setItem("guess", guess()));
createEffect(() =>
  window.localStorage.setItem("history", JSON.stringify(history()))
);

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
