import api from '@libs/api.js';
import { IItem } from '@interfaces/index';

const type = 'videos';

type VideoProps = {
    post?: { items: IItem[] };
    videoDetails?: { items: IItem[] };
};

const Head = async ({ params }) => {
    const { post, videoDetails }: VideoProps = await getData(params);
    if (!post) {
        return (
            <>
                <title>Not found</title>
            </>
        );
    }
    const video = videoDetails.items[0].snippet;
    const pageTitle = video.title;
    const mainImage = video.thumbnails.maxres
        ? video.thumbnails.maxres.url
        : video.thumbnails.standard
        ? video.thumbnails.standard.url
        : video.thumbnails.high.url;
    const description = video.description;
    const id = post.items[0].id;
    return (
        <>
            <title>{`${pageTitle} - Castelllers de Barcelona - ${type}`}</title>
            <meta name='description' content={`${description.substring(0, 240)}...`} />

            <meta property='fb:app_id' content='1064356173625695' />
            <meta property='og:url' content={`https://castellersdebarcelona.cat/${type}/${id}`} />
            <meta property='og:type' content='article' />
            <meta property='og:title' content={pageTitle} />
            <meta property='og:description' content={`${description.substring(0, 240)}...`} />
            <meta property='og:image' content={mainImage} />
            <meta property='og:image:width' content={'1024'} />
            <meta property='og:image:height' content={'1024'} />

            <meta name='twitter:card' content='player' />
            <meta name='twitter:site' content='@cdbcn' />
            <meta name='twitter:title' content={pageTitle} />
            <meta name='twitter:description' content={`${description.substring(0, 240)}...`} />
            <meta name='twitter:image:src' content={mainImage} />
            <meta name='twitter:player' content={`https://www.youtube.com/embed/${id}`} />
            <meta name='twitter:player:width' content='480' />
            <meta name='twitter:player:height' content='360' />

            <link rel='canonical' href={`https://castellersdebarcelona.cat/${type}/${id}`} />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
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

    if (!post.items.length && !videoDetails.items.length) {
        return { post: null, videoDetails: null };
    } else return { post, videoDetails };
};

export default Head;
