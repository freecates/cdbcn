import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Fallback from '@components/fallback';
import { FaFlickr } from 'react-icons/fa';
import { GetStaticProps } from 'next';


const Fotos = ({ data, footer, routes, fotos }) => {
    if (data === 'error') {
        return <Fallback notFound />;
    }
    const fotosData = data.photos.photo;
    const { title, pageTitle, pageDescription } = fotos.meta;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            pageTitle={pageTitle}
            titlePage={title}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            navRoutes={routes}
            supporters={supporters}
        >
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container} ${styles.noPadding}`}>
                <main className={styles.main}>
                    <Grid data={fotosData} isThree />
                    <hr />
                    <p>
                        <small>
                            Més fotos al nostre canal de{' '}
                            <a
                                target='_blank'
                                rel={'noopener nofollow noreferrer'}
                                href='https://www.flickr.com/photos/105597577@N08/'
                            >
                                <FaFlickr /> Flickr
                            </a>
                        </small>
                    </p>
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [data, fotos, footer, routes] = await Promise.all([
        api.flickrData.getData('photos', null),
        api.cdbData.getData('fotos'),
        api.cdbData.getData('footer'), 
        api.cdbData.getData('routes'),
    ]);

    if (!data.error) {
        return {
            props: {
                data: data,
                fotos: { ...fotos[0] },
                footer: { ...footer[0] },
                routes,
            },
            revalidate: 3600,
        };
    } else {
        return { props: { data: 'error' } };
    }
};

export default Fotos;
