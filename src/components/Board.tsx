import { Component, For, Match, Switch } from "solid-js";

import TileRowGuess from "./TileRowGuess";
import TileRowInput from "./TileRowInput";
import TileRow from "./TileRow";

import { history } from "../state";
import { range } from "../util";

const Board: Component = () => {
  return (
    <div class="grid place-items-center gap-1.5">
      <For each={range(6)}>
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
