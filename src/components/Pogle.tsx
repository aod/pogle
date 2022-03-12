import { Component, Show } from "solid-js";

import Board from "./board";
import Keyboard from "./keyboard";

import { hasWon, history, todaysRandomEmote } from "../state";

const Pogle: Component = () => {
  return (
    <main class="container mx-auto pt-6 sm:pt-8 flex flex-col items-center gap-6 sm:gap-8">
      <Show when={history().length === 6 && !hasWon()}>
        <span class="text-zinc-800 font-semibold uppercase tracking-wide px-4 sm:px-8 py-2 sm:py-4 bg-zinc-200 rounded-lg sm:text-xl">
          {todaysRandomEmote}
        </span>
      </Show>
      <Board />
      <Keyboard />
    </main>
  );
};

export default Pogle;
