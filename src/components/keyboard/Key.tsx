import { Component } from "solid-js";

import { Spot } from "../../lib";
import { pushLetter } from "../../state";

interface KeyProps {
  key?: string;
  spot?: Spot;
  onclick?: (e: MouseEvent) => void;
  wide?: boolean;
}

const Key: Component<KeyProps> = ({
  children,
  spot,
  onclick,
  key,
  wide = false,
}) => {
  const handleOnClick = (e: MouseEvent) => {
    if (onclick === undefined && key !== undefined) {
      pushLetter(key);
    } else if (onclick !== undefined) {
      onclick(e);
    }
  };

  return (
    <button
      class="rounded text-zinc-100 font-semibold uppercase grid place-items-center select-none cursor-pointer text-xs sm:text-sm touch-manipulation flex-1 sm:flex-none h-12 sm:h-14"
      classList={{
        "w-6 sm:w-10": !wide,
        "w-12 sm:w-20 basis-4": wide,
        "bg-neutral-500": spot === undefined,
        "bg-[#538d4e]": spot === Spot.Correct,
        "bg-[#b59f3b]": spot === Spot.Wrong,
        "bg-zinc-700": spot === Spot.None,
      }}
      onclick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Key;
