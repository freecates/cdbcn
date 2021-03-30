import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import Figure from '@components/figure';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';

type GaleriaProps = {
    galeria: {
        meta: IMeta & { otherRoutes: IRoute[] };
        images: { mainImage: IDataFigure; imageGallery: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
};

const Galeria: React.FC<GaleriaProps> = ({ galeria, footer, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = galeria.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = galeria.images.mainImage;
    return (
        <Layout
            titlePage={title}
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
            <Figure data={mainImage} quality={75} layout={'responsive'} />
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

export default Galeria;
