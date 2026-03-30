'use client'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { getTodoList } from '../api/getTodoList';
import { setTodos } from '../model/slice';
import { 
    selectTodos, 
    selectIsLoading, 
    selectTodoError, 
    selectFilters 
} from '../model/selectors';

/**
 * Кастомный хук для загрузки и фильтрации списка дел через Redux.
 */
export const useTodoList = () => {
    const dispatch = useAppDispatch();
    
    const todos = useAppSelector(selectTodos);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectTodoError);
    const filters = useAppSelector(selectFilters);

    useEffect(() => {
        getTodoList()
            .then(data => {
                dispatch(setTodos(data.todos));
            })
            .catch(err => {
                console.error(err);
            });
    }, [dispatch]);

    return { todos, loading: isLoading, error, filters };
};
