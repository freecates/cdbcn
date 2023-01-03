import Grid from '@components/grid';
import api from '@libs/api.js';
import { IData, IMeta } from '@interfaces/index';
import Fallback from '@components/fallback';

type WpTypeProps = {
    wpData: IData;
    cdbData: { meta: IMeta };
};

const WpTypePage = async ({ params }) => {
    const { wpType } = params;
    const { wpData, cdbData }: WpTypeProps = await getData(wpType);
    if (!wpData) {
        return <Fallback notFound />;
    }
    const { pageTitle } = cdbData.meta;
    return (
        <>
            <h1 className={'title'}>{pageTitle}</h1>
            <div className={`${'container'} ${'noPadding'}`}>
                <main className={'main'}>
                    <Grid data={wpData} isThree />
                </main>
            </div>
        </>
    );
};

const getData = async (wpType: string) => {

    const [wpData, cdbData] = await Promise.all([
        api.wpData.getData(wpType, 99),
        api.cdbData.getData(wpType),
    ]);
    if (!wpData.data) {
        return {
            wpData,
            cdbData: { ...cdbData[0] },
        };
    } else {
        return {
            wpData: null,
            cdbData: null,
        };
    }
};

export const generateStaticParams = async () => {
    return [{ wpType: 'noticies' }, { wpType: 'actuacions' }];
};

export const dynamicParams = true;

export const revalidate = 30;

export default WpTypePage;
