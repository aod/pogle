import { Component, createMemo } from "solid-js";
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
    <div
      class="p-4 rounded text-zinc-100 font-semibold uppercase grid place-items-center select-none cursor-pointer text-sm"
      classList={{
        "w-10": !wide,
        "w-20": wide,
        "bg-neutral-500": spot === undefined,
        "bg-[#538d4e]": spot === Spot.Correct,
        "bg-[#b59f3b]": spot === Spot.Wrong,
        "bg-zinc-700": spot === Spot.None,
      }}
      onclick={handleOnClick}
    >
      {children}
    </div>
  );
};

export default Key;
