import { clientApi } from '@/shared/api';
import { PostsResponse } from '../model/types';

/**
 * Получение постов пользователя по ID (для клиента)
 */
export const getPostsByUserId = async (userId: number, limit = 5) => {
    return clientApi<PostsResponse>(`/posts/user/${userId}?limit=${limit}`);
};
