import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Fallback from '@components/fallback';
import Post from '@components/post';
import Custom404 from '../../404';
import api from '@libs/api.js';
import { GetStaticProps, GetStaticPaths } from 'next';
import { IContent, IRoute, ISupporter } from '@interfaces/index';

type ActuacioProps = {
    post: {
        acf: IContent;
        _embedded: { author: { name: string } };
        type: string;
        id: string;
        slug: string;
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
};

const Actuacio: React.FC<ActuacioProps> = ({ post, footer }) => {
    const { isFallback } = useRouter();
    if (!isFallback && !post) {
        return <Custom404 />;
    }
    if (isFallback) {
        return <Fallback />;
    }
    if (post === null) {
        return <Fallback notFound />;
    }
    const pageTitle = post.acf.titular;
    const mainImage = post.acf.imatge_destacada;
    const author = post._embedded.author[0].name;
    const date = post.acf.data;
    const description = post.acf.cronica_de_la_diada;
    const { acf, type, id, slug } = post;
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
                content={acf}
                slug={slug}
                date={date}
                author={author}
                mainImage={mainImage}
            />
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await api.wpData.getData('actuacions', 100, null);

    const paths = posts.map((post) => `/${post.type}/${post.id}/${post.slug}`);

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const [post, footer] = await Promise.all([
        api.wpData.getData('actuacions', null, params.id),
        api.footer.getData(),
    ]);

    if (!post.data) {
        return { props: { post, footer: { ...footer[0] } }, revalidate: 1 };
    } else {
        return { props: { post: null } };
    }
};

export default Actuacio;
