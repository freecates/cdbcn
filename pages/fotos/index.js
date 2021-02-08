import Grid from '@components/grid';
import Layout from '@components/layout';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Fallback from '@components/fallback';
import { FaFlickr } from 'react-icons/fa';

const flickrApiUrl = process.env.FLICKR_API_URL;
const flickrApiKey = process.env.FLICKR_APY_KEY;
const flickrApiUserId = process.env.FLICKR_API_USER_ID;
const QUERY = `${flickrApiUrl}?method=flickr.photos.search&format=json&nojsoncallback=?&api_key=${flickrApiKey}&user_id=${flickrApiUserId}&extras=description,url_m,date_upload,date_taken,media&per_page=200&content_type=1`;

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
            title={title}
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
                                rel={'noopener nofollow'}
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

export const getStaticProps = async () => {
    const res = await fetch(QUERY);
    const data = await res.json();
    const [fotos] = await Promise.all([api.fotos.getData()]);
    const [footer, routes] = await Promise.all([api.footer.getData(), api.routes.getData()]);

    /* return {
        props: {
            data: { ...fotos[0] },
            footer: { ...footer[0] },
            routes,
        },
        revalidate: 1,
    }; */

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
