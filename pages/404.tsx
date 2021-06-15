import Link from 'next/link';
import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';

export default function Custom404() {
    return (
        <Layout
            titlePage={'404 | Pàgina no trobada'}
            pageTitle={'Castellers de Barcelona'}
            pageDescription={
                "S'ha produit un error 404. Pàgina no trobada. Si us plau, torna a la pàgina d'inici"
            }
            navRoutes={null}
            footerLinks={null}
            supporters={null}
        >
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
                            <a>Inici</a>
                        </Link>
                        .
                    </p>
                </main>
            </div>
        </Layout>
    );
}
