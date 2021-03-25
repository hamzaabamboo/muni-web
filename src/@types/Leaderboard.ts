export type Leaderboard = LeaderboardEntry[];
export interface LeaderboardEntry {
  rank: Tier;
  eventid: number;
  date: string;
  name: string;
  description: string;
  points: number;
  rate: string;
}

export type Tier =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 50
  | 100
  | 500
  | 1000
  | 2000
  | 5000
  | 10000
  | 20000
  | 50000;
