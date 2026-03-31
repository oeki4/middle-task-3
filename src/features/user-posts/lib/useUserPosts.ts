'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByUserId, setUserPosts, setLoading, setError } from '@/entities/post';
import { RootState } from '@/app/store';

export const useUserPosts = (userId: number) => {
    const dispatch = useDispatch();
    const { userPosts, isLoading, error } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getPostsByUserId(userId, 5);
                dispatch(setUserPosts(response.posts));
            } catch (err) {
                dispatch(setError(err instanceof Error ? err.message : 'Unknown error'));
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId, dispatch]);

    return { userPosts, isLoading, error };
};
