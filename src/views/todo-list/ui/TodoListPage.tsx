'use client';

import Link from 'next/link';
import { useTodoList } from '@/entities/todo';
import styles from './TodoListPage.module.scss';

export const TodoListPage = () => {
    const { todos, loading, error } = useTodoList();

    if (loading) return <div className={styles['todo-list']}>Загрузка...</div>;
    if (error) return <div className={styles['todo-list']}>Ошибка: {error}</div>;

    return (
        <div className={styles['todo-list']}>
            <h1 className={styles['todo-list__title']}>Список дел (Client Fetch)</h1>
            <ul className={styles['todo-list__items']}>
                {todos.map(todo => (
                    <li key={todo.id} className={styles['todo-list__item']}>
                        <Link href={`/todos/${todo.id}`} className={styles['todo-list__link']}>
                            {todo.todo} {todo.completed ? '✅' : '❌'}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
