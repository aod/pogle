import { Component } from "solid-js";

const StatsModal: Component = () => {
  return (
    <>
      <h1 class="uppercase text-center">Stats</h1>

      <Chart />

      <StatRow>
        <Stat stat="Played">2</Stat>
        <Stat stat="Won">1</Stat>
        <Stat stat="Win rate">50.0%</Stat>
      </StatRow>

      <StatRow>
        <Stat stat="Current streak">0</Stat>
        <Stat stat="Max streak">1</Stat>
      </StatRow>
    </>
  );
};

const Chart: Component = () => {
  const max = 15;
  return (
    <div class="flex flex-col gap-1 mb-8">
      <ChartRow row={1} val={1} max={max} />
      <ChartRow row={2} val={1} max={max} />
      <ChartRow row={3} val={6} max={max} />
      <ChartRow row={4} val={15} max={max} highlight={true} />
      <ChartRow row={5} val={6} max={max} />
      <ChartRow row={6} val={4} max={max} />
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
