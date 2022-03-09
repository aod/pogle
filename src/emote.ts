import emotes from "./emotes.json";
import { dailyRNG } from "./util";

const todaysRandomEmote = emotes[Math.floor(dailyRNG() * emotes.length)];
export default todaysRandomEmote;
