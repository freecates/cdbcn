import Layout from '@components/layout';
import MDFileParser from '@components/mdnfileparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';

const AvisLegal = ({ avisLegal, footer }) => {
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
                    <MDFileParser file={`avis-legal.md`} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [avisLegal] = await Promise.all([api.avisLegal.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    return {
        props: {
            avisLegal: { ...avisLegal[0] },
            footer: { ...footer[0] },
        },
    };
};

export default AvisLegal;
