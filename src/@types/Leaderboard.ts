export type Leaderboard = LeaderboardEntry[];
export interface LeaderboardEntry {
  rank: Tier;
  eventid: number;
  date: string;
  name: string;
  description: string;
  points: number;
  rate: string;
  playerid: string;
}

export interface LeaderboardPoint {
  id?: number;
  eventid: number;
  rank: number;
  date: string;
  name?: string;
  description?: string;
  difference?: number;
  points: number;
  playerid: string;
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
  | 30000
  | 50000;

export interface PastChangeEntry {
  event: number;
  rank: Tier;
  points: number;
  change: number;
  date: string;
  name: string;
}
