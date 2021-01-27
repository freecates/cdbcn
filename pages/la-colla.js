import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';

const staticDataUrl = process.env.STATIC_DATA_URL;

const LaColla = ({ colla, footer, routes }) => {
    const { title, pageTitle, pageDescription, otherRoutes } = colla.meta;
    const { routes: footerLinks } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
        >
            <h1 className={styles.title}>La Colla</h1>
            <div className={styles.container}>
                <OtherRoutes routes={otherRoutes} />
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [colla, footer, routes] = await Promise.all([
        api.colla.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            colla: { ...colla[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default LaColla;
