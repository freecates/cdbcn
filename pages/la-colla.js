import Layout from '@components/layout';
import MDFileParser from '@components/mdnfileparser';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';

const LaColla = ({ colla }) => {
    const { title, pageTitle, pageDescription } = colla.meta;
    const mainImage = colla.images.mainImage;
    const imageGallery = colla.images.imageGallery;
    return (
        <Layout pageTitle={pageTitle} title={title} pageDescription={pageDescription}>
            <h1 className={styles.title}>La Colla</h1>
            <Figure data={mainImage} quality={100} />

            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <MDFileParser file={`1969.md`} />
                </main>
            </div>
            <Figure data={imageGallery} />
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [colla] = await Promise.all([api.colla.getData()]);
    return {
        props: {
            colla: { ...colla[0] },
        },
    };
};

export default LaColla;
