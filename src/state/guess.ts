import { batch } from "solid-js";

import { todaysRandomEmote } from ".";
import { board, isDone, setBoard } from "./board";

import emotes from "../assets/emotes.json";
import { check } from "../lib";
import { createPublisher, createStorageSignal } from "../util";

export const [guess, setGuess] = createStorageSignal("guess", "");

export const pushLetter = (letter: string) => {
  if (guess().length < 5 && !isDone()) setGuess((g) => g + letter);
};

export const popLetter = () => {
  setGuess((g) => g.slice(0, -1));
};

export const tryGuessImpl = () => {
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

export const { publisher: tryGuess, subscribe: onTryGuess } =
  createPublisher(tryGuessImpl);
