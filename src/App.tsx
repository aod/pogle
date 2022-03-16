import { Component, Show } from "solid-js";
import { Portal } from "solid-js/web";

import Navbar from "./components/Navbar";
import Pogle from "./components/Pogle";
import Modal from "./components/Modal";

import { modalContent } from "./state";

const App: Component = () => {
  return (
    <div class="min-h-screen bg-zinc-900">
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
