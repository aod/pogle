import { Component } from "solid-js";

import Navbar from "./components/Navbar";
import Pogle from "./components/Pogle";

const App: Component = () => {
  return (
    <div class="min-h-screen bg-zinc-900">
      <Navbar />
      <Pogle />
    </div>
  );
};

export default App;
