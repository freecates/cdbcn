import Layout from '@components/layout';
import MDFileContent from '@components/mdncontentparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import { motion } from 'framer-motion';

const staticDataUrl = process.env.STATIC_DATA_URL;

const PoliticaDeCookies = ({ politicaDeCookies, footer, mdFileContent }) => {
    const { title, pageTitle, pageDescription } = politicaDeCookies.meta;
    const { routes: footerLinks } = footer;
    return (
        <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
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
        </motion.div>
    );
};

export const getStaticProps = async () => {
    const [politicaDeCookies] = await Promise.all([api.politicaDeCookies.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    const res = await fetch(`${staticDataUrl}/content/politica-de-cookies.md`);
    const mdFileContent = await res.text();
    return {
        props: {
            politicaDeCookies: { ...politicaDeCookies[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
        },
    };
};

export default PoliticaDeCookies;
