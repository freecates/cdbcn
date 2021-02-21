import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';
import Figure from '@components/figure';

const staticDataUrl = process.env.STATIC_DATA_URL;

const unaCollaSingularIPionera = ({ unaCollaSingularIPionera, footer, mdFileContent, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = unaCollaSingularIPionera.meta;
    const mainImage = unaCollaSingularIPionera.images.mainImage;
    const imageGallery = unaCollaSingularIPionera.images.imageGallery;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            supporters={supporters}
            navRoutes={routes}
        >
            <Figure data={mainImage} quality={100} layout={'responsive'} />

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

export const getStaticProps = async () => {
    const [unaCollaSingularIPionera, footer, routes] = await Promise.all([
        api.unaCollaSingularIPionera.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    const res = await fetch(`${staticDataUrl}/content/una-colla-singular-i-pionera.md`);
    const mdFileContent = await res.text();
    return {
        props: {
            unaCollaSingularIPionera: { ...unaCollaSingularIPionera[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
            routes,
        },
    };
};

export default unaCollaSingularIPionera;
