import { createEffect, createReaction, createSignal } from "solid-js";

import { board, hasLost, hasWon, isDone } from "./board";

import { createStats, Stats } from "../lib";

export const [stats, setStats] = createSignal<Stats>(
  JSON.parse(window.localStorage.getItem("stats")!) ?? createStats()
);

createEffect(() =>
  window.localStorage.setItem("stats", JSON.stringify(stats()))
);

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
            idx === board().length - 1 ? guesses + 1 : guesses
          ),
      prevGuesses: hasWon() ? board().length : -1,
    };
  })
);
track(() => isDone());
