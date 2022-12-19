import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';
import Figure from '@components/figure';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';


type UnaCollaSingularIPioneraProps = {
    unaCollaSingularIPionera: {
        meta: IMeta & { otherRoutes: IRoute[] };
        images: { mainImage: IDataFigure; imageGallery: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const UnaCollaSingularIPionera: React.FC<UnaCollaSingularIPioneraProps> = ({ unaCollaSingularIPionera, footer, mdFileContent, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = unaCollaSingularIPionera.meta;
    const mainImage = unaCollaSingularIPionera.images.mainImage;
    const imageGallery = unaCollaSingularIPionera.images.imageGallery;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            titlePage={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            supporters={supporters}
            navRoutes={routes}
        >
            <Figure data={mainImage} quality={75} layout={'responsive'} />

            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <h1>{title}</h1>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} isOne />
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} isButton />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [unaCollaSingularIPionera, footer, routes, mdFileContent] = await Promise.all([
        api.cdbData.getData('unaCollaSingularIPionera'),
        api.cdbData.getData('footer'),
        api.cdbData.getData('routes'),
        api.mdContent.getData('una-colla-singular-i-pionera'),
    ]);
    return {
        props: {
            unaCollaSingularIPionera: { ...unaCollaSingularIPionera[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
    };
};

export default UnaCollaSingularIPionera;
