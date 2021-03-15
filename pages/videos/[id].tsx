import Layout from '@components/layout';
import Post from '@components/post';
import api from '@libs/api.js';
import Fallback from '@components/fallback';
import { useRouter } from 'next/router';
import Custom404 from '../404';
import { GetStaticProps, GetStaticPaths } from 'next';
import { IItem, IRoute, ISupporter } from '@interfaces/index';

const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
const type = 'videos';
const QUERY = `${youtubeApiUrl}/search?part=snippet&channelId=${youtubeChannelId}&maxResults=5&order=date&type=video&key=${youtubeApiKey}`;

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
    // @ts-ignore
    if (post === 'error') {
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
    const res = await fetch(QUERY);
    const data = await res.json();
    const items = data.items;

    const paths = items.map((i) => `/${type}/${i.id.videoId}`);

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params.id;
    const res = await fetch(`${youtubeApiUrl}/videos?part=player&id=${id}&key=${youtubeApiKey}`);
    const post = await res.json();
    const res2 = await fetch(`${youtubeApiUrl}/videos?part=snippet&id=${id}&key=${youtubeApiKey}`);
    const videoDetails = await res2.json();

    const [footer] = await Promise.all([api.footer.getData()]);

    if (!post.error && !videoDetails.error) {
        return { props: { post, videoDetails, footer: { ...footer[0] } }, revalidate: 3600 };
    } else {
        return { props: { post: 'error', videoDetails: 'error' } };
    }
};

/* Video.getInitialProps = async function (context) {
    const { id } = context.query
    const res = await fetch(`${youtubeApiUrl}/videos?part=player&id=${id}&key=${youtubeApiKey}`);
    const post = await res.json();

    const res2 = await fetch(`${youtubeApiUrl}/videos?part=snippet&id=${id}&key=${youtubeApiKey}`);
    const videoDetails = await res2.json();

    const [footer] = await Promise.all([api.footer.getData()]);

    return { post, videoDetails, footer: { ...footer[0] } };
}; */

export default Video;
