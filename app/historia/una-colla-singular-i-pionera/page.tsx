import type { Metadata } from 'next';
import api from '@libs/api.js';
import MDFileContent from '@components/mdncontentparser';
import Figure from '@components/figure';
import { IDataFigure } from '@interfaces/index';

type UnaCollaSingularIPioneraProps = {
    unaCollaSingularIPionera: {
        meta: { title: string };
        images: { mainImage: IDataFigure; imageGallery: IDataFigure };
    };
    mdFileContent: string;
};

const UnaCollaSingularIPionera = async () => {
    const { unaCollaSingularIPionera, mdFileContent }: UnaCollaSingularIPioneraProps =
        await getData();
    const { title } = unaCollaSingularIPionera.meta;
    const mainImage = unaCollaSingularIPionera.images.mainImage;
    const imageGallery = unaCollaSingularIPionera.images.imageGallery;
    return (
        <>
            <Figure data={mainImage} quality={75} layout={'responsive'} />

            <div className={`${'container'}`}>
                <main className={'main'}>
                    <h1>{title}</h1>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>
            <Figure data={imageGallery} isOne />
        </>
    );
};

const generateMetadata = async (): Promise<Metadata> => {
    const unaCollaSingularIPionera = await api.cdbData.getData('unaCollaSingularIPionera');
    const meta = { ...unaCollaSingularIPionera[0].meta };
    const { pageTitle, title, pageDescription } = meta;
    return {
        title: pageTitle,
        description: `${pageDescription} | ${title}`,
    };
};

const getData = async () => {
    const unaCollaSingularIPionera = await api.cdbData.getData('unaCollaSingularIPionera');
    const mdData = await api.mdContent.getData('una-colla-singular-i-pionera');
    return {
        unaCollaSingularIPionera: { ...unaCollaSingularIPionera[0] },
        mdFileContent: mdData,
    };
};

export { generateMetadata };
export default UnaCollaSingularIPionera;
