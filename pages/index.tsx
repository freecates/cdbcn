import Grid from '@components/grid';
import Layout from '@components/layout';
import Video from '@components/video';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { IData, IRoute, ISupporter, IMeta } from '@interfaces/index';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;
const bearerToken = process.env.BEARER_TOKEN;

type HomeProps = {
    home: {
        meta: IMeta;
        videos: {
            mainVideo: {
                width: string;
                height: string;
                srcSet: {
                    src: string;
                    type: string;
                    map(arg0: (d: any, index: any) => JSX.Element): import('react').ReactNode;
                };
            };
        };
    };
    noticiesData: IData;
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    contacte: {
        meta: {
            name: string;
            address: string;
            phone: { href: string; number: string };
            mobile: { href: string; number: string };
            web: string;
            email: { href: string; address: string };
        };
    };
};

const Home: React.FC<HomeProps> = ({ noticiesData, home, contacte, footer, routes }) => {
    const { title, pageTitle, pageDescription } = home.meta;
    const { name, address, phone, mobile, web, email } = contacte.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainVideo = home.videos.mainVideo;
    return (
        <Layout
            titlePage={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            home
            footerLinks={footerLinks}
            supporters={supporters}
            videoPreload={mainVideo}
        >
            <div className={styles.wrapperVideo}>
                <Video data={mainVideo} />
            </div>
            <div className={`${styles.container} ${styles.withOverlay} ${styles.noPadding}`}>
                <main className={`${styles.main} ${styles.withOverlay}`}>
                    <p className={styles.description}>
                        <strong>{name}</strong>
                        <br />
                        [La Colla Degana de la Ciutat -{' '}
                        <Link href={'/la-colla'}>
                            <a>1969</a>
                        </Link>
                        ]
                        <br />
                        <br />
                        {address}
                        <br />
                        T. <a href={phone.href}>{phone.number}</a>
                        <br />
                        M. <a href={mobile.href}>{mobile.number}</a> [premsa]
                        <br />
                        {web}
                        <br />
                        <a href={email.href}>{email.address}</a>
                        <br />
                        <Link href={'/participa'}>
                            <a className={styles.button}>CONTRACTA'NS</a>
                        </Link>
                    </p>
                    <hr className={styles.hr} />
                    <Grid data={noticiesData} isThree />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res2 = await fetch(`${wordPressApiUrl}/wp/v2/noticies?per_page=3&_embed`, {
        headers: { 'Cache-Control': 'no-cache' },
    });
    const noticiesData = await res2.json();

    const [home, contacte, footer, routes] = await Promise.all([
        api.home.getData(),
        api.contacte.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            noticiesData: noticiesData,
            home: { ...home[0] },
            contacte: { ...contacte[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Home;
