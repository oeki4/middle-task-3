import { serverApi } from '@/shared/api';
import { Todo } from '../model/types';

/**
 * Получение одной задачи по ID (для сервера)
 */
export const getTodoById = async (id: string) => {
    return serverApi<Todo>(`/todos/${id}`);
};
