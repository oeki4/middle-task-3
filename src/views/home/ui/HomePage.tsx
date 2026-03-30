import Link from 'next/link';
import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <main className={styles['home-page']}>
            <div className={styles['home-page__content']}>
                <h1 className={styles['home-page__title']}>Главная страница</h1>
                <p className={styles['home-page__subtitle']}>Пустая страница в стиле FSD + SCSS Modules (BEM)</p>
                <div style={{ marginTop: '20px' }}>
                    <Link href="/todos" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                        Перейти к списку дел (Todos)
                    </Link>
                </div>
            </div>
        </main>
    );
};
