import type { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <nav class="border-b border-zinc-600">
      <div className="h-14 max-h-14 container mx-auto flex items-center justify-center">
        <a
          class="text-zinc-200 text-3xl font-bold tracking-wide uppercase"
          href={window.location.href}
        >
          <h1>Pogle</h1>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
