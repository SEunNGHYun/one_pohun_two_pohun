import {atom} from 'recoil';

export const SignupState = atom<boolean>({
  key: 'SignupState',
  default: false,
});

export const userNickNameState = atom<string>({
  key: 'userNickNameState',
  default: '',
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
