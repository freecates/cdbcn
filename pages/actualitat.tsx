import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { IData, IRoute, ISupporter } from '@interfaces/index';

type ActualitatProps = {
    actuacionsData: IData;
    noticiesData: IData;
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
};

const Actualitat: React.FC<ActualitatProps> = ({
    actuacionsData,
    noticiesData,
    footer,
    routes,
}) => {
    const pageTitle = 'Actualitat';
    const title = 'Actualitat dels Castellers de Barcelona';
    const pageDescription = "Recull de l'Actualitat dels Castellers de Barcelona";
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            titlePage={title}
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
                            [{noticiesData[0].type}]
                        </Link>
                    </h2>
                    <Grid data={noticiesData} />
                    <p>
                        <Link
                            href={`/${noticiesData[0].type}`}
                            className={styles.more}
                            title={`Anar a "${noticiesData[0].type}"`}>
                            
                                [+]
                            
                        </Link>
                    </p>
                    <hr className={styles.hr} />
                    <h2>
                        <Link href={`/${actuacionsData[0].type}`}>
                            [{actuacionsData[0].type}]
                        </Link>
                    </h2>
                    <Grid data={actuacionsData} />
                    <p>
                        <Link
                            href={`/${actuacionsData[0].type}`}
                            className={styles.more}
                            title={`Anar a "${actuacionsData[0].type}"`}>
                            
                                [+]
                            
                        </Link>
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [footer, routes, actuacionsData, noticiesData] = await Promise.all([
        api.cdbData.getData('footer'), 
        api.cdbData.getData('routes'),
        api.wpData.getData('actuacions', 2, null),
        api.wpData.getData('noticies', 2, null),
    ]);
    return {
        props: {
            footer: { ...footer[0] },
            routes,
            actuacionsData: actuacionsData,
            noticiesData: noticiesData,
        },
        revalidate: 1,
    };
};

export default Actualitat;
