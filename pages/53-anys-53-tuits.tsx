import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import OtherRoutes from '@components/otherroutes';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';


type CinquantaTresAnys53TuitsProps = {
    anys53tuits: {
        meta: IMeta & { otherRoutes: IRoute[] };
        images: { imageGallery: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const CinquantaTresAnys53Tuits: React.FC<CinquantaTresAnys53TuitsProps> = ({ anys53tuits, footer, mdFileContent, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = anys53tuits.meta;
    const { routes: footerLinks, supporters } = footer;
    const imageGallery = anys53tuits.images.imageGallery;
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
    const [anys53tuits, footer, routes, mdFileContent] = await Promise.all([
        api.cdbData.getData('anys53tuits'),
        api.cdbData.getData('footer'),
        api.cdbData.getData('routes'),
        api.mdContent.getData('53-anys-53-tuits'),
    ]);

    return {
        props: {
            anys53tuits: { ...anys53tuits[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
        revalidate: 60,
    };
};

export default CinquantaTresAnys53Tuits;
