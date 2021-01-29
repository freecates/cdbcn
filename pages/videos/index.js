import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Fallback from '@components/fallback';

const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;

const Actuacions = ({ data, actuacions, footer, routes }) => {
    const videosData = data.items;
    if (data === 'error') {
        return <Fallback notFound />;
    }
    const { title, pageTitle, pageDescription } = actuacions.meta;
    const { routes: footerLinks } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            title={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
        >
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container} ${styles.noPadding}`}>
                <main className={styles.main}>
                    <Grid data={videosData} isThree />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    /* const res = await fetch(
        `${youtubeApiUrl}/search?part=snippet&channelId=${youtubeChannelId}&maxResults=30&order=date&type=video&key=${youtubeApiKey}`
    );
    const data = await res.json(); */
    const [actuacions, videos, footer, routes] = await Promise.all([
        api.actuacions.getData(),
        api.videos.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);

    return {
        props: {
            data: { ...videos[0] },
            actuacions: { ...actuacions[0] },
            footer: { ...footer[0] },
            routes,
        },
        revalidate: 1,
    };    

    /* if (!data.error) {
        return {
            props: {
                data: data,
                actuacions: { ...actuacions[0] },
                footer: { ...footer[0] },
                routes,
            },
            revalidate: 1,
        };
    } else {
        return { props: { data: 'error' } };
    } */
};

export default Actuacions;
