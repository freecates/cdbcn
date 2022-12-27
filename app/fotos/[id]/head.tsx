import api from '@libs/api.js';
import { IFlickrPhotoSize } from '@interfaces/index';

const type = 'fotos';

type Props = {
    photo: {
        photo: {
            title: { _content: string };
            description: { _content: string };
            id: number;
        };
    } | null;
    fotoSizes: { size: IFlickrPhotoSize[] } | null;
};

const Head = async ({ params }) => {
    const { photo, fotoSizes }: Props = await getData(params);
    if (!photo) {
        return (
            <>
                <title>Not found</title>
            </>
        );
    }
    const pageTitle = photo.photo.title._content;
    const mainImage = fotoSizes.size.filter((x: { label: string }) => x.label === 'Original');
    const description = photo.photo.description._content;
    const id = photo.photo.id;
    return (
        <>
            <title>{`${pageTitle} - Castelllers de Barcelona - ${type}`}</title>
            <meta name='description' content={`${description}...`} />

            <meta property='fb:app_id' content='1064356173625695' />
            <meta property='og:url' content={`https://castellersdebarcelona.cat/${type}/${id}`} />
            <meta property='og:type' content='article' />
            <meta property='og:title' content={pageTitle} />
            <meta property='og:description' content={`${description}...`} />
            <meta property='og:image' content={mainImage[0].source} />
            <meta property='og:image:width' content={'1024'} />
            <meta property='og:image:height' content={'1024'} />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='cdbcn' />
            <meta name='twitter:creator' content='Castellers de Barcelona' />
            <meta name='twitter:title' content={pageTitle} />
            <meta name='twitter:description' content={`${description}...`} />

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
    const [photo, photoDetails] = await Promise.all([
        api.flickrData.getData('photo', id),
        api.flickrData.getData('photoDetails', id),
    ]);
    const fotoSizes = photoDetails.sizes;

    if (photo.code !== 1 && photoDetails.code !== 1) {
        return { photo, fotoSizes };
    } else {
        return { photo: null, fotoSizes: null };
    }
};

export default Head;
