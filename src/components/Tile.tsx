import { Component } from "solid-js";

import { Spot } from "../lib";

export interface TileProps {
  hightlight?: boolean;
  spot?: Spot;
}

const Tile: Component<TileProps> = ({ children, hightlight = false, spot }) => {
  return (
    <div
      class="w-16 h-16 border-2 text-zinc-100 grid place-items-center text-4xl uppercase font-semibold select-none"
      classList={{
        "border-zinc-500": hightlight,
        "border-zinc-700": !hightlight,
        "border-none": spot !== undefined,
        "bg-[#538d4e]": spot === Spot.Correct,
        "bg-[#b59f3b]": spot === Spot.Wrong,
        "bg-zinc-700": spot === Spot.None,
      }}
    >
      {children}
    </div>
  );
};

export default Tile;
