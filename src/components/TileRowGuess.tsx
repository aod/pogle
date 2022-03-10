import { Component, For, Show } from "solid-js";

import { history } from "../state";
import { range } from "../util";
import Tile from "./Tile";
import TileRow from "./TileRow";

export interface TileRowGuess {
  nth: number;
}

const TileRowGuess: Component<TileRowGuess> = ({ nth }) => {
  return (
    <div className="flex gap-1.5">
      <Show when={history()[nth]} fallback={<TileRow />}>
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

export default TileRowGuess;
