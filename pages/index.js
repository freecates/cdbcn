import Layout from '@components/layout';
import Video from '@components/video';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Link from 'next/link';

const Home = ({ home, contacte, footer, routes }) => {
    const { title, pageTitle, pageDescription } = home.meta;
    const { name, address, phone, mobile, web, email, map } = contacte.meta;
    const { routes: footerLinks, supporters } = footer;
    const mainVideo = home.videos.mainVideo;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            home
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={styles.wrapperVideo}>
                <Video data={mainVideo} />
            </div>
            <div className={`${styles.container} ${styles.withOverlay}`}>
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
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [home, contacte, footer, routes] = await Promise.all([
        api.home.getData(),
        api.contacte.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            home: { ...home[0] },
            contacte: { ...contacte[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Home;
