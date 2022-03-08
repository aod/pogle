import { Component, For, Match, Show, Switch } from "solid-js";
import { Spot } from "../lib";

import { history } from "../state";
import Tile from "./Tile";
import TileRow from "./TileRow";

export interface TileRowGuess {
  nth: number;
}

const TileRowGuess: Component<TileRowGuess> = ({ nth }) => {
  return (
    <div className="flex gap-1.5">
      <Show when={history()[nth]} fallback={<TileRow />}>
        <For each={[0, 1, 2, 3, 4]}>
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
