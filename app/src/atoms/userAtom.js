import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    isAuthenticated: false,
    user: null,
    token: null
  }
});