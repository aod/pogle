import { Component, onCleanup, onMount } from "solid-js";

import { popLetter, pushLetter, tryGuess } from "../state";
import Board from "./Board";

const Pogle: Component = () => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      return;
    }

    if (e.code === "Backspace") {
      popLetter();
    } else if (e.code === "Enter") {
      tryGuess();
    } else if (e.key.match(/^[a-zA-Z]$/)) {
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
    <main class="container mx-auto pt-12">
      <Board />
    </main>
  );
};

export default Pogle;
