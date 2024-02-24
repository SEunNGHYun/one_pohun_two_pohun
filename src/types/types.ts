// export interface AddCostData {
//   categories: number;
// }

export interface UserData {
  nickname: string;
  img: string | null;
  day_cost: number;
  day_goal_cost: number;
  push_notification: boolean;
}

export interface UserSpendCost {
  category: string;
  cost: number;
  timestamp: number;
}

export type Themes = '#d54183' | '#59b54f' | '#2121ba';
