import { serverApi } from '@/shared/api';
import { Post } from '../model/types';

/**
 * Получение одного поста по ID (для сервера)
 */
export const getPostById = async (id: string) => {
    return serverApi<Post>(`/posts/${id}`);
};
