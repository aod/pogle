import { createMemo, createSignal } from "solid-js";

import todaysRandomEmote from "./emote";
import { check, Guess, Spot } from "./lib";

import emotes from "./emotes.json";

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

export const pushLetter = (letter: string) => {
  if (guess().length >= 5) {
    return;
  }
  setGuess((g) => g + letter);

  window.localStorage.setItem("guess", guess());
};

export const popLetter = () => {
  setGuess((g) => g.slice(0, -1));

  window.localStorage.setItem("guess", guess());
};

export const tryGuess = () => {
  if (guess().length < 5 || history().length >= 6) {
    return;
  }
  if (!emotes.includes(guess())) {
    return;
  }

  setHistory((h) => [...h, check(todaysRandomEmote, guess())]);
  setGuess("");

  window.localStorage.setItem("history", JSON.stringify(history()));
  window.localStorage.setItem("guess", guess());
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
