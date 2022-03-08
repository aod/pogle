import { Component } from "solid-js";

import Board from "./Board";
import Keyboard from "./keyboard";

const Pogle: Component = () => {
  return (
    <main class="container mx-auto pt-12 flex flex-col items-center">
      <Board />
      <Keyboard />
    </main>
  );
};

export default Pogle;
