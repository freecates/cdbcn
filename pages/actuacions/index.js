import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';

const Actuacions = ({ data, actuacions }) => {
    const { title, pageTitle, pageDescription } = actuacions.meta;
    return (
        <Layout pageTitle={pageTitle} title={title} pageDescription={pageDescription}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container}`}>
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
    return {
        props: {
            data: data,
            actuacions: { ...actuacions[0] },
        },
        revalidate: 1,
    };
};

export default Actuacions;
