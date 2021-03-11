import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';
import { GetStaticProps } from 'next';

const staticDataUrl = process.env.STATIC_DATA_URL;

const LaColla = ({ colla, footer, routes, mdFileContent }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = colla.meta;
    const mainImage = colla.images.mainImage;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
            supporters={supporters}
        >
            <h1 className={styles.title}>La Colla</h1>

            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>

            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>

            <Figure data={mainImage} quality={100} layout={'responsive'} />

            <hr className={styles.hr} />

            <div className={styles.container}>
                <p>
                    <small>
                        Els textos i les imatges d'aquestes seccions estan extrets del LLibre:
                        Esteves, R., Cervera, R., Cortijo, D. (2020).{' '}
                        <em>
                            Barcelona Terra de Castells - 50è Aniversari dels Castellers de
                            Barcelona
                        </em>
                        , Barcelona, Espanya, Ajuntament de Barcelona.
                    </small>
                </p>
                <OtherRoutes routes={otherRoutes} isButton={false} />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [colla, footer, routes] = await Promise.all([
        api.colla.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    const res = await fetch(`${staticDataUrl}/content/colla.md`);
    const mdFileContent = await res.text();
    return {
        props: {
            colla: { ...colla[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
    };
};

export default LaColla;
