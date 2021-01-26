import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;

const Noticies = ({ data, noticies, footer }) => {
    const { title, pageTitle, pageDescription } = noticies.meta;
    const { routes: footerLinks} = footer;
    return (
        <Layout pageTitle={pageTitle} title={title} pageDescription={pageDescription} footerLinks={footerLinks}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container} ${styles.noPadding}`}>
                <main className={styles.main}>
                    <Grid data={data} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(
        `${wordPressApiUrl}/wp/v2/noticies?per_page=100&_embed`
    );
    const data = await res.json();
    const [noticies] = await Promise.all([api.noticies.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    return {
        props: {
            data: data,
            noticies: { ...noticies[0] },
            footer: { ...footer[0] },
        },
        revalidate: 1,
    };
};

export default Noticies;
