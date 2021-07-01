import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import MDFileContent from '@components/mdncontentparser';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter, IDataFigure } from '@interfaces/index';

const staticDataUrl = process.env.STATIC_DATA_URL;

type ParticipaProps = {
    participa: {
        meta: IMeta & {
            mobile: { href: string; number: string; name: string };
            email: { href: string; address: string };
        };
        images: { mainImage: IDataFigure };
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const Participa: React.FC<ParticipaProps> = ({ footer, routes, participa, mdFileContent }) => {
    const { title, pageTitle, pageDescription, mobile, email } = participa.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = participa.images.mainImage;
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
                    <h1>{pageTitle}</h1>

                    <p className={styles.description}>
                        <strong>Contractacions</strong>:<br />
                        <a href={mobile.href}>{mobile.number}</a> [{mobile.name}
                        ]
                        <br />
                        <a href={email.href}>{email.address}</a>
                        <br />
                        <br />
                        <small
                            className={styles.title}
                            dangerouslySetInnerHTML={{
                                __html: pageDescription,
                            }}
                        />
                    </p>
                </main>
            </div>
            <Figure data={mainImage} quality={75} layout={'responsive'} />
            <div className={`${styles.container}`}>
                <main className={`${styles.main}`}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [participa, footer, routes] = await Promise.all([
        api.participa.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    const res = await fetch(`${staticDataUrl}/content/participa.md`);
    const mdFileContent = await res.text();
    return {
        props: {
            footer: { ...footer[0] },
            participa: { ...participa[0] },
            routes,
            mdFileContent: mdFileContent,
        },
        revalidate: 60,
    };
};

export default Participa;
