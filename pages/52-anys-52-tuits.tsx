import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import OtherRoutes from '@components/otherroutes';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';


type CinquantaDosAnys52TuitsProps = {
    anys52tuits: {
        meta: IMeta & { otherRoutes: IRoute[] };
        images: { imageGallery: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const CinquantaDosAnys52Tuits: React.FC<CinquantaDosAnys52TuitsProps> = ({ anys52tuits, footer, mdFileContent, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = anys52tuits.meta;
    const { routes: footerLinks, supporters } = footer;
    const imageGallery = anys52tuits.images.imageGallery;
    return (
        
            <Layout
                pageTitle={pageTitle}
                titlePage={title}
                navRoutes={routes}
                pageDescription={pageDescription}
                footerLinks={footerLinks}
                supporters={supporters}
            >

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
    const [anys52tuits, footer, routes, mdFileContent] = await Promise.all([
        api.cdbData.getData('anys52tuits'),
        api.cdbData.getData('footer'),
        api.cdbData.getData('routes'),
        api.mdContent.getData('52-anys-52-tuits'),
    ]);

    return {
        props: {
            anys52tuits: { ...anys52tuits[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
        revalidate: 60,
    };
};

export default CinquantaDosAnys52Tuits;
