import { Component } from "solid-js";

import Tile from "./Tile";

const TileRow: Component = () => {
  return (
    <div className="flex gap-1.5">
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </div>
  );
};

export default TileRow;
