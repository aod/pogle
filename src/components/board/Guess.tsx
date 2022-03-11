import { Component, For, Show } from "solid-js";

import Tile from "./Tile";
import Row from "./Row";

import { history } from "../../state";
import { range } from "../../util";

export interface TileRowGuess {
  nth: number;
}

const Guess: Component<TileRowGuess> = ({ nth }) => {
  return (
    <div className="flex gap-1.5">
      <Show when={history()[nth]} fallback={<Row />}>
        <For each={range(5)}>
          {(i) => (
            <Tile spot={history()[nth].spots[i]}>
              {history()[nth].guess[i]}
            </Tile>
          )}
        </For>
      </Show>
    </div>
  );
};

export default Guess;
