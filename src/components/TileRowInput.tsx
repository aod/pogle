import { Component, For, Show } from "solid-js";

import { guess } from "../state";
import Tile from "./Tile";

const TileRowInput: Component = () => {
  return (
    <div className="flex gap-1.5">
      <For each={[0, 1, 2, 3, 4]}>
        {(i) => (
          <Show when={guess()[i]} fallback={<Tile />}>
            <Tile hightlight={true}>{guess()[i]}</Tile>
          </Show>
        )}
      </For>
    </div>
  );
};

export default TileRowInput;
