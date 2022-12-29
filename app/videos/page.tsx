import Grid from '@components/grid';
import api from '@libs/api.js';
import { FaYoutube } from 'react-icons/fa';
import { IData, IMeta } from '@interfaces/index';
import Fallback from '@components/fallback';

type VideosProps = {
    data?: { items: IData };
    videos?: { meta: IMeta };
};

const Videos = async () => {
    const { data, videos }: VideosProps = await getData();
    if (!data) {
        return <Fallback notFound />;
    }
    const videosData = data.items;
    const { pageTitle } = videos.meta;
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
        return { data: null };
    } else {
        return {
            data: data,
            videos: { ...videos[0] },
        };
    }
};

export const revalidate = 3600;

export default Videos;
