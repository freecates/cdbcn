import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import { FaMapSigns } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';

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

const FesCastells: React.FC<FesCastellsProps> = ({ footer, routes, fesCastells }) => {
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
                    <h1>Hem tornat!</h1>
                    <h2
                        className={styles.title}
                        dangerouslySetInnerHTML={{
                            __html: pageDescription,
                        }}
                    />
                    <h3 className={styles.title}>
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={map.url}
                        >
                            <FaMapSigns />
                        </a>
                    </h3>
                    <p>
                        {' '}
                        Ens trobaràs a {location.alternateName}, {location.address.streetAddres},{' '}
                        {location.address.postalCode} {location.address.addressLocality}
                    </p>

                    <p>[la COVID-19 ha deixat gairebé d&apos;emprenyar ;-)]</p>
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
    return {
        props: {
            footer: { ...footer[0] },
            fesCastells: { ...fesCastells[0] },
            routes,
        },
    };
};

export default FesCastells;
