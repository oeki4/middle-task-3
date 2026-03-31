import Link from 'next/link';
import Image from 'next/image';
import { Todo } from '@/entities/todo';
import { User } from '@/entities/user';
import { UserPosts } from '@/features/user-posts';
import styles from './TodoDetailsPage.module.scss';


export interface TodoDetailsProps {
    todo: Todo;
    user: User;
}

export const TodoDetailsPage = ({ todo, user }: TodoDetailsProps) => {
    return (
        <div className={styles['todo-details']}>
            <Link href="/todos" className={styles['todo-details__back']}>
                ← Назад к списку
            </Link>
            <div className={styles['todo-details__content']}>
                <h1 className={styles['todo-details__title']}>Детали задачи (Server Load)</h1>
                <p className={styles['todo-details__text']}>
                    <strong>Задача:</strong> {todo.todo}
                </p>
                
                <div className={styles['todo-details__user']}>
                    <strong>Исполнитель:</strong>
                    <div className={styles['todo-details__user-info']}>
                        <Image 
                            src={user.image} 
                            alt={user.username} 
                            width={56}
                            height={56}
                            className={styles['todo-details__user-avatar']} 
                        />
                        <div>
                            <p className={styles['todo-details__user-name']}>{user.firstName} {user.lastName}</p>
                            <p className={styles['todo-details__user-email']}>{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className={styles['todo-details__status']}>
                    Статус: {' '}
                    <span className={todo.completed ? styles['todo-details__status--done'] : styles['todo-details__status--pending']}>
                        {todo.completed ? 'Выполнено' : 'В процессе'}
                    </span>
                </div>

                <UserPosts userId={user.id} todoId={todo.id} />

            </div>
        </div>
    );
};




