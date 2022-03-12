import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import MDFileContent from '@components/mdncontentparser';
import { FaMapSigns } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';

const staticDataUrl = process.env.STATIC_DATA_URL;

type FesCastellsProps = {
    fesCastells: {
        meta: IMeta & {
            map: { title: string; url: string };
            location: {
                address: { addressLocality: string; postalCode: string; streetAddres: string };
                alternateName: string;
            };
        };
        images: { mainImage: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const FesCastells: React.FC<FesCastellsProps> = ({ footer, routes, fesCastells, mdFileContent }) => {
    const { title, pageTitle, pageDescription, map, location } = fesCastells.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = fesCastells.images.mainImage;
    return (
        <Layout
            titlePage={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <h1>Fes castells!</h1>
                    <MDFileContent content={mdFileContent} />
                    <p>
                        {' '}
                        Ens trobaràs a {location.alternateName}, {location.address.streetAddres},{' '}
                        {location.address.postalCode} {location.address.addressLocality}
                    </p>
                    <h2 className={styles.title}>
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={map.url}
                        >
                            <FaMapSigns />
                        </a>
                    </h2>
                </main>
            </div>
            <Figure data={mainImage} quality={75} layout={'responsive'} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [fesCastells, footer, routes] = await Promise.all([
        api.fesCastells.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);

    const res = await fetch(`${staticDataUrl}/content/fes-castells.md`);
    const mdFileContent = await res.text();

    return {
        props: {
            footer: { ...footer[0] },
            fesCastells: { ...fesCastells[0] },
            mdFileContent: mdFileContent,
            routes,
        },
        revalidate: 1,
    };
};

export default FesCastells;
