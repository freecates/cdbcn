import styles from '@styles/Home.module.scss';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import { IDataFigure } from '@interfaces/index';

const staticDataUrl = process.env.STATIC_DATA_URL;

type CinquantaDosAnys52TuitsProps = {
    anys52tuits: {
        images: { imageGallery: IDataFigure };
    };
    mdFileContent: string;
};

const CinquantaDosAnys52Tuits = async () => {
    const { anys52tuits, mdFileContent }: CinquantaDosAnys52TuitsProps = await getData();
    const imageGallery = anys52tuits.images.imageGallery;
    return (
        <>
            <div className={`${styles.container}`}>
                <main className={styles.main}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} />
        </>
    );
};

const getData = async () => {
    const anys52tuits = await api.cdbData.getData('anys52tuits');
    const mdData = await api.mdContent.getData('52-anys-52-tuits');

    return {
        anys52tuits: { ...anys52tuits[0] },
        mdFileContent: mdData,
    };
};

export const revalidate = 60;

export default CinquantaDosAnys52Tuits;
