'use client';

import React, {useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { selectTodos, selectFilters } from '@/entities/todo/model/selectors';
import { toggleFilterSelection, setTodos, resetFilters } from '@/entities/todo/model/slice';
import { getTodoList } from '@/entities/todo/api/getTodoList';
import styles from './TodoListPage.module.scss';

export const TodoListHooks = () => {
    const dispatch = useAppDispatch();
    
    // Данные из Redux
    const originalTodos = useAppSelector(selectTodos);
    const filtersFromStore = useAppSelector(selectFilters);

    // Первоначальная загрузка оригинала в Redux
    useEffect(() => {
        getTodoList().then(data => dispatch(setTodos(data.todos)));
    }, [dispatch]);

    // Вместо useState + useEffect используем useMemo для вычисляемых данных.
    // Это стандарт React для предотвращения ошибок "cascading renders" и лишних циклов рендеринга.
    const filteredTodos = React.useMemo(() => {
        let result = [...originalTodos];

        filtersFromStore.forEach(filterObj => {
            const key = Object.keys(filterObj)[0];
            const { selected } = filterObj[key];

            if (selected && selected.length > 0) {
                result = result.filter(todo => {
                    const value = (todo as any)[key];
                    return selected.includes(value);
                });
            }
        });

        return result;
    }, [originalTodos, filtersFromStore]);

    const handleToggleFilter = (key: string, value: any) => {
        dispatch(toggleFilterSelection({ key, value }));
    };

    return (
        <div className={styles['todo-list']}>
            <h2>Подключение через Хуки</h2>
            
            <div className={styles['todo-list__filters']}>
                {filtersFromStore.map((fObj, idx) => {
                    const keyName = Object.keys(fObj)[0];
                    const { options, selected } = fObj[keyName];

                    return (
                        <div key={idx} className={styles['filter-group']}>
                            <label>Поле: {keyName}</label>
                            
                            {/* Выпадающий список для мультивыборки */}
                            <select 
                                className={styles['filter-select']}
                                value="" // Всегда пустой, так как выбор просто добавляет/удаляет тег
                                onChange={(e) => {
                                    if (e.target.value) {
                                        // Преобразуем значение обратно в нужный тип (number или boolean)
                                        const originalValue = options.find(o => String(o) === e.target.value);
                                        handleToggleFilter(keyName, originalValue);
                                    }
                                }}
                            >
                                <option value="" disabled>Выберите вариант...</option>
                                {options.map(option => (
                                    <option key={String(option)} value={String(option)}>
                                        {selected.includes(option) ? '✓ ' : ''}{String(option)}
                                    </option>
                                ))}
                            </select>

                            {/* Список выбранных тегов под селектом */}
                            <div className={styles['selected-tags']}>
                                {selected.map(val => (
                                    <span 
                                        key={String(val)} 
                                        className={styles['tag']}
                                        onClick={() => handleToggleFilter(keyName, val)}
                                    >
                                        {String(val)} ✕
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
                <button 
                    className={styles['reset-btn']}
                    onClick={() => dispatch(resetFilters())}
                >
                    Сбросить всё
                </button>
            </div>

            <ul className={styles['todo-list__items']}>
                {filteredTodos.map(todo => (
                    <li key={todo.id} className={styles['todo-list__item']}>
                        <Link href={`/todos/${todo.id}`} className={styles['todo-list__link']}>
                            <span className={styles['todo-list__text']}>{todo.todo}</span>
                            <span className={styles['todo-list__id']}>[User: {todo.userId}]</span>
                            <span>{todo.completed ? '✅' : '❌'}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
