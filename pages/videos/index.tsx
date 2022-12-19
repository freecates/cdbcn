import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Fallback from '@components/fallback';
import { FaYoutube } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import { IData, IRoute, ISupporter, IMeta } from '@interfaces/index';


type VideosProps = {
    data: { items: IData };
    videos: { meta: IMeta };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
};

const Videos: React.FC<VideosProps> = ({ data, footer, routes, videos }) => {
    if (data === null) {
        return <Fallback notFound />;
    }
    const videosData = data.items;
    const { title, pageTitle, pageDescription } = videos.meta;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            titlePage={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
            supporters={supporters}
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
                                rel={'noopener nofollow noreferrer'}
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

export const getStaticProps: GetStaticProps = async () => {
    const [data, videos, footer, routes] = await Promise.all([
        api.youtubeData.getData('videos', null),
        api.cdbData.getData('videos'), 
        api.cdbData.getData('footer'), 
        api.cdbData.getData('routes'),
    ]);

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
        return { props: { data: null } };
    }
};

export default Videos;
