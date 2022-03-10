import { Component } from "solid-js";

import Key from "./Key";
import Keys from "./Keys";

import { popLetter, tryGuess } from "../../state";

const Keyboard: Component = () => {
  return (
    <div class="flex flex-col items-center gap-1.5">
      <div class="flex gap-1.5">
        <Keys keys={["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]} />
      </div>
      <div class="flex gap-1.5">
        <Keys keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
      </div>
      <div class="flex gap-1.5">
        <Keys keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} />
      </div>
      <div class="flex gap-1.5">
        <Key wide onclick={() => tryGuess()}>
          Enter
        </Key>
        <Keys keys={["z", "x", "c", "v", "b", "n", "m"]} />
        <Key wide onclick={() => popLetter()}>
          Del
        </Key>
      </div>
    </div>
  );
};

export default Keyboard;
