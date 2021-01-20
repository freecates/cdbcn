import Layout from '@components/layout';
import Video from '@components/video';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Link from 'next/link';

const Home = ({ home }) => {
    const { title, pageTitle, pageDescription } = home.meta;
    const mainVideo = home.videos.mainVideo;
    return (
        <Layout title={title} pageTitle={pageTitle} pageDescription={pageDescription} home>
            <div className={styles.wrapperVideo}>
                <Video data={mainVideo} />
            </div>
            <div className={styles.container}>
                <main className={styles.main}>
                    <p className={styles.description}>
                        <strong>Colla Castellers de Barcelona</strong>
                        <br />
                        [La Colla Degana de la Ciutat -{' '}
                        <Link href={'/la-colla'}>
                            <a>1969</a>
                        </Link>
                        ]
                        <br />
                        <br />
                        Carrer de Bilbao, 212 - 214 08018, Barcelona
                        <br />
                        T. 934 98 27 28
                        <br />
                        M. 608 28 72 78 [premsa]
                        <br />
                        www.castellersdebarcelona.cat
                        <br />
                        <a href={'mailto:colla@castellersdebarcelona.cat'}>
                            colla@castellersdebarcelona.cat
                        </a>
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const [home] = await Promise.all([api.home.getData()]);
    return {
        props: {
            home: { ...home[0] },
        },
    };
};

export default Home;
