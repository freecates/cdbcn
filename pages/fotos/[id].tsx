import Layout from '@components/layout';
import Post from '@components/post';
import api from '@libs/api.js';
import Fallback from '@components/fallback';
import { useRouter } from 'next/router';
import Custom404 from '../404';
import { GetStaticProps, GetStaticPaths } from 'next';

const type = 'fotos';

const Foto = ({ post, fotoSizes, footer }) => {
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

    const foto = post.photo;
    const pageTitle = post.photo.title._content;
    const mainImage = fotoSizes.size.filter((x) => x.label === 'Original');
    const author = post.photo.owner.realname;
    const date = post.photo.dates.taken;
    const description = post.photo.description._content;
    const id = post.photo.id;
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
                content={foto}
                date={date}
                author={author}
                mainImage={mainImage}
            />{' '}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await api.flickrData.getData('photos', null);
    const items = data.photos.photo;

    const paths = items.map((i) => `/${type}/${i.id}`);

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params.id;
    const [post, fotoDetails, footer] = await Promise.all([
        api.flickrData.getData('photo', id),
        api.flickrData.getData('photoDetails', id),
        api.footer.getData(),
    ]);
    const fotoSizes = fotoDetails.sizes;

    if (!post.error && !fotoDetails.error) {
        return { props: { post, fotoSizes, footer: { ...footer[0] } }, revalidate: 3600 };
    } else {
        return { props: { post: 'error', fotoSizes: 'error' } };
    }
};

export default Foto;
