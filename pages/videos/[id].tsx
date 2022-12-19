import Layout from '@components/layout';
import Post from '@components/post';
import api from '@libs/api.js';
import Fallback from '@components/fallback';
import { useRouter } from 'next/router';
import Custom404 from '../404';
import { GetStaticProps, GetStaticPaths } from 'next';
import { IItem, IRoute, ISupporter } from '@interfaces/index';

const type = 'videos';

type VideoProps = {
    post: { items: IItem[] };
    videoDetails: { items: IItem[] };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
};

const Video: React.FC<VideoProps> = ({ post, videoDetails, footer }) => {
    const { isFallback } = useRouter();
    if (!isFallback && !post) {
        return <Custom404 />;
    }
    if (isFallback) {
        return <Fallback />;
    }
    if (post === null) {
        return <Fallback notFound />;
    }

    const videoPlayer = post.items[0].player;
    const video = videoDetails.items[0].snippet;
    const pageTitle = video.title;
    const mainImage = video.thumbnails.maxres
        ? video.thumbnails.maxres.url
        : video.thumbnails.standard
        ? video.thumbnails.standard.url
        : video.thumbnails.high.url;
    const author = video.channelTitle;
    const date = video.publishedAt;
    const description = video.description;
    const { embedHtml } = videoPlayer;
    const id = post.items[0].id;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            footerLinks={footerLinks}
            supporters={supporters}
            pageTitle={null}
            pageDescription={null}
            titlePage={null}
            navRoutes={null}
        >
            <Post
                title={pageTitle}
                description={description}
                id={id}
                type={type}
                content={null}
                date={date}
                author={author}
                mainImage={mainImage}
                player={embedHtml}
            />{' '}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const [data] = await Promise.all([
        api.youtubeData.getData('videos', null),
    ]);
    const items = data.items;

    const paths = items.map((i) => `/${type}/${i.id.videoId}`);

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params.id;

    const [post, videoDetails, footer] = await Promise.all([
        api.youtubeData.getData('video', id),
        api.youtubeData.getData('videoDetails', id),
        api.cdbData.getData('footer'),
    ]);

    if (!post.error && !videoDetails.error) {
        return { props: { post, videoDetails, footer: { ...footer[0] } }, revalidate: 3600 };
    } else {
        return { props: { post: null, videoDetails: null } };
    }
};

export default Video;
