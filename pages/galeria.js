import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';

const Home = ({ footer, routes }) => {
    const { routes: footerLinks } = footer;
    return (
        <Layout
            title={'Galeria'}
            pageTitle={'Galeria de Flick i Youtube'}
            pageDescription={'La Galeria de Flickr i Youtube dels Castellers de Barcelona'}
            navRoutes={routes}
            footerLinks={footerLinks}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <h1>... ;-)</h1>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [footer, routes] = await Promise.all([
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Home;
