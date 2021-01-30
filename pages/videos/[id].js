import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Fallback from '@components/fallback';
import Post from '@components/post';
import Custom404 from '@pages/404';
import api from '@libs/api.js';

const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
const type = 'videos';

const Actuacio = ({ post, videoDetails, footer }) => {

    const { isFallback } = useRouter();
    if (!isFallback && !post) {
        return <Custom404 />;
    }
    if (isFallback) {
        return <Fallback />;
    }
    if (post === 'error') {
        return <Fallback notFound />;
    }
    const videoPlayer = post.items[0].player;
    const video = videoDetails.items[0].snippet;
    const pageTitle = video.title;
    const mainImage = video.thumbnails.maxres;
    const author = video.channelTitle;
    const date = video.publishedAt;
    const description = video.description;
    const { embedHtml } = videoPlayer;
    const id = post.items[0].id;
    const { routes: footerLinks } = footer;
    return (
        <Layout footerLinks={footerLinks}>
            <Post
                title={pageTitle}
                description={description}
                id={id}
                type={type}
                content={video}
                date={date}
                author={author}
                mainImage={mainImage}
                player={embedHtml}
            />{' '}
        </Layout>
    );
};

export async function getStaticPaths() {
    const req = await fetch(
        `${youtubeApiUrl}/search?part=snippet&channelId=${youtubeChannelId}&maxResults=30&order=date&type=video&key=${youtubeApiKey}`
    );
    const res = await req.json();

    const videos = res.items;

    const paths = videos.map((v) => `/${type}/${v.id}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        `${youtubeApiUrl}/videos?part=player&id=${params.id}&key=${youtubeApiKey}`
    );

    const post = await res.json();

    const res2 = await fetch(
        `${youtubeApiUrl}/videos?part=snippet&id=${params.id}&key=${youtubeApiKey}`
    );
    const videoDetails = await res2.json();

    const [footer] = await Promise.all([api.footer.getData()]);

    if (!post.error) {
        return { props: { post, videoDetails, footer: { ...footer[0] } }, revalidate: 1 };
    } else {
        return { props: { post: 'error' } };
    }
}

export default Actuacio;
