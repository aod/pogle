import { createEffect, createMemo, createSignal } from "solid-js";

import { Guess, Spot } from "../lib";

export const [board, setBoard] = createSignal<Guess[]>(
  JSON.parse(window.localStorage.getItem("board")!) ?? []
);

createEffect(() =>
  window.localStorage.setItem("board", JSON.stringify(board()))
);

export const keyboard = createMemo(() => {
  const lut: Record<string, Spot> = {};
  for (const his of board()) {
    for (let i = 0; i < his.guess.length; i++) {
      const c = his.guess[i];
      lut[c] ??= his.spots[i];
      if (his.spots[i] > lut[c]) lut[c] = his.spots[i];
    }
  }
  return lut;
});

export const hasCorrectGuess = createMemo(() => {
  const b = board();
  return (
    b.length !== 0 &&
    b[b.length - 1].spots.every((spot) => spot === Spot.Correct)
  );
});

export const hasLost = createMemo(
  () => board().length === 6 && !hasCorrectGuess()
);

export const isDone = createMemo(
  () => board().length === 6 || hasCorrectGuess()
);
