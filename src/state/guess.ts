import { batch, createEffect, createSignal } from "solid-js";

import { todaysRandomEmote } from ".";
import { board, hasWon, setBoard } from "./board";

import emotes from "../assets/emotes.json";
import { check } from "../lib";

export const [guess, setGuess] = createSignal(
  window.localStorage.getItem("guess") ?? ""
);

createEffect(() => window.localStorage.setItem("guess", guess()));

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
  if (guess().length < 5 || board().length >= 6) {
    return false;
  }
  if (!emotes.includes(guess())) {
    return false;
  }

  batch(() => {
    setBoard((board) => [...board, check(todaysRandomEmote, guess())]);
    setGuess("");
  });

  return true;
};
