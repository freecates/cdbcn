import Layout from '@components/layout';
import MDFileContent from '@components/mdncontentparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';

const staticDataUrl = process.env.STATIC_DATA_URL;

const AvisLegal = ({ avisLegal, footer, mdFileContent }) => {
    const { title, pageTitle, pageDescription } = avisLegal.meta;
    const { routes: footerLinks } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
        >
            <h1 className={styles.title}>{title}</h1>

            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [avisLegal] = await Promise.all([api.avisLegal.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    const res = await fetch(`${staticDataUrl}/content/avis-legal.md`);
    const mdFileContent = await res.text();
    return {
        props: {
            avisLegal: { ...avisLegal[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
        },
    };
};

export default AvisLegal;
