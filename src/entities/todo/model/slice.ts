import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';

export interface FilterItem {
    [key: string]: {
        options: unknown[];
        selected: unknown[];
    };
}

interface TodoState {
    items: Todo[];
    isLoading: boolean;
    error: string | null;
    filters: FilterItem[];
}

const initialState: TodoState = {
    items: [],
    isLoading: false,
    error: null,
    filters: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            const todos = action.payload;
            state.items = todos;

            // Формирование фильтров по 1-му и 4-му полям объекта (динамически)
            if (todos.length > 0) {
                const firstItem = todos[0];
                const keys = Object.keys(firstItem);
                const filterIndices = [2, 3]; // 3-е и 4-е поля

                state.filters = filterIndices.map(index => {
                    const key = keys[index];
                    // Собираем уникальные значения для options
                    const options = Array.from(new Set(todos.map(t => (t as any)[key])));
                    return {
                        [key]: {
                            options,
                            selected: []
                        }
                    };
                });
            }
        },
        toggleFilterSelection: (state, action: PayloadAction<{ key: string, value: any }>) => {
            const { key, value } = action.payload;
            const filterItem = state.filters.find(f => Object.keys(f)[0] === key);
            
            if (filterItem) {
                const filterData = filterItem[key];
                const index = filterData.selected.indexOf(value);
                if (index === -1) {
                    filterData.selected.push(value);
                } else {
                    filterData.selected.splice(index, 1);
                }
            }
        },
        resetFilters: (state) => {
            state.filters.forEach(f => {
                const key = Object.keys(f)[0];
                f[key].selected = [];
            });
        }
    },
});

export const { setTodos, toggleFilterSelection, resetFilters } = todoSlice.actions;
export default todoSlice.reducer;
