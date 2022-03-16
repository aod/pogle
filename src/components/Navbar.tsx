import type { Component } from "solid-js";

import PagMan from "../assets/pagman.png";

const Navbar: Component = () => {
  return (
    <nav class="border-b border-zinc-600">
      <h1 class="absolute h-px w-px overflow-hidden text-transparent">Pogle</h1>
      <div className="h-14 max-h-14 container mx-auto flex items-center justify-center">
        <a
          class="text-zinc-200 text-3xl font-bold tracking-wide uppercase flex items-center gap-1"
          href={window.location.href}
        >
          <span>P</span>
          <img src={PagMan} alt="PagMan" class="h-8" />
          <span>gle</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
