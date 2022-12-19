import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';


type VuitDeJunyDe1969Props = {
    vuitDeJuny1969: {
        meta: IMeta & { otherRoutes: IRoute[] };
        images: { mainImage: IDataFigure; imageGallery: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const VuitDeJunyDe1969: React.FC<VuitDeJunyDe1969Props> = ({
    vuitDeJuny1969,
    footer,
    mdFileContent,
    routes,
}) => {
    const { title, pageTitle, pageDescription, otherRoutes } = vuitDeJuny1969.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = vuitDeJuny1969.images.mainImage;
    const imageGallery = vuitDeJuny1969.images.imageGallery;
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
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} />
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} isButton />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [vuitDeJuny1969, footer, routes, mdFileContent] = await Promise.all([
        api.cdbData.getData('vuitDeJuny1969'),
        api.cdbData.getData('footer'),
        api.cdbData.getData('routes'),
        api.mdContent.getData('1969'),
    ]);
    return {
        props: {
            vuitDeJuny1969: { ...vuitDeJuny1969[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
    };
};

export default VuitDeJunyDe1969;
