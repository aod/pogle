import emotes from "./emotes.json";

const epoch = new Date(0);
const now = new Date();
const MSPassed = now.getTime() - epoch.getTime();

const oneDayInMS = 24 * 60 * 60 * 1000;
const diffDays = Math.round(Math.abs(MSPassed / oneDayInMS));

const seed = diffDays;
const random = () => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const todaysRandomEmote =
  emotes[Math.floor(random() * emotes.length)].toLowerCase();

console.groupCollapsed("forsenCD");
console.log("Today's word is:", todaysRandomEmote);
console.groupEnd();

export default todaysRandomEmote;
