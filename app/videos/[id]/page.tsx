import type { Metadata } from 'next';
import Post from '@components/post';
import api from '@libs/api.js';
import { IItem } from '@interfaces/index';
import Fallback from '@components/fallback';

const type = 'videos';

type VideoProps = {
    post?: { items: IItem[] };
    videoDetails?: { items: IItem[] };
};

const Video = async props => {
    const params = await props.params;
    const { post, videoDetails }: VideoProps = await getData(params);
    if (!post) {
        return <Fallback notFound />;
    }

    const videoPlayer = post.items[0].player;
    const video = videoDetails?.items[0].snippet;
    const pageTitle = video?.title;
    const mainImage = video?.thumbnails.maxres
        ? video?.thumbnails.maxres.url
        : video?.thumbnails.standard
        ? video?.thumbnails.standard.url
        : video?.thumbnails.high.url;
    const author = video?.channelTitle;
    const date = video?.publishedAt;
    const description = video?.description;
    const { embedHtml } = videoPlayer;
    const id = post.items[0].id;
    return (
        <>
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
            />
        </>
    );
};

const getData = async (params) => {
    const id = params.id;
    const [post, videoDetails] = await Promise.all([
        api.flickrData.getData('video', id),
        api.flickrData.getData('videoDetails', id),
    ]);

    if (!post?.items?.length && !videoDetails?.items?.length) {
        return { post: null, videoDetails: null };
    } else return { post, videoDetails };
};

const generateMetadata = async (props): Promise<Metadata> => {
    const params = await props.params;
    const id = params.id;
    const [post, videoDetails] = await Promise.all([
        api.flickrData.getData('video', id),
        api.flickrData.getData('videoDetails', id),
    ]);
    if (!post.items.length && !videoDetails.items.length) {
        return { title: 'Not found' };
    } else {
        const video = videoDetails.items[0].snippet;
        const pageTitle = video.title;
        const mainImage = video.thumbnails.maxres
            ? video.thumbnails.maxres.url
            : video.thumbnails.standard
            ? video.thumbnails.standard.url
            : video.thumbnails.high.url;
        const description = video.description;
        const id = post.items[0].id;
        return {
            metadataBase: new URL('https://castellersdebarcelona.cat'),
            title: `${pageTitle} - Castelllers de Barcelona - ${type}`,
            description: `${description.substring(3, 240)}...`,
            openGraph: {
                title: pageTitle,
                description: `${description.substring(3, 240)}...`,
                url: `/${type}/${id}`,
                images: [
                    {
                        url: mainImage,
                        width: 1024,
                        height: 1024,
                    },
                ],
                type: 'article',
            },
            twitter: {
                card: 'player',
                title: pageTitle,
                description: `${description.substring(3, 240)}...`,
                site: '@cdbcn',
                images: [mainImage],
                players: [
                    {
                        playerUrl: `https://www.youtube.com/embed/${id}`,
                        streamUrl: `https://www.youtube.com/embed/${id}`,
                        width: 480,
                        height: 360,
                    },
                ],
            },
            alternates: {
                canonical: `/${type}/${id}`,
            },
        };
    }
};

export async function generateStaticParams() {
    const data = await api.youtubeData.getData('videos');
    const { items } = data;
    const staticParams = items.map((d: { id: { videoId: number } }) => ({
        id: `${d.id.videoId}`,
    }));
    return staticParams;
}

export const dynamicParams = true;

export const revalidate = 3600;

export { generateMetadata };
export default Video;
