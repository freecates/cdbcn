import type { Metadata } from 'next';
import Grid from '@components/grid';
import api from '@libs/api.js';
import { FaYoutube } from 'react-icons/fa';
import { IData, IMeta } from '@interfaces/index';
import Fallback from '@components/fallback';

type VideosProps = {
    data?: null | { items: IData };
    videos?: null | { meta: IMeta };
};

const Videos = async () => {
    const { data, videos }: VideosProps = await getData();
    if (!data) {
        return <Fallback notFound />;
    }
    const videosData = data.items;
    const pageTitle = videos?.meta.pageTitle;
    return (
        <>
            <h1 className={'title'}>{pageTitle}</h1>
            <div className={`${'container'} ${'noPadding'}`}>
                <main className={'main'}>
                    <Grid data={videosData} isThree />
                    <hr />
                    <p>
                        <small>
                            Més videos al nostre canal de{' '}
                            <a
                                target='_blank'
                                rel={'noopener nofollow noreferrer'}
                                href='https://www.youtube.com/user/arxiucdb'
                            >
                                <FaYoutube /> Youtube
                            </a>
                        </small>
                    </p>
                </main>
            </div>
        </>
    );
};

const getData = async () => {
    const [videos, data] = await Promise.all([
        api.cdbData.getData('videos'),
        api.youtubeData.getData('videos'),
    ]);

    if (!data) {
        return { data: null, videos: null };
    } else {
        return {
            data: data,
            videos: { ...videos[0] },
        };
    }
};

const generateMetadata = async (): Promise<Metadata> => {
    const videos = await api.cdbData.getData('videos');
    const meta = { ...videos[0].meta };
    const { pageTitle, title, pageDescription } = meta;
    return {
        title: pageTitle,
        description: `${pageDescription} | ${title}`,
        alternates: {
            canonical: `https://castellersdebarcelona.cat/videos`,
        },
    };
};

export const revalidate = 3600;

export { generateMetadata };
export default Videos;
