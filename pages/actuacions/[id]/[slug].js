import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
const Actuacio = ({ post }) => {
    const { title } = post;
    const mainImage = post.acf.imatge_destacada;
    const content = post.acf.cronica_de_la_diada;
    return (
        <Layout pageTitle={title.rendered} title={title.rendered} pageDescription={title.rendered}>
            <Figure data={mainImage} quality={100} withType withOverlay />

            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withOverlay}`}>
                    <p>
                        <small>{post.acf.peu_de_foto_de_la_imatge_destacada}</small>
                    </p>
                    <h1 className={styles.title}>{post.acf.nom_de_la_diada}</h1>
                    <h2 className={styles.title}>
                        <span>{post.acf.titular}</span>
                    </h2>

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
        `https://cms.castellersdebarcelona.cat/wp-json/wp/v2/actuacions/${params.id}`
    );
    const dataRes = await res.json();

    return { props: { post: dataRes } };
}

export default Actuacio;
