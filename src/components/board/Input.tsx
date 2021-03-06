import { Component, For, onCleanup, onMount, Show } from "solid-js";
import { createAnimation } from "motion-signals";

import Tile from "./Tile";

import { guess, popLetter, isDone, pushLetter, tryGuess } from "../../state";
import { range } from "../../util";
import { onTryGuess } from "../../state/guess";

const Input: Component = () => {
  let ref: HTMLDivElement;
  const { play } = createAnimation(() => ref, {
    x: [5, -5, 0],
  });
  onTryGuess((valid) => !valid && play());

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || isDone()) {
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
    // @ts-ignore
    <div className="flex gap-1.5" ref={ref}>
      <For each={[...range(5)]}>
        {(i) => (
          <Show when={guess()[i]} fallback={<Tile />}>
            <Tile hightlight={true}>{guess()[i]}</Tile>
          </Show>
        )}
      </For>
    </div>
  );
};

export default Input;
