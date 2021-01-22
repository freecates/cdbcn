import { useRouter } from 'next/router';
import Fallback from '@components/fallback';
import Custom404 from '../404';

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
    return <p>Notícia {post.slug}</p>;
};

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'la-primera-noticia' } }],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    return { props: { post: params }, revalidate: 1 };
}

export default Noticia;
