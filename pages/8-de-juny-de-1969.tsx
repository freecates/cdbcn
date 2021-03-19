import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';

const staticDataUrl = process.env.STATIC_DATA_URL;

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
            <Figure data={mainImage} quality={100} layout={'responsive'} />

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
    const [vuitDeJuny1969, footer, routes] = await Promise.all([
        api.vuitDeJuny1969.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    const res = await fetch(`${staticDataUrl}/content/1969.md`);
    const mdFileContent = await res.text();
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
