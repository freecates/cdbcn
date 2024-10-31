import Grid from '@components/grid';
import Video from '@components/video';
import api from '@libs/api.js';
import Link from 'next/link';
import { IData } from '@interfaces/index';

import type { JSX } from "react";

type HomeProps = {
    home: {
        videos: {
            mainVideo: {
                width: string;
                height: string;
                srcSet: {
                    src: string;
                    type: string;
                    map(arg0: (d: any, index: any) => JSX.Element): import('react').ReactNode;
                };
            };
        };
    };
    noticiesData: IData;
    contacte: {
        meta: {
            name: string;
            address: string;
            phone: { href: string; number: string };
            mobile: { href: string; number: string };
            mobile2: { href: string; number: string };
            mobile3: { href: string; number: string };
            web: string;
            email: { href: string; address: string };
            map: { title: string; url: string };
        };
    };
};

const Home = async () => {
    const { noticiesData, home, contacte }: HomeProps = await getData();
    const { name, address, mobile2, web, email, map } = contacte.meta;
    const mainVideo = home.videos.mainVideo;
    return (
        <>
            <div className={'wrapperVideo'}>
                <Video data={mainVideo} />
            </div>
            <div className={`${'container'} ${'withOverlay'} ${'noPadding'}`}>
                <main className={`${'main'} ${'withOverlay'}`}>
                    <p className={'description'}>
                        <strong>{name}</strong>
                        <br />
                        [La Colla Degana de la Ciutat - <Link href={'/la-colla'}>1969</Link>
                        ]
                        <br />
                        <br />
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={map.url}
                        >
                            {address}
                        </a>
                        <br />
                        M.{' '}
                        <a href={mobile2.href}>{mobile2.number}</a> [WhatsApp]
                        <br />
                        {web}
                        <br />
                        <a href={email.href}>{email.address}</a>
                        <br />
                        <Link href={'/participa'} className={'button'}>
                            CONTRACTA&apos;NS
                        </Link>
                    </p>
                    <hr className={'hr'} />
                    <Grid data={noticiesData} isThree />
                </main>
            </div>
        </>
    );
};

const getData = async () => {
    const [home, contacte, noticiesData] = await Promise.all([
        api.cdbData.getData('home'),
        api.cdbData.getData('contacte'),
        api.wpData.getData('noticies', 3),
    ]);
    return {
        noticiesData: noticiesData,
        home: { ...home[0] },
        contacte: { ...contacte[0] },
    };
};

export const revalidate = 30;

export default Home;
