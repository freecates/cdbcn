import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import Figure from '@components/figure';
import { GetStaticProps } from 'next';

const Home = ({ galeria, footer, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = galeria.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = galeria.images.mainImage;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <p>{pageDescription}</p>
                </main>
            </div>
            <Figure data={mainImage} quality={100} layout={'responsive'} />
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [galeria, footer, routes] = await Promise.all([
        api.galeria.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            galeria: { ...galeria[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Home;
