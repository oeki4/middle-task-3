export type { User } from './model/types';
export { getUserById } from './api/getUserById';
export { setCurrentUser, clearCurrentUser, default as userReducer } from './model/slice';

