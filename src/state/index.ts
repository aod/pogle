import { batch } from "solid-js";

import { setBoard } from "./board";
import { setGuess } from "./guess";
import { setStats } from "./stats";

import emotes from "../assets/emotes.json";
import { dailyRNG, daysSinceEpoch } from "../util";

const CACHE_KEY_ID = "cacheKey";
const CACHE_KEY = daysSinceEpoch();

if (window.localStorage.getItem(CACHE_KEY_ID) !== CACHE_KEY.toString()) {
  window.localStorage.setItem(CACHE_KEY_ID, CACHE_KEY.toString());
  batch(() => {
    setGuess("");
    setBoard([]);
    setStats((prev) => ({ ...prev, prevGuesses: -1 }));
  });
}

export const todaysRandomEmote = emotes[Math.floor(dailyRNG() * emotes.length)];

export { guess, pushLetter, popLetter, tryGuess } from "./guess";
export { stats } from "./stats";
export { board, hasWon, keyboard, hasLost } from "./board";
export { showModal, closeModal, modalContent } from "./modal";
