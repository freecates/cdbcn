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

export default Foto;
