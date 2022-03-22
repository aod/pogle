import { Component } from "solid-js";

import Help from "./modal/Help";
import Stats from "./modal/Stats";

import PagMan from "../assets/pagman.png";
import { showModal } from "../state";

const Navbar: Component = () => {
  return (
    <nav class="border-b border-zinc-600">
      <h1 class="absolute h-px w-px overflow-hidden text-transparent">Pogle</h1>
      <div className="h-14 max-h-14 container mx-auto flex items-center justify-between px-4 sm:justify-evenly">
        <button onclick={() => showModal(<Help />)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-zinc-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <a
          class="text-zinc-200 text-3xl font-bold tracking-wide uppercase flex items-center gap-1"
          href="/"
        >
          <span>P</span>
          <img src={PagMan} alt="PagMan" class="h-8 w-8" />
          <span>gle</span>
        </a>
        <button onclick={() => showModal(<Stats />)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-zinc-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
