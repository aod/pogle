import { Component } from "solid-js";
import { Spot } from "../lib";

import Tile from "./board/Tile";

const HelpModal: Component = () => {
  return (
    <>
      <h1 class="uppercase">How to play</h1>
      <p>Guess the daily Twitch emote in six tries.</p>
      <p>
        Each guess must be a valid five-letter Twitch/BTTV/FFZ/7TV emote. Hit
        the enter button to submit.
      </p>
      <p>
        After each guess, the color of the tiles will change to show how close
        your guess was to the word e.g.:
      </p>
      <p class="flex gap-1.5">
        <Tile spot={Spot.Correct}>K</Tile>
        <Tile spot={Spot.None}>A</Tile>
        <Tile spot={Spot.None}>P</Tile>
        <Tile spot={Spot.Wrong}>P</Tile>
        <Tile spot={Spot.None}>A</Tile>
      </p>
      The letter <b>K</b> is in the word and in the correct spot. The letter{" "}
      <b>P</b> is in the word but in the wrong spot. The letters A is not in the
      word in any spot.
    </>
  );
};

export default HelpModal;
