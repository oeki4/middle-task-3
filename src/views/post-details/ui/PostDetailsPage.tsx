import Link from 'next/link';
import { Post } from '@/entities/post';
import styles from './PostDetailsPage.module.scss';

export interface PostDetailsProps {
    post: Post;
    todoId: string;
}

export const PostDetailsPage = ({ post, todoId }: PostDetailsProps) => {
    return (
        <div className={styles['post-details']}>
            <Link href={`/todos/${todoId}`} className={styles['post-details__back']}>
                ← Назад к задаче
            </Link>
            <div className={styles['post-details__content']}>
                <h1 className={styles['post-details__title']}>{post.title}</h1>
                <div className={styles['post-details__body']}>
                    {post.body}
                </div>
                <div className={styles['post-details__footer']}>
                    <div className={styles['post-details__stats']}>
                        <span>👍 {post.reactions.likes}</span>
                        <span>👎 {post.reactions.dislikes}</span>
                        <span>👁️ {post.views}</span>
                    </div>
                    <div className={styles['post-details__tags']}>
                        {post.tags.map(tag => (
                            <span key={tag} className={styles['post-details__tag']}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
