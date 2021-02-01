import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Fallback from '@components/fallback';
import { FaYoutube } from 'react-icons/fa';

const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
const QUERY = `${youtubeApiUrl}/search?part=snippet&channelId=${youtubeChannelId}&maxResults=100&order=date&type=video&key=${youtubeApiKey}`;

const Videos = ({ data, footer, routes, videos }) => {
    if (data === 'error') {
        return <Fallback notFound />;
    }
    const videosData = data.items;
    const { title, pageTitle, pageDescription } = videos.meta;
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
                    <hr />
                    <p>
                        <small>
                            Més videos al nostre canal de{' '}
                            <a
                                target='_blank'
                                rel={'noopener nofollow'}
                                href='https://www.youtube.com/user/arxiucdb'
                            >
                                <FaYoutube /> Youtube
                            </a>
                        </small>
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(QUERY);
    const data = await res.json();
    const [videos] = await Promise.all([api.videos.getData()]);
    const [footer, routes] = await Promise.all([api.footer.getData(), api.routes.getData()]);

    /* return {
        props: {
            data: { ...videos[0] },
            footer: { ...footer[0] },
            routes,
        },
        revalidate: 1,
    }; */

    if (!data.error) {
        return {
            props: {
                data: data,
                videos: { ...videos[0] },
                footer: { ...footer[0] },
                routes,
            },
            revalidate: 3600,
        };
    } else {
        return { props: { data: 'error' } };
    }
};

export default Videos;
