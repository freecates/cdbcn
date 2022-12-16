import api from '@libs/api.js';
import { IContent } from '@interfaces/index';
type Props = {
    post: {
        acf: IContent;
        type: string;
        id: string;
        slug: string;
    };
};

const Head = async ({ params }) => {
    const { post }: Props = await getData(params);
    if (!post) {
        return (
            <>
                <title>Not Found</title>
            </>
        );
    }
    const pageTitle =
        post.acf[`${params.slug === 'noticies' ? 'titular_de_la_noticia' : 'titular'}`];
    const mainImage = post.acf.imatge_destacada;
    const description =
        post.acf[
            `${params.slug === 'noticies' ? 'cos_de_text_de_la_noticia' : 'cronica_de_la_diada'}`
        ];
    const { type, id, slug } = post;
    return (
        <>
            <title>{`${pageTitle} - Castelllers de Barcelona - ${type}`}</title>
            <meta name='description' content={`${description.substring(3, 240)}...`} />

            <meta property='fb:app_id' content='1064356173625695' />
            <meta
                property='og:url'
                content={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
            />
            <meta property='og:type' content='article' />
            <meta property='og:title' content={pageTitle} />
            <meta property='og:description' content={`${description.substring(3, 240)}...`} />
            <meta property='og:image' content={mainImage.sizes.large} />
            <meta property='og:image:width' content={'1024'} />
            <meta property='og:image:height' content={'1024'} />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='cdbcn' />
            <meta name='twitter:creator' content='Castellers de Barcelona' />
            <meta name='twitter:title' content={pageTitle} />
            <meta name='twitter:description' content={`${description.substring(3, 240)}...`} />
            <meta name='twitter:image:src' content={mainImage.sizes.large} />

            <link
                rel='canonical'
                href={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
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

export default Head;
