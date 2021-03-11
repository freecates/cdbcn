import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import { FaMapSigns } from 'react-icons/fa';
import { GetStaticProps } from 'next';

const FesCastells = ({ footer, routes, fesCastells }) => {
    const { title, pageTitle, pageDescription, map } = fesCastells.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = fesCastells.images.mainImage;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <h1>... Arribaran!</h1>
                    <h2
                        className={styles.title}
                        dangerouslySetInnerHTML={{
                            __html: pageDescription,
                        }}
                    />
                    <h3 className={styles.title}>
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener norefer'}
                            href={map.url}
                        >
                            <FaMapSigns />
                        </a>
                    </h3>
                    <p>(quan la COVID-19 deixi d'emprenyar)</p>
                </main>
            </div>
            <Figure data={mainImage} quality={100} layout={'responsive'} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
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

export default FesCastells;
