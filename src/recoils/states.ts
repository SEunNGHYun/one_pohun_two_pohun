import {atom} from 'recoil';

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
});

export const AvgDayCostState = atom<number>({
  key: 'AvgDayCost',
  default: 1.0,
});
