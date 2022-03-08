import { Component, For, Match, Show, Switch } from "solid-js";

import TileRowGuess from "./TileRowGuess";
import TileRowInput from "./TileRowInput";
import TileRow from "./TileRow";

import { history } from "../state";

const Board: Component = () => {
  return (
    <div class="grid place-items-center gap-1.5">
      <For each={[0, 1, 2, 3, 4, 5]}>
        {(i) => (
          <Switch fallback={<TileRow />}>
            <Match when={history()[i]}>
              <TileRowGuess nth={i} />
            </Match>
            <Match when={history()[i - 1] || (!history.length && i === 0)}>
              <TileRowInput />
            </Match>
          </Switch>
        )}
      </For>
    </div>
  );
};

export default Board;
