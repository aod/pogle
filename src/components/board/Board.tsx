import { Component, For, Match, Switch } from "solid-js";

import Guess from "./Guess";
import Input from "./Input";
import Row from "./Row";

import { board } from "../../state";
import { range } from "../../util";

const Board: Component = () => {
  return (
    <div class="grid place-items-center gap-1.5">
      <For each={[...range(6)]}>
        {(i) => (
          <Switch fallback={<Row />}>
            <Match when={board()[i]}>
              <Guess nth={i} />
            </Match>
            <Match when={board()[i - 1] || (!board.length && i === 0)}>
              <Input />
            </Match>
          </Switch>
        )}
      </For>
    </div>
  );
};

export default Board;
