import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Post from '@components/post';
import api from '@libs/api.js';

const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const type = 'videos';

const Video = ({ post, videoDetails, footer }) => {

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

Video.getInitialProps = async function (context) {
    const { id } = context.query
    const res = await fetch(`${youtubeApiUrl}/videos?part=player&id=${id}&key=${youtubeApiKey}`);
    const post = await res.json();

    const res2 = await fetch(`${youtubeApiUrl}/videos?part=snippet&id=${id}&key=${youtubeApiKey}`);
    const videoDetails = await res2.json();

    const [footer] = await Promise.all([api.footer.getData()]);

    return { post, videoDetails, footer: { ...footer[0] } };
};

export default Video;
