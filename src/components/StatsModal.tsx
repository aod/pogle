import { Component, For, untrack } from "solid-js";

import { stats } from "../state";
import { range } from "../util";

const StatsModal: Component = () => {
  const stat = untrack(stats);
  const winRate = ((stat.won / stat.played || 0) * 100).toFixed(2);

  return (
    <>
      <h1 class="uppercase text-center">Stats</h1>

      <Chart />

      <StatRow>
        <Stat stat="Played">{stat.played}</Stat>
        <Stat stat="Won">{stat.won}</Stat>
        <Stat stat="Win rate">{winRate}%</Stat>
      </StatRow>

      <StatRow>
        <Stat stat="Current streak">{stat.currentStreak}</Stat>
        <Stat stat="Max streak">{stat.maxStreak}</Stat>
      </StatRow>
    </>
  );
};

const Chart: Component = () => {
  const stat = untrack(stats);
  const max = Math.max(...stat.guessDistribution);

  return (
    <div class="flex flex-col gap-1 mb-8">
      <For each={[...range(6)]}>
        {(i) => (
          <ChartRow
            row={i + 1}
            val={stat.guessDistribution[i]}
            max={max}
            highlight={stat.prevGuesses - 1 === i}
          />
        )}
      </For>
    </div>
  );
};

const ChartRow: Component<{
  row: number;
  val: number;
  max: number;
  highlight?: boolean;
}> = ({ children, ...props }) => {
  return (
    <div class="flex gap-2">
      <b>{props.row}</b>
      <span
        class="py-px px-2 inline-block text-right min-w-fit"
        style={{ width: `${(props.val / props.max) * 100}%` }}
        classList={{
          "bg-[#538d4e]": props.highlight,
          "bg-zinc-700": !props.highlight,
        }}
      >
        {props.val}
      </span>
    </div>
  );
};

const Stat: Component<{ stat: string }> = ({ children, ...props }) => {
  return (
    <div>
      <p class="flex flex-col items-center">
        <b class="text-xl text-zinc-50">{children}</b>
        <span>{props.stat}</span>
      </p>
    </div>
  );
};

const StatRow: Component = ({ children }) => (
  <div class="flex justify-evenly">{children}</div>
);

export default StatsModal;
