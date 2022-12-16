import Grid from '@components/grid';
import api from '@libs/api.js';
import styles from '@styles/Home.module.scss';
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
            <h1 className={styles.title}>{pageTitle}</h1>
            <div className={`${styles.container} ${styles.noPadding}`}>
                <main className={styles.main}>
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
