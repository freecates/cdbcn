import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Fallback from '@components/fallback';
import Post from '@components/post';
import Custom404 from '@pages/404';
import api from '@libs/api.js';


const wordPressApiUrl = process.env.WORDPRESS_API_URL;

const Actuacio = ({ post, footer }) => {
    const { isFallback } = useRouter();
    if (!isFallback && !post) {
        return (
            
                <Custom404 />
            
        );
    }
    if (isFallback) {
        return (
            
                <Fallback />
            
        );
    }
    if (post === '404') {
        return (
            
                <Fallback notFound />
            
        );
    }
    const pageTitle = post.acf.titular;
    const mainImage = post.acf.imatge_destacada;
    const author = post._embedded.author[0].name;
    const date = post.acf.data;
    const description = post.acf.cronica_de_la_diada;
    const { acf, type, id, slug } = post;
    const { routes: footerLinks } = footer;
    return (
        
            <Layout footerLinks={footerLinks}>
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
    const type = 'videos';
    const res = await fetch(`${wordPressApiUrl}/wp/v2/actuacions?per_page=100`);
    const posts = await res.json();

    const paths = posts.map((post) => `/${type}/${post.id}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${wordPressApiUrl}/wp/v2/actuacions/${params.id}?_embed`);

    const post = await res.json();

    const [footer] = await Promise.all([api.footer.getData()]);

    if (!post.data) {
        return { props: { post, footer: { ...footer[0] } }, revalidate: 1 };
    } else {
        return { props: { post: '404' } };
    }
}

export default Actuacio;
