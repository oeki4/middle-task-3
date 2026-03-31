import { serverApi } from '@/shared/api';
import { User } from '../model/types';

/**
 * Получение одного пользователя по ID (для сервера)
 */
export const getUserById = async (id: number) => {
    return serverApi<User>(`/users/${id}`);
};
