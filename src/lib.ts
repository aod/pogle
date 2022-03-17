export interface Stats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  prevGuesses: number; // -1 if lost
}

export const createStats = (): Stats => ({
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
  prevGuesses: -1,
});

export enum Spot {
  None,
  Wrong,
  Correct,
}

export interface Guess {
  guess: string;
  spots: Spot[];
}

export const check = (word: string, guess: string): Guess => {
  const spots: Spot[] = [];

  for (let i = 0; i < word.length; i++) {
    spots[i] = Spot.None;
  }

  const seen = new Set<string>();
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      spots[i] = Spot.Correct;
      seen.add(guess[i]);
    }
  }

  for (let i = 0; i < guess.length; i++) {
    for (let j = 0; j < word.length; j++) {
      if (i !== j && guess[i] === word[j] && !seen.has(guess[i])) {
        spots[i] = Spot.Wrong;
        seen.add(guess[i]);
      }
    }
  }

  return { guess, spots };
};
