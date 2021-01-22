const Noticia = ({ post }) => {
    return <p>Notícia {post.slug}</p>;
};

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'la-primera-noticia' } }],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    return { props: { post: params } };
}

export default Noticia;
