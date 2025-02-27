import type { Metadata } from 'next';
import Grid from '@components/grid';
import api from '@libs/api.js';
import Link from 'next/link';
import { IData } from '@interfaces/index';

const title = 'Actualitat dels Castellers de Barcelona';
const pageDescription = "Recull de l'Actualitat dels Castellers de Barcelona";
const pageTitle = 'Actualitat';

type ActualitatProps = {
    actuacionsData: IData;
    noticiesData: IData;
};

const Actualitat = async () => {
    const { actuacionsData, noticiesData }: ActualitatProps = await getData();
    const pageTitle = 'Actualitat';
    return (
        <>
            <h1 className={'title'}>{pageTitle}</h1>
            <div className={`${'container'} ${'noPadding'}`}>
                <main className={'main'}>
                    <h2>
                        <Link prefetch={true} href={`/actualitat/${actuacionsData[0].type}`}>
                            [{actuacionsData[0].type}]
                        </Link>
                    </h2>
                    <Grid data={actuacionsData} />
                    <p>
                        <Link
                            prefetch={true}
                            href={`/actualitat/${actuacionsData[0].type}`}
                            className={'more'}
                            title={`Anar a "${actuacionsData[0].type}"`}
                        >
                            [+]
                        </Link>
                    </p>
                    <hr className={'hr'} />
                    <h2>
                        <Link prefetch={true} href={`/actualitat/${noticiesData[0].type}`}>
                            [{noticiesData[0].type}]
                        </Link>
                    </h2>
                    <Grid data={noticiesData} />
                    <p>
                        <Link
                            prefetch={true}
                            href={`/actualitat/${noticiesData[0].type}`}
                            className={'more'}
                            title={`Anar a "${noticiesData[0].type}"`}
                        >
                            [+]
                        </Link>
                    </p>
                </main>
            </div>
        </>
    );
};

const getData = async () => {
    const [noticiesData, actuacionsData] = await Promise.all([
        api.wpData.getData('noticies', 2),
        api.wpData.getData('actuacions', 2),
    ]);
    return {
        actuacionsData: actuacionsData,
        noticiesData: noticiesData,
    };
};

export const metadata : Metadata = {
    title: `${pageTitle} | ${title}`,
    description: `${pageDescription} | ${title}`,
    alternates: {
        canonical: `https://castellersdebarcelona.cat/actualitat`,
    },
};

export const revalidate = 30;

export default Actualitat;
