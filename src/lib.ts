export enum Spot {
  Correct,
  Wrong,
  None,
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
      }
    }
  }

  return { guess, spots };
};
