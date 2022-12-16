import api from '@libs/api.js';

const staticDataUrl = 'https://cdbdata.vercel.app';
type Props = {
    pageTitle: string;
    pageDescription: string;
    mainVideo: { srcSet: { src: string; type: string } };
};

const Head = async () => {
    const { pageTitle, pageDescription, mainVideo: videoPreload }: Props = await getData();
    return (
        <>
            <meta charSet='utf-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
            />
            <meta name='theme-color' content='#ffffff' />
            <link rel='apple-touch-icon' href='/icons/icon-192x192.png'></link>
            <link rel='manifest' href='/manifest.json' />
            <title>{pageTitle}</title>
            <meta
                name='description'
                content={pageDescription}
            />
            <link rel='canonical' href={`https://castellersdebarcelona.cat/`} />
            <link rel='icon' href='/favicon.ico' />
            
                <link
                    rel='preload'
                    as='video'
                    href={`${staticDataUrl}/sttic/${videoPreload.srcSet[1].src}`}
                    type={videoPreload.srcSet[1].type}
                />
            <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='true' />
        </>
    );
};

const getData = async () => {
    const home = await api.cdbData.getData('home');
    return { ...home[0].meta, ...home[0].videos };
};

export default Head;
