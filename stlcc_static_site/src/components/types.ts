export type ResultValue = 'white' | 'black' | 'draw' | '';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  rating: number;
  score: number;
}

export interface GameRecord {
  whiteId: string;
  blackId: string;
  result: ResultValue;
}

export interface RoundRecord {
  roundNumber: number;
  games: GameRecord[];
}
