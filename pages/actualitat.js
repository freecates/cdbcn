import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;

const Actualitat = ({ actuacionsData, noticiesData, footer, routes }) => {
    const pageTitle = 'Actualitat';
    const title = 'Actualitat dels Castellers de Barcelona';
    const pageDescription = "Recull de l'Actualitat dels Castellers de Barcelona";
    const { routes: footerLinks } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
        >
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container} ${styles.noPadding}`}>
                <main className={styles.main}>
                    <Grid data={actuacionsData} />
                    <Grid data={noticiesData} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/actuacions?per_page=2&_embed`);
    const actuacionsData = await res.json();
    const res2 = await fetch(`${wordPressApiUrl}/wp/v2/noticies?per_page=2&_embed`);
    const noticiesData = await res2.json();
    const [footer, routes] = await Promise.all([api.footer.getData(), api.routes.getData()]);
    return {
        props: {
            actuacionsData: actuacionsData,
            noticiesData: noticiesData,
            footer: { ...footer[0] },
            routes,
        },
        revalidate: 1,
    };
};

export default Actualitat;
