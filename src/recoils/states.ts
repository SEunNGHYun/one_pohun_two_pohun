import {atom} from 'recoil';
import {UserData, Themes} from '../types/types';

export const userState = atom<UserData>({
  key: 'userNickNameState',
  default: {
    nickname: '',
    img: '',
    day_cost: 0,
    day_goal_cost: 0,
    push_notification: undefined,
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
