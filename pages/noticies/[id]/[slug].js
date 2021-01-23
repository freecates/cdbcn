import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Fallback from '@components/fallback';
import Post from '@components/post';
import Custom404 from '../../404';

const Noticia = ({ post }) => {
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
    const date = post.acf.data_de_la_noticia;
    const description = post.acf.cos_de_text_de_la_noticia;
    const { acf, type, id, slug } = post;
    return (
        <Layout>
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
    const res = await fetch(
        'https://cms.castellersdebarcelona.cat/wp-json/wp/v2/noticies?per_page=100'
    );
    const posts = await res.json();

    const paths = posts.map((post) => `/${post.type}/${post.id}/${post.slug}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        `https://cms.castellersdebarcelona.cat/wp-json/wp/v2/noticies/${params.id}?_embed`
    );

    const post = await res.json();

    if (!post.data) {
        return { props: { post }, revalidate: 1 };
    } else {
        return { props: { post: '404' } };
    }
}

export default Noticia;
