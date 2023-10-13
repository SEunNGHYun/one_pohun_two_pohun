import {atom} from 'recoil';

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: true,
});

export const AvgDayCostState = atom<number>({
  key: 'AvgDayCost',
  default: 0,
});
