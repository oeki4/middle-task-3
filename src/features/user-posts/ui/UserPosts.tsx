'use client';

import Link from 'next/link';

import { useUserPosts } from '../lib/useUserPosts';
import styles from './UserPosts.module.scss';

interface UserPostsProps {
    userId: number;
    todoId: number;
}

export const UserPosts = ({ userId, todoId }: UserPostsProps) => {
    const { userPosts, isLoading, error } = useUserPosts(userId);

    if (isLoading) return <div className={styles['user-posts__loading']}>Загрузка постов...</div>;
    if (error) return <div className={styles['user-posts__error']}>Ошибка: {error}</div>;

    return (
        <div className={styles['user-posts']}>
            <h3 className={styles['user-posts__title']}>Последние посты пользователя</h3>
            {userPosts.length > 0 ? (
                <ul className={styles['user-posts__list']}>
                    {userPosts.map(post => (
                        <li key={post.id} className={styles['user-posts__item']}>
                            <Link href={`/todos/${todoId}/${post.id}`} className={styles['user-posts__link']}>
                                <h4 className={styles['user-posts__post-title']}>{post.title}</h4>
                                <p className={styles['user-posts__post-body']}>{post.body.slice(0, 100)}...</p>
                                <span className={styles['user-posts__more']}>Подробнее →</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>У пользователя нет постов.</p>
            )}
        </div>
    );
};


