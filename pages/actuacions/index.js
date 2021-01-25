import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';

const Actuacions = ({ data, actuacions, footer }) => {
    const { title, pageTitle, pageDescription } = actuacions.meta;
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
        `https://cms.castellersdebarcelona.cat/wp-json/wp/v2/actuacions?per_page=100&_embed`
    );
    const data = await res.json();
    const [actuacions] = await Promise.all([api.actuacions.getData()]);
    const [footer] = await Promise.all([api.footer.getData()]);
    return {
        props: {
            data: data,
            actuacions: { ...actuacions[0] },
            footer: { ...footer[0] },
        },
        revalidate: 1,
    };
};

export default Actuacions;
