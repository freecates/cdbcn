import type { Metadata } from 'next';
import Figure from '@components/figure';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import { IDataFigure } from '@interfaces/index';

type VuitDeJunyDe1969Props = {
    vuitDeJuny1969: {
        images: { mainImage: IDataFigure; imageGallery: IDataFigure };
    };
    mdFileContent: string;
};

const VuitDeJunyDe1969 = async () => {
    const { vuitDeJuny1969, mdFileContent }: VuitDeJunyDe1969Props = await getData();
    const mainImage = vuitDeJuny1969.images.mainImage;
    const imageGallery = vuitDeJuny1969.images.imageGallery;
    return (
        <>
            <Figure data={mainImage} quality={75} layout={'responsive'} />

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
    const vuitDeJuny1969 = await api.cdbData.getData('vuitDeJuny1969');
    const meta = { ...vuitDeJuny1969[0].meta };
    const { pageTitle, title, pageDescription } = meta;
    return {
        title: pageTitle,
        description: `${pageDescription} | ${title}`,
    };
};

const getData = async () => {
    const vuitDeJuny1969 = await api.cdbData.getData('vuitDeJuny1969');
    const mdData = await api.mdContent.getData('1969');
    return {
        vuitDeJuny1969: { ...vuitDeJuny1969[0] },
        mdFileContent: mdData,
    };
};

export { generateMetadata };
export default VuitDeJunyDe1969;
