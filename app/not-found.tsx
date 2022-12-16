import Link from 'next/link';
import styles from '@styles/Home.module.scss';

export default function NotFound() {
    return (
        <>
            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        S&apos;ha produït un error 404
                        <br />
                        <small>[Pàgina no trobada]</small>
                    </h1>
                    <p>
                        Si us plau, torna a la pàgina d&apos;
                        <Link href='/'>
                            Inici
                        </Link>
                        .
                    </p>
                </main>
            </div>
        </>
    );
}
