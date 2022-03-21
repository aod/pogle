import { Component, Show } from "solid-js";

import Board from "./board";
import Keyboard from "./keyboard";

import { hasLost, todaysRandomEmote } from "../state";

const Pogle: Component = () => {
  return (
    <main class="container mx-auto px-2 py-2 sm:pb-4 flex flex-grow flex-col items-center h-full justify-between">
      <Show when={hasLost()} fallback={<div />}>
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
