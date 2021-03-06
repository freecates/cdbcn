import Layout from '@components/layout';
import MDFileContent from '@components/mdncontentparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter } from '@interfaces/index';

const staticDataUrl = process.env.STATIC_DATA_URL;

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
