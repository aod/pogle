import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";

import Navbar from "./Navbar";
import Pogle from "./Pogle";
import Modal from "./modal";

import { modalContent } from "../state";

const App: Component = () => {
  const [height, setHeight] = createSignal(window.innerHeight);

  const onResize = () => setHeight(window.innerHeight);
  onMount(() => window.addEventListener("resize", onResize));
  onCleanup(() => window.removeEventListener("resize", onResize));

  return (
    <div
      class="bg-zinc-900 flex flex-col"
      style={{ "min-height": `${height()}px` }}
    >
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
