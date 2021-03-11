import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;
const bearerToken = process.env.BEARER_TOKEN;

const Actualitat = ({ actuacionsData, noticiesData, footer, routes }) => {
    const pageTitle = 'Actualitat';
    const title = 'Actualitat dels Castellers de Barcelona';
    const pageDescription = "Recull de l'Actualitat dels Castellers de Barcelona";
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
            supporters={supporters}
        >
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container} ${styles.noPadding}`}>
                <main className={styles.main}>
                    <h2>
                        <Link href={`/${noticiesData[0].type}`}>
                            <a>[{noticiesData[0].type}]</a>
                        </Link>
                    </h2>
                    <Grid data={noticiesData} />
                    <p>
                        <Link href={`/${noticiesData[0].type}`}>
                            <a className={styles.more} title={`Anar a "${noticiesData[0].type}"`}>
                                [+]
                            </a>
                        </Link>
                    </p>
                    <hr className={styles.hr} />
                    <h2>
                        <Link href={`/${actuacionsData[0].type}`}>
                            <a>[{actuacionsData[0].type}]</a>
                        </Link>
                    </h2>
                    <Grid data={actuacionsData} />
                    <p>
                        <Link href={`/${actuacionsData[0].type}`}>
                            <a className={styles.more} title={`Anar a "${actuacionsData[0].type}"`}>
                                [+]
                            </a>
                        </Link>
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/actuacions?per_page=2&_embed`, {
        headers: { 'Cache-Control': 'no-cache' },
    });
    const actuacionsData = await res.json();
    const res2 = await fetch(`${wordPressApiUrl}/wp/v2/noticies?per_page=2&_embed`, {
        headers: { 'Cache-Control': 'no-cache' },
    });
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
