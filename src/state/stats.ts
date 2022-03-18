import { createEffect, createReaction, createSignal } from "solid-js";

import { board, hasLost, hasCorrectGuess, isDone } from "./board";

import { createStats, Stats } from "../lib";

export const [stats, setStats] = createSignal<Stats>(
  JSON.parse(window.localStorage.getItem("stats")!) ?? createStats()
);

createEffect(() =>
  window.localStorage.setItem("stats", JSON.stringify(stats()))
);

const track = createReaction(() =>
  setStats((prev) => {
    const nextCurrentStreak = hasCorrectGuess() ? prev.currentStreak + 1 : 0;

    return {
      ...prev,
      played: prev.played + 1,
      won: hasCorrectGuess() ? prev.won + 1 : prev.won,
      currentStreak: nextCurrentStreak,
      maxStreak:
        nextCurrentStreak >= prev.maxStreak
          ? nextCurrentStreak
          : prev.maxStreak,
      guessDistribution: hasLost()
        ? prev.guessDistribution
        : prev.guessDistribution.map((guesses, idx) =>
            idx === board().length - 1 ? guesses + 1 : guesses
          ),
      prevGuesses: hasCorrectGuess() ? board().length : -1,
    };
  })
);
track(() => isDone());
