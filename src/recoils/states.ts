import {atom} from 'recoil';

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
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
