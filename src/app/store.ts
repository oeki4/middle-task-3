import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '@/entities/todo/model/slice';
import { userReducer } from '@/entities/user';
import { postReducer } from '@/entities/post';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
        post: postReducer,
    },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
