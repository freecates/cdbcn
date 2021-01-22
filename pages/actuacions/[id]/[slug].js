import { useRouter } from 'next/router';
import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import Fallback from '@components/fallback';
import Custom404 from '../../404';

const Actuacio = ({ post }) => {
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
    const pageTitle = post.acf.titular;
    const title = post.acf.nom_de_la_diada;
    const mainImage = post.acf.imatge_destacada;
    const content = post.acf.cronica_de_la_diada;
    const author = post._embedded.author[0].name;
    const date = post.acf.data;
    return (
        <Layout pageTitle={pageTitle} title={title} pageDescription={title}>
            <Figure data={mainImage} quality={100} withType withOverlay />

            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withOverlay}`}>
                    <p>
                        <small>{post.acf.peu_de_foto_de_la_imatge_destacada}</small>
                    </p>
                    <h2 className={styles.title}>{post.acf.nom_de_la_diada}</h2>
                    <h1 className={styles.title}>
                        <span>{post.acf.titular}</span>
                    </h1>
                    <p>
                        <small>
                            {author} | {date}
                        </small>
                    </p>

                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </main>
            </div>
            <div className={styles.summary}>
                <small dangerouslySetInnerHTML={{ __html: post.acf.resum_de_la_diada }} />
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const res = await fetch(
        'https://cms.castellersdebarcelona.cat/wp-json/wp/v2/actuacions?per_page=100'
    );
    const posts = await res.json();

    const paths = posts.map((post) => `/${post.type}/${post.id}/${post.slug}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        `https://cms.castellersdebarcelona.cat/wp-json/wp/v2/actuacions/${params.id}?_embed`
    );

    const post = await res.json();

    if (!post.data) {
        return { props: { post }, revalidate: 1 };
    } else {
        return { props: { post: '404' } };
    }
}

export default Actuacio;
