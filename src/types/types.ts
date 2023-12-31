export interface AddCostData {
  nickname: string;
  categories: string;
  cost: number;
  timestamp: string;
}

export interface UserData {
  nickname: string;
  img: string | null;
  current_cost: number;
  goal_cost: number;
  push_notification: boolean;
}

export type Themes = '#d54183' | '#59b54f' | '#2121ba';
