import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import { GetStaticProps } from 'next';
import { IData, IRoute, ISupporter, IMeta } from '@interfaces/index';

type ActuacionsProps = {
    data: IData;
    actuacions: { meta: IMeta };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
};

const Actuacions: React.FC<ActuacionsProps> = ({ data, actuacions, footer, routes }) => {
    const { title, pageTitle, pageDescription } = actuacions.meta;
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
                    <Grid data={data} isThree />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [actuacions, footer, routes, data] = await Promise.all([
        api.cdbData.getData('actuacions'),
        api.cdbData.getData('footer'),
        api.cdbData.getData('routes'),
        api.wpData.getData('actuacions', 99, null),
    ]);
    return {
        props: {
            actuacions: { ...actuacions[0] },
            footer: { ...footer[0] },
            routes,
            data: data,
        },
        revalidate: 1,
    };
};

export default Actuacions;
