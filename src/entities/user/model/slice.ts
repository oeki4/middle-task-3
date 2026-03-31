import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface UserState {
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        }
    },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
