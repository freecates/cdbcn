import type { Metadata } from 'next';
import Post from '@components/post';
import api from '@libs/api.js';
import { IContent } from '@interfaces/index';
import Script from 'next/script';
import Fallback from '@components/fallback';

type ActuacioProps = {
    post: {
        acf: IContent;
        _embedded: { author: { name: string } };
        type: string;
        id: string;
        slug: string;
    };
};

const ActualitatPost = async ({ params }) => {
    const { post }: ActuacioProps = await getData(params);
    if (!post) {
        return <Fallback notFound />;
    }
    const pageTitle =
        post.acf[`${params.slug === 'noticies' ? 'titular_de_la_noticia' : 'titular'}`];
    const mainImage = post.acf.imatge_destacada;
    const author = post._embedded.author[0].name;
    const date = post.acf.data;
    const description =
        post.acf[
            `${params.slug === 'noticies' ? 'cos_de_text_de_la_noticia' : 'cronica_de_la_diada'}`
        ];
    const { acf, type, id, slug } = post;
    return (
        <>
            <Script
                id={id}
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: `
{
"@context": "http://schema.org",
"@type": "NewsArticle",
"mainEntityOfPage": {
"@type": "WebPage",
"@id": "${`https://castellersdebarcelona.cat/` + type + '/' + id + '/' + slug}"
},
"author": {
"@type": "Person",
"name": "${author}"
},
"publisher": {
"@type": "Organization",
"name": "Castellers de Barcelona",
"logo": {
 "@type": "ImageObject",
 "url": "https://castellersdebarcelona.cat/logo-castellers-de-barcelona.png"
}
}, 
"description": "${description.substring(3, 120)}...",
"image": "${mainImage.sizes.large}",
"datePublished": "${date}",
"headline": "${pageTitle.replace(/['"]+/g, '')}"
}`,
                }}
            />
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
        </>
    );
};

const getData = async (params) => {
    const post = await api.wpData.getData(params.slug, null, params.id);

    if (!post.data) {
        return { post };
    } else {
        return { post: null };
    }
};

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const post = await api.wpData.getData(params.slug, null, params.id);
    if (!post.data) {
        const pageTitle =
            post.acf[`${params.slug === 'noticies' ? 'titular_de_la_noticia' : 'titular'}`];
        const mainImage = post.acf.imatge_destacada;
        const description =
            post.acf[
                `${
                    params.slug === 'noticies' ? 'cos_de_text_de_la_noticia' : 'cronica_de_la_diada'
                }`
            ];
        const { type, id, slug } = post;
        return {
            title: `${pageTitle} - Castelllers de Barcelona - ${type}`,
            description: `${description.substring(3, 240)}...`,
            openGraph: {
                title: pageTitle,
                description: `${description.substring(3, 240)}...`,
                url: `https://castellersdebarcelona.cat/${type}/${id}/${slug}`,
                images: [
                    {
                        url: mainImage.sizes.large,
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
                images: [mainImage.sizes.large],
            },
            alternates: {
                canonical: `https://castellersdebarcelona.cat/${type}/${id}/${slug}`,
            },
        };
    } else {
        return { title: 'Not found' };
    }
};

export async function generateStaticParams() {
    const noticies = await api.wpData.getData('noticies', 100, null);
    const actuacions = await api.wpData.getData('actuacions', 100, null);
    const staticParamsNews = noticies.map((post: { type: string; id: number; slug: string }) => ({
        slug: post.type,
        id: `${post.id}`,
        name: post.slug,
    }));
    const staticParamsPerformances = actuacions.map(
        (post: { type: string; id: number; slug: string }) => ({
            slug: post.type,
            id: `${post.id}`,
            name: post.slug,
        }),
    );
    return [...staticParamsNews, ...staticParamsPerformances];
}

export const dynamicParams = true;

export const revalidate = 30;

export { generateMetadata };
export default ActualitatPost;
