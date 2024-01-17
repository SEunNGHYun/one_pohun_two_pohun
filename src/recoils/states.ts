import {atom} from 'recoil';
import {UserData, Themes} from '../types/types';

export const userState = atom<UserData>({
  key: 'userNickNameState',
  default: {
    nickname: '',
    img: null,
    current_cost: 0,
    goal_cost: 0,
    today_spend_cost: 0,
    push_notification: false,
  },
});

export const AvgDayCostState = atom<number>({
  key: 'AvgDayCost',
  default: 1.0,
});

export const errActive = atom<boolean>({
  key: 'errActive',
  default: false,
});

export const errState = atom<string>({
  key: 'errState',
  default: '',
});

export const appTheme = atom<Themes>({
  key: 'appTheme',
  default: '#d54183',
});
