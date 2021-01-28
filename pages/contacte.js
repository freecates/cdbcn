import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import { FaMapSigns } from 'react-icons/fa';

const Home = ({ contacte, footer, routes }) => {
    const { title, pageTitle, pageDescription, map } = contacte.meta;
    const mainImage = contacte.images.mainImage;
    const { routes: footerLinks } = footer;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            contacte
            navRoutes={routes}
            footerLinks={footerLinks}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <p className={styles.description}>
                        <strong>Colla Castellers de Barcelona</strong>
                        <br />
                        <br />
                        Carrer de Bilbao, 212 - 214 08018, Barcelona
                        <br />
                        T. 934 98 27 28
                        <br />
                        M. 608 28 72 78 [premsa]
                        <br />
                        www.castellersdebarcelona.cat
                        <br />
                        <a href={'mailto:colla@castellersdebarcelona.cat'}>
                            colla@castellersdebarcelona.cat
                        </a>
                        <br />
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener norefer'}
                            href={map.url}
                        >
                            <FaMapSigns />
                        </a>
                    </p>
                </main>
            </div>
            <Figure data={mainImage} quality={100} />
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [contacte, footer, routes] = await Promise.all([
        api.contacte.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            contacte: { ...contacte[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Home;
