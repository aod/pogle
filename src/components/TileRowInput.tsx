import { Component, For, onCleanup, onMount, Show } from "solid-js";
import { createAnimation } from "motion-signals";

import { guess, hasWon, popLetter, pushLetter, tryGuess } from "../state";
import { range } from "../util";
import Tile from "./Tile";

const TileRowInput: Component = () => {
  let ref: HTMLDivElement;
  const { play } = createAnimation(() => ref, {
    transform: ["translateX(0.5rem)", "translateX(-0.5rem)", "translateX(0)"],
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || hasWon()) {
      return;
    }

    if (e.code === "Backspace") {
      popLetter();
    } else if (e.code === "Enter") {
      if (!tryGuess()) play();
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
    // @ts-ignore
    <div className="flex gap-1.5" ref={ref}>
      <For each={range(5)}>
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
