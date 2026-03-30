import { TodoListHooks } from './TodoListHooks';
import styles from './TodoListPage.module.scss';

export const TodoListPage = () => {
    return (
        <div className={styles['todo-list']}>
            <h1 className={styles['todo-list__title']}>Список задач</h1>
            <TodoListHooks />
        </div>
    );
};
