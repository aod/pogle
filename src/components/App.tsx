import { Component, Show } from "solid-js";
import { Portal } from "solid-js/web";

import Navbar from "./Navbar";
import Pogle from "./Pogle";
import Modal from "./Modal";

import { modalContent } from "../state";

const App: Component = () => {
  return (
    <div class="min-h-screen bg-zinc-900 flex flex-col">
      <Navbar />
      <Pogle />
      <Show when={modalContent() !== undefined}>
        <Portal>
          <Modal>{modalContent()}</Modal>
        </Portal>
      </Show>
    </div>
  );
};

export default App;
