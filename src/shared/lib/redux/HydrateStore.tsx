'use client';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Todo, setDetails } from '@/entities/todo';
import { User, setCurrentUser } from '@/entities/user';
import { Post, setCurrentPost } from '@/entities/post';

interface HydrateStoreProps {
    todo?: Todo;
    user?: User;
    post?: Post;
}

export const HydrateStore = ({ todo, user, post }: HydrateStoreProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (todo) dispatch(setDetails(todo));
        if (user) dispatch(setCurrentUser(user));
        if (post) dispatch(setCurrentPost(post));
    }, [dispatch, todo, user, post]);

    return null;
};



