import Grid from '@components/grid';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
import Fallback from '@components/fallback';
import { FaFlickr } from 'react-icons/fa';

const Fotos = async () => {
    const { data, fotos } = await getData();
    if (data === 'error') {
        return <Fallback notFound />;
    }
    const fotosData = data.photos.photo;
    const { pageTitle } = fotos.meta;
    return (
        <>
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
        </>
    );
};

const getData = async () => {
    const [fotos, data] = await Promise.all([
        api.cdbData.getData('fotos'),
        api.flickrData.getData('photos'),
    ]);

    if (!data.error) {
        return {
            data: data,
            fotos: { ...fotos[0] },
        };
    } else {
        return { data: 'error' };
    }
};

export const revalidate = 3600;

export default Fotos;
