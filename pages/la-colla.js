import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';

const staticDataUrl = process.env.STATIC_DATA_URL;

const LaColla = ({ colla, footer, mdFileContent }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = colla.meta;
    const { routes: footerLinks } = footer;
    const mainImage = colla.images.mainImage;
    const imageGallery = colla.images.imageGallery;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
        >
            <h1 className={styles.title}>La Colla</h1>
            <Figure data={mainImage} quality={100} />

            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} />
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [colla] = await Promise.all([api.colla.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    const res = await fetch(`${staticDataUrl}/content/1969.md`);
    const mdFileContent = await res.text();
    return {
        props: {
            colla: { ...colla[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
        },
    };
};

export default LaColla;
