import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import { motion } from 'framer-motion';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;

const Actuacions = ({ data, actuacions, footer, routes }) => {
    const { title, pageTitle, pageDescription } = actuacions.meta;
    const { routes: footerLinks } = footer;
    return (
        <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
            <Layout
                pageTitle={pageTitle}
                title={title}
                pageDescription={pageDescription}
                footerLinks={footerLinks}
                navRoutes={routes}
            >
                <h1 className={styles.title}>{pageTitle}</h1>
                <div className={`${styles.container} ${styles.noPadding}`}>
                    <main className={styles.main}>
                        <Grid data={data} isThree />
                    </main>
                </div>
            </Layout>
        </motion.div>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/actuacions?per_page=100&_embed`);
    const data = await res.json();
    const [actuacions, footer, routes] = await Promise.all([
        api.actuacions.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            data: data,
            actuacions: { ...actuacions[0] },
            footer: { ...footer[0] },
            routes,
        },
        revalidate: 1,
    };
};

export default Actuacions;
