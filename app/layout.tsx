import '@styles/globals.scss';
import api from '@libs/api.js';
import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@components/footer';
import Nav from '@components/Nav';
import { IRoute, ISupporter } from '@interfaces/index';
import ScrollToTop from '@components/scrolltotop';

const staticDataUrl = 'https://cdbdata.vercel.app';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const {
        routes: navRoutes,
        footer: { routes: footerLinks, supporters },
        mainVideo: videoPreload,
    }: {
        routes: IRoute[];
        footer: {
            routes: IRoute[];
            supporters: ISupporter[];
        };
        mainVideo: { srcSet: { src: string; type: string } };
    } = await getData();
    return (
        <html lang='ca'>
            <head>
                <link
                    rel='preload'
                    as='video'
                    href={`${staticDataUrl}/sttic/${videoPreload.srcSet[1].src}`}
                    type={videoPreload.srcSet[1].type}
                />
                <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='' />
            </head>
            <body>
                <h1 className={'wrapperLogo'}>
                    <Link href={'/'} passHref>
                        <Image
                            width='320'
                            height='128'
                            loading='lazy'
                            alt={'Logo de la Colla Castellers de Barcelona'}
                            src={'/logo-castellers-de-barcelona.png'}
                        />
                    </Link>
                </h1>
                <Nav small={false} navRoutes={navRoutes} />

                <ScrollToTop />

                <div>{children}</div>

                <div className={'container'}>
                    <Footer footerLinks={footerLinks} supporters={supporters} />
                    <Nav navRoutes={navRoutes} small />
                </div>
            </body>
        </html>
    );
};

const generateMetadata = async (): Promise<Metadata> => {
    const home = await api.cdbData.getData('home');
    const meta = { ...home[0].meta };
    const { pageTitle, pageDescription } = meta;
    return {
        title: {
            default: pageTitle,
            template: `%s | ${pageTitle}`,
          },
        description: pageDescription,
        alternates: {
            canonical: 'https://castellersdebarcelona.cat/',
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/shortcut-icon.png',
            apple: '/icons/icon-192x192.png',
        },
        manifest: '/manifest.json',
    };
};

const viewport: Viewport = {    
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    themeColor: '#ffffff',
}

const getData = async () => {
    const [footer, routes, home] = await Promise.all([
        api.cdbData.getData('footer'),
        api.cdbData.getData('routes'),
        api.cdbData.getData('home'),
    ]);

    return {
        footer: { ...footer[0] },
        routes,
        ...home[0].videos,
    };
};

export { generateMetadata, viewport };
export default RootLayout;
