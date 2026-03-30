'use client'

import { useEffect, useState } from 'react';
import { getTodoList } from '../api/getTodoList';
import { Todo } from '../model/types';

/**
 * Кастомный хук для загрузки списка дел на клиенте.
 */
export const useTodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTodoList()
            .then(data => {
                setTodos(data.todos);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { todos, loading, error };
};
