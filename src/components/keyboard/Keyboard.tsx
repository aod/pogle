import { Component } from "solid-js";
import { popLetter, tryGuess } from "../../state";

import Key from "./Key";
import Keys from "./Keys";

const Keyboard: Component = () => {
  return (
    <div class="flex flex-col items-center gap-1.5">
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
