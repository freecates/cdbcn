import Layout from '@components/layout';
import MDFileParser from '@components/mdnfileparser';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';

const CinquantaAnys50Tuits = ({ anys50tuits, footer }) => {
    const { title, pageTitle, pageDescription } = anys50tuits.meta;
    const { routes: footerLinks } = footer;
    const imageGallery = anys50tuits.images.imageGallery;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
        >
            <h1 className={styles.title}>La Colla</h1>

            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <MDFileParser file={`50-anys-50-tuits.md`} />
                </main>
            </div>
            <Figure data={imageGallery} />
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [anys50tuits] = await Promise.all([api.anys50tuits.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    return {
        props: {
            anys50tuits: { ...anys50tuits[0] },
            footer: { ...footer[0] },
        },
    };
};

export default CinquantaAnys50Tuits;
