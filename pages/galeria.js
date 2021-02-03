import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import Figure from '@components/figure';

const Home = ({ galeria, footer, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = galeria.meta;
    const { routes: footerLinks } = footer;
    const mainImage = galeria.images.mainImage;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            footerLinks={footerLinks}
        >
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <p>{pageDescription}</p>
                </main>
            </div>
            <Figure data={mainImage} quality={100} />
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
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
