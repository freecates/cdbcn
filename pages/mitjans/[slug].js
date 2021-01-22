const Mitja = ({ post }) => {
    return <p>Mitjà {post.slug}</p>;
};

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'la-primera-aparicio' } }],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    return { props: { post: params } };
}

export default Mitja;
