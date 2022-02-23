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
    actiucionsData: IData;
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    contacte: {
        meta: {
            name: string;
            address: string;
            phone: { href: string; number: string };
            mobile: { href: string; number: string };
            mobile2: { href: string; number: string };
            mobile3: { href: string; number: string };
            web: string;
            email: { href: string; address: string };
            map: { title: string; url: string };
        };
    };
};

const Home: React.FC<HomeProps> = ({ actiucionsData, home, contacte, footer, routes }) => {
    const { title, pageTitle, pageDescription } = home.meta;
    const { name, address, phone, mobile, mobile2, mobile3, web, email, map } = contacte.meta;
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
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={map.url}
                        >
                            {address}
                        </a>
                        <br />
                        T. <a href={phone.href}>{phone.number}</a> | M. <a href={mobile2.href}>{mobile2.number}</a>
                        <br />
                        M. <a href={mobile3.href}>{mobile3.number}</a> [contractacions]
                        <br />
                        M. <a href={mobile.href}>{mobile.number}</a> [premsa]
                        <br />
                        {web}
                        <br />
                        <a href={email.href}>{email.address}</a>
                        <br />
                        <Link href={'/participa'}>
                            <a className={styles.button}>CONTRACTA&apos;NS</a>
                        </Link>
                    </p>
                    <hr className={styles.hr} />
                    <Grid data={actiucionsData} isThree />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res2 = await fetch(`${wordPressApiUrl}/wp/v2/actuacions?per_page=3&_embed`, {
        headers: { 'Cache-Control': 'no-cache' },
    });
    const actiucionsData = await res2.json();

    const [home, contacte, footer, routes] = await Promise.all([
        api.home.getData(),
        api.contacte.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            actiucionsData: actiucionsData,
            home: { ...home[0] },
            contacte: { ...contacte[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Home;
