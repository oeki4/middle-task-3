import Link from 'next/link';
import { getTodoById } from '@/entities/todo';
import styles from './TodoDetailsPage.module.scss';

export interface TodoDetailsProps {
    id: string;
}

export const TodoDetailsPage = async ({ id }: TodoDetailsProps) => {
    // Серверный фетч через Entity API
    const todo = await getTodoById(id);

    return (
        <div className={styles['todo-details']}>
            <Link href="/todos" className={styles['todo-details__back']}>
                ← Назад к списку
            </Link>
            <div className={styles['todo-details__content']}>
                <h1 className={styles['todo-details__title']}>Детали задачи (Server Fetch)</h1>
                <p className={styles['todo-details__text']}>
                    <strong>Задача:</strong> {todo.todo}
                </p>
                <div className={styles['todo-details__status']}>
                    Статус: {' '}
                    <span className={todo.completed ? styles['todo-details__status--done'] : styles['todo-details__status--pending']}>
                        {todo.completed ? 'Выполнено' : 'В процессе'}
                    </span>
                </div>
            </div>
        </div>
    );
};
