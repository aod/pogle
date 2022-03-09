import { Component, For, onCleanup, onMount, Show } from "solid-js";

import { guess, hasWon, popLetter, pushLetter, tryGuess } from "../state";
import Tile from "./Tile";

const TileRowInput: Component = () => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || hasWon()) {
      return;
    }

    if (e.code === "Backspace") {
      popLetter();
    } else if (e.code === "Enter") {
      tryGuess();
    } else if (e.key.match(/^[0-9a-zA-Z]$/)) {
      pushLetter(e.key.toLowerCase());
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex gap-1.5">
      <For each={[0, 1, 2, 3, 4]}>
        {(i) => (
          <Show when={guess()[i]} fallback={<Tile />}>
            <Tile hightlight={true}>{guess()[i]}</Tile>
          </Show>
        )}
      </For>
    </div>
  );
};

export default TileRowInput;
