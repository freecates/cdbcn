import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';

const staticDataUrl = process.env.STATIC_DATA_URL;

const CinquantaAnys50Tuits = ({ anys50tuits, footer, mdFileContent }) => {

    console.log('mdFileContent ', mdFileContent);
    
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
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} />
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [anys50tuits] = await Promise.all([api.anys50tuits.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    const res = await fetch(`${staticDataUrl}/content/50-anys-50-tuits.md`);
    const mdFileContent = await res.text();
    
    return {
        props: {
            anys50tuits: { ...anys50tuits[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
        },
    };
};

export default CinquantaAnys50Tuits;
