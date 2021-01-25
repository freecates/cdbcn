import Layout from '@components/layout';
import MDFileParser from '@components/mdnfileparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';

const PoliticaDeCookies = ({ politicaDeCookies, footer }) => {
    const { title, pageTitle, pageDescription } = politicaDeCookies.meta;
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
                    <MDFileParser file={`politica-de-cookies.md`} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [politicaDeCookies] = await Promise.all([api.politicaDeCookies.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    return {
        props: {
            politicaDeCookies: { ...politicaDeCookies[0] },
            footer: { ...footer[0] },
        },
    };
};

export default PoliticaDeCookies;
