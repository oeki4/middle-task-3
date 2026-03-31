import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './types';

interface PostState {
    userPosts: Post[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PostState = {
    userPosts: [],
    isLoading: false,
    error: null,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setUserPosts: (state, action: PayloadAction<Post[]>) => {
            state.userPosts = action.payload;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCurrentPost: (state, action: PayloadAction<Post>) => {
            state.userPosts = [action.payload]; // Или отдельное поле
        }
    },
});

export const { setUserPosts, setLoading, setError, setCurrentPost } = postSlice.actions;
export default postSlice.reducer;

