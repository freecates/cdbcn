import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import OtherRoutes from '@components/otherroutes';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';


const staticDataUrl = process.env.STATIC_DATA_URL;

type CinquantaAnys50TuitsProps = {
    anys50tuits: {
        meta: IMeta & { otherRoutes: IRoute[] };
        images: { imageGallery: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const CinquantaAnys50Tuits: React.FC<CinquantaAnys50TuitsProps> = ({ anys50tuits, footer, mdFileContent, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = anys50tuits.meta;
    const { routes: footerLinks, supporters } = footer;
    const imageGallery = anys50tuits.images.imageGallery;
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
    const [anys50tuits, footer, routes] = await Promise.all([
        api.anys50tuits.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    const res = await fetch(`${staticDataUrl}/content/50-anys-50-tuits.md`);
    const mdFileContent = await res.text();

    return {
        props: {
            anys50tuits: { ...anys50tuits[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
    };
};

export default CinquantaAnys50Tuits;
