import type { Metadata } from 'next';
import Figure from '@components/figure';
import api from '@libs/api.js';
import OtherRoutes from '@components/otherroutes';
import MDFileContent from '@components/mdncontentparser';
import { IRoute, IDataFigure } from '@interfaces/index';

type LaCollaProps = {
    colla: {
        meta: { newOtherRoutes: IRoute[] };
        images: { mainImage: IDataFigure };
    };
    mdFileContent: string;
};

const LaColla = async () => {
    const { colla, mdFileContent }: LaCollaProps = await getData();
    const { newOtherRoutes } = colla.meta;
    const mainImage = colla.images.mainImage;
    return (
        <>
            <h1 className={'title'}>La Colla</h1>

            <div className={'container'}>
                <OtherRoutes routes={newOtherRoutes} />
            </div>

            <div className={`${'container'} ${'withOverlay'}`}>
                <main className={`${'main'} ${'withUnderlay'}`}>
                    <MDFileContent content={mdFileContent} />
                </main>
            </div>

            <Figure data={mainImage} quality={75} layout={'responsive'} />

            <hr className={'hr'} />

            <div className={'container'}>
                <p>
                    <small>
                        Els textos i les imatges d&apos;aquestes seccions estan extrets del LLibre:
                        Esteves, R., Cervera, R., Cortijo, D. (2020).{' '}
                        <em>
                            Barcelona Terra de Castells - 50è Aniversari dels Castellers de
                            Barcelona
                        </em>
                        , Barcelona, Espanya, Ajuntament de Barcelona.
                    </small>
                </p>
                <OtherRoutes routes={newOtherRoutes} isButton={false} />
            </div>
        </>
    );
};

const generateMetadata = async (): Promise<Metadata> => {
    const colla = await api.cdbData.getData('colla');
    const meta = { ...colla[0].meta };
    const { pageTitle, title, pageDescription } = meta;
    return {
        title: pageTitle,
        description: `${pageDescription} | ${title}`,
        alternates: {
            canonical: `https://castellersdebarcelona.cat/historia/la-colla`,
        },
    };
};

const getData = async () => {
    const colla = await api.cdbData.getData('colla');
    const mdData = await api.mdContent.getData('colla');
    return {
        colla: { ...colla[0] },
        mdFileContent: mdData,
    };
};

export { generateMetadata };
export default LaColla;
