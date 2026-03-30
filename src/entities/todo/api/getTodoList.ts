import { clientApi } from '@/shared/api';
import { TodosResponse } from '../model/types';

/**
 * Получение списка задач (для клиента)
 */
export const getTodoList = async () => {
    return clientApi<TodosResponse>('/todos?limit=10');
};
