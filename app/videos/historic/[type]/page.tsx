import type { Metadata } from 'next';
import Grid from '@components/grid';
import api from '@libs/api.js';
import { FaYoutube } from 'react-icons/fa';
import { IData, IMeta } from '@interfaces/index';
import Fallback from '@components/fallback';
import TagList from '@components/taglist';
import { humanTowersAcronym } from '@utils/humanTowersAcronym';

type VideosProps = {
    data?: null | { items: IData };
    videos?: null | { meta: IMeta };
};

const Videos = async ({ params }) => {
    const { type } = params;
    const { data, videos }: VideosProps = await getData(type);
    if (!data) {
        return <Fallback notFound />;
    }
    const videosData = data.items;
    const pageTitle = videos?.meta.pageTitle;
    return (
        <>
            <h1 className={'title'}>{pageTitle} de &quot;{type}&quot;</h1>
            <div className={`${'container'} ${'noPadding'}`}>
                <main className={'main'}>
                    <Grid data={videosData} isThree />
                    <hr />
                        <TagList data={humanTowersAcronym} url={'/videos/historic'} isQuery={false} />
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

const getData = async (q) => {
    const [videos, data] = await Promise.all([
        api.cdbData.getData('videos'),
        api.youtubeData.getData('videos', null, q),
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

const generateMetadata = async ({ params }): Promise<Metadata> => {
    const { type } = params
    const videos = await api.cdbData.getData('videos');
    const meta = { ...videos[0].meta };
    const { pageTitle, pageDescription } = meta;
    return {
        title: `${pageTitle} de '${type}'`,
        description: `${pageDescription} | ${type}`,
        alternates: {
            canonical: `https://castellersdebarcelona.cat/videos`,
        },
    };
};

export const revalidate = 3600;

export { generateMetadata };
export default Videos;
