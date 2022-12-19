import Layout from '@components/layout';
import MDFileContent from '@components/mdncontentparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter } from '@interfaces/index';

type PoliticaDeCookiesProps = {
    politicaDeCookies: {
        meta: IMeta;
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    mdFileContent: string;
};

const PoliticaDeCookies: React.FC<PoliticaDeCookiesProps> = ({
    politicaDeCookies,
    footer,
    mdFileContent,
}) => {
    const { title, pageTitle, pageDescription } = politicaDeCookies.meta;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            titlePage={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            supporters={supporters}
            navRoutes={null}
        >
            <h1 className={styles.title}>{title}</h1>

            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [politicaDeCookies, footer, mdFileContent] = await Promise.all([
        api.cdbData.getData('politicaDeCookies'),
        api.cdbData.getData('footer'),
        api.mdContent.getData('politica-de-cookies'),
    ]);
    return {
        props: {
            politicaDeCookies: { ...politicaDeCookies[0] },
            footer: { ...footer[0] },
            mdFileContent: mdFileContent,
        },
    };
};

export default PoliticaDeCookies;
