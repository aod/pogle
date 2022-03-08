import { createSignal } from "solid-js";
import { check, Guess } from "./lib";

const [guess, setGuess] = createSignal("");
export { guess };

const [history, setHistory] = createSignal<Guess[]>([]);
export { history };

export const pushLetter = (letter: string) => {
  if (guess().length < 5) {
    setGuess((g) => g + letter);
  }
};

export const popLetter = () => {
  setGuess((g) => g.slice(0, -1));
};

export const tryGuess = () => {
  if (guess().length >= 5 && history().length < 6) {
    setHistory((h) => [...h, check("bedge", guess())]);
    setGuess("");
  }
};
