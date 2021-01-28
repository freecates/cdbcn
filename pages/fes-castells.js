import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';

const Home = ({ footer, routes, fesCastells }) => {
    console.log('fesCastells ', fesCastells);
    const { title, pageTitle, pageDescription } = fesCastells.meta;
    const { routes: footerLinks } = footer;
    const mainImage = fesCastells.images.mainImage;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            footerLinks={footerLinks}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <h1>... Arribaran!</h1>
                    <h2 className={styles.title}>{pageDescription}</h2>
                    <p>(quan la COVID-19 deixi d'emprenyar)</p>
                </main>
            </div>
            <Figure data={mainImage} quality={100} />
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [fesCastells, footer, routes] = await Promise.all([
        api.fesCastells.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            footer: { ...footer[0] },
            fesCastells: { ...fesCastells[0] },
            routes,
        },
    };
};

export default Home;
