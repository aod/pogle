import { Component, For, Match, Switch } from "solid-js";

import Key from "./Key";

import { Spot } from "../../lib";
import { keyboard } from "../../state";

export interface KeysProps {
  keys: string[];
}

const Keys: Component<KeysProps> = ({ keys }) => {
  return (
    <>
      <For each={keys}>
        {(key) => (
          <Switch fallback={<Key key={key}>{key}</Key>}>
            <Match when={keyboard()[key] === Spot.None}>
              <Key spot={Spot.None} key={key}>
                {key}
              </Key>
            </Match>
            <Match when={keyboard()[key] === Spot.Wrong}>
              <Key spot={Spot.Wrong} key={key}>
                {key}
              </Key>
            </Match>
            <Match when={keyboard()[key] === Spot.Correct}>
              <Key spot={Spot.Correct} key={key}>
                {key}
              </Key>
            </Match>
          </Switch>
        )}
      </For>
    </>
  );
};

export default Keys;
