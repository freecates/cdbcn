import type { Metadata } from 'next';
import Fallback from '@components/fallback';
import Post from '@components/post';
import api from '@libs/api.js';

const type = 'fotos';

const Foto = async ({ params }) => {
    const { photo, fotoSizes } = await getData(params);
    if (!photo) {
        return <Fallback notFound />;
    }
    const foto = photo.photo;
    const pageTitle = photo.photo.title._content;
    const mainImage = fotoSizes.size.filter((x: { label: string }) => x.label === 'Original');
    const author = photo.photo.owner.realname;
    const date = photo.photo.dates.taken;
    const description = photo.photo.description._content;
    const id = photo.photo.id;
    return (
        <>
            <Post
                title={pageTitle}
                description={description}
                id={id}
                type={type}
                content={foto}
                date={date}
                author={author}
                mainImage={mainImage}
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

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const id = params.id;
    const [photo, photoDetails] = await Promise.all([
        api.flickrData.getData('photo', id),
        api.flickrData.getData('photoDetails', id),
    ]);
    const fotoSizes = photoDetails.sizes;
    if (photo.code !== 1 && photoDetails.code !== 1) {
        const pageTitle = photo.photo.title._content;
        const mainImage = fotoSizes.size.filter((x: { label: string }) => x.label === 'Original');
        const description = photo.photo.description._content;
        const id = photo.photo.id;
        return {
            title: `${pageTitle} - Castelllers de Barcelona - ${type}`,
            description: `${description.substring(3, 240)}...`,
            openGraph: {
                title: pageTitle,
                description: `${description.substring(3, 240)}...`,
                url: `https://castellersdebarcelona.cat/${type}/${id}`,
                images: [
                    {
                        url: mainImage[0].source,
                        width: 1024,
                        height: 1024,
                    },
                ],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: pageTitle,
                description: `${description.substring(3, 240)}...`,
                site: '@cdbcn',
                creator: 'Castellers de Barcelona',
                images: [mainImage[0].source],
            },
            alternates: {
                canonical: `https://castellersdebarcelona.cat/${type}/${id}`,
            },
        };
    } else {
        return { title: 'Not found' };
    }
};

export async function generateStaticParams() {
    const data = await api.flickrData.getData('photos');
    const fotosData = data.photos.photo;
    const staticParams = fotosData.map((d: { id: number }) => ({
        id: `${d.id}`,
    }));
    return staticParams;
}

export const dynamicParams = true;

export const revalidate = 3600;

export { generateMetadata };
export default Foto;
