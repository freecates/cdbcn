import type { Metadata } from 'next';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import { IDataFigure } from '@interfaces/index';

type CinquantaTresAnys53TuitsProps = {
    anys53tuits: {
        images: { imageGallery: IDataFigure };
    };
    mdFileContent: string;
};

const CinquantaTresAnys53Tuits = async () => {
    const { anys53tuits, mdFileContent }: CinquantaTresAnys53TuitsProps = await getData();
    const imageGallery = anys53tuits.images.imageGallery;
    return (
        <>
            <div className={`${'container'}`}>
                <main className={'main'}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} />
        </>
    );
};

const generateMetadata = async (): Promise<Metadata> => {
    const anys53tuits = await api.cdbData.getData('anys53tuits');
    const meta = { ...anys53tuits[0].meta };
    const { pageTitle, title, pageDescription } = meta;
    return {
        title: pageTitle,
        description: `${pageDescription} | ${title}`,
    };
};

const getData = async () => {
    const anys53tuits = await api.cdbData.getData('anys53tuits');
    const mdData = await api.mdContent.getData('53-anys-53-tuits');

    return {
        anys53tuits: { ...anys53tuits[0] },
        mdFileContent: mdData,
    };
};

export const revalidate = 60;

export { generateMetadata };
export default CinquantaTresAnys53Tuits;
