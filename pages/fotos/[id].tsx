import Layout from '@components/layout';
import Post from '@components/post';
import api from '@libs/api.js';
import Fallback from '@components/fallback';
import { useRouter } from 'next/router';
import Custom404 from '../404';
import { GetStaticProps, GetStaticPaths } from 'next';

const flickrApiUrl = process.env.FLICKR_API_URL;
const flickrApiKey = process.env.FLICKR_APY_KEY;
const flickrApiUserId = process.env.FLICKR_API_USER_ID;
const type = 'fotos';
const QUERY = `${flickrApiUrl}?method=flickr.photos.search&format=json&nojsoncallback=?&api_key=${flickrApiKey}&user_id=${flickrApiUserId}&extras=description,url_m,date_upload,date_taken,media&per_page=200&content_type=1`;

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
    const res = await fetch(QUERY);
    const data = await res.json();
    const items = data.photos.photo;

    const paths = items.map((i) => `/${type}/${i.id}`);

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params.id;
    const res = await fetch(
        `${flickrApiUrl}/?method=flickr.photos.getInfo&format=json&nojsoncallback=?&api_key=${flickrApiKey}&photo_id=${id}`
    );
    const post = await res.json();
    const res2 = await fetch(
        `${flickrApiUrl}/?method=flickr.photos.getSizes&format=json&nojsoncallback=?&api_key=${flickrApiKey}&photo_id=${id}`
    );
    const fotoDetails = await res2.json();
    const fotoSizes = fotoDetails.sizes;

    const [footer] = await Promise.all([api.footer.getData()]);

    if (!post.error && !fotoDetails.error) {
        return { props: { post, fotoSizes, footer: { ...footer[0] } }, revalidate: 3600 };
    } else {
        return { props: { post: 'error', fotoSizes: 'error' } };
    }
};

export default Foto;
