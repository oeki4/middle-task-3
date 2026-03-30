import { RootState } from '@/app/store';

export const selectTodos = (state: RootState) => state.todo.items;
export const selectFilters = (state: RootState) => state.todo.filters;
export const selectIsLoading = (state: RootState) => state.todo.isLoading;
export const selectTodoError = (state: RootState) => state.todo.error;
