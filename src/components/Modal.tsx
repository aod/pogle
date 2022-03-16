import { Accessor, Component, onCleanup } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

import { closeModal } from "../state";

const clickOutside = (el: DOMElement, accessor: Accessor<() => void>) => {
  const onClick = (e: MouseEvent) => {
    //@ts-ignore
    if (!el.contains(e.target)) {
      accessor()?.();
    }
  };
  document.body.addEventListener("click", onClick);
  onCleanup(() => document.body.removeEventListener("click", onClick));
};

const Modal: Component = ({ children }) => {
  return (
    <>
      <div class="absolute top-0 left-0 w-full h-full z-10 px-4 sm:px-0">
        <div
          class="max-w-prose mx-auto mt-20 py-4 px-8 bg-zinc-800 border border-zinc-600 relative prose-sm sm:prose-md prose prose-zinc dark:prose-invert overflow-auto max-h-[500px] sm:max-h-[800px]"
          //@ts-ignore
          use:clickOutside={() => closeModal()}
          role="dialog"
        >
          <button onclick={() => closeModal()} class="absolute right-3 top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
      <div class="absolute top-0 left-0 w-full h-full opacity-60 bg-black" />
    </>
  );
};

export default Modal;
