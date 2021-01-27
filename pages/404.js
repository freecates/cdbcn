import Link from 'next/link';
import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import { motion } from 'framer-motion';

export default function Custom404() {
    return (
        <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
            <Layout>
                <div className={`${styles.container}`}>
                    <main className={styles.main}>
                        <h1 className={styles.title}>
                            S'ha produït un error 404
                            <br />
                            <small>[Pàgina no trobada]</small>
                        </h1>
                        <p>
                            Si us plau, torna a la pàgina d'
                            <Link href='/'>
                                <a>Inici</a>
                            </Link>
                            .
                        </p>
                    </main>
                </div>
            </Layout>
        </motion.div>
    );
}
