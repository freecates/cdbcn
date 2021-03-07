import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Fallback from '@components/fallback';
import Post from '@components/post';
import Custom404 from '../../404';
import api from '@libs/api.js';

const wordPressApiUrl = process.env.WORDPRESS_API_URL;
const bearerToken = process.env.BEARER_TOKEN;

const Noticia = ({ post, footer }) => {
    const { isFallback } = useRouter();
    if (!isFallback && !post) {
        return <Custom404 />;
    }
    if (isFallback) {
        return <Fallback />;
    }
    if (post === '404') {
        return <Fallback notFound />;
    }
    const pageTitle = post.acf.titular_de_la_noticia;
    const mainImage = post.acf.imatge_destacada;
    const author = post._embedded.author[0].name;
    const date = post.acf.data;
    const description = post.acf.cos_de_text_de_la_noticia;
    const { acf, type, id, slug } = post;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout footerLinks={footerLinks} supporters={supporters}>
            <Post
                title={pageTitle}
                description={description}
                id={id}
                type={type}
                content={acf}
                slug={slug}
                date={date}
                author={author}
                mainImage={mainImage}
            />
        </Layout>
    );
};

export async function getStaticPaths() {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/noticies?per_page=100`, {
        headers: { 'Cache-Control': 'no-cache' },
    });
    const posts = await res.json();

    const paths = posts.map((post) => `/${post.type}/${post.id}/${post.slug}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/noticies/${params.id}?_embed`, {
        headers: { 'Cache-Control': 'no-cache' },
    });

    const post = await res.json();

    const [footer] = await Promise.all([api.footer.getData()]);

    if (!post.data) {
        return { props: { post, footer: { ...footer[0] } }, revalidate: 1 };
    } else {
        return { props: { post: '404' } };
    }
}

export default Noticia;
