import Grid from '@components/grid';
import api from '@libs/api.js';
import { IData, IMeta } from '@interfaces/index';

type WpTypeProps = {
    wpData: IData;
    cdbData: { meta: IMeta };
};

const WpTypePage = async ({ params }) => {
    const { wpType } = params;
    const { wpData, cdbData }: WpTypeProps = await getData(wpType);
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

export const generateStaticParams = async () => {
    return [
        { wpType: 'noticies' },
        { wpType: 'actuacions' },
    ];
};

const getData = async (wpType: string) => {

    const [wpData, cdbData] = await Promise.all([
        api.wpData.getData(wpType, 99),
        api.cdbData.getData(wpType),
    ]);
    return {
            wpData,
            cdbData: { ...cdbData[0] },
        };
};

export const revalidate = 30;

export default WpTypePage;
