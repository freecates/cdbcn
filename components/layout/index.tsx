import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';
import Footer from '@components/footer';
import Nav from '@components/nav';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';
import { IRoute, ISupporter } from '@interfaces/index';

const staticDataUrl = 'https://cdbdata.vercel.app';

type Props = {
    home?: boolean;
    pageTitle: string;
    titlePage: string;
    pageDescription: string;
    videoPreload?: { srcSet: { src: string; type: string } };
    children: any;
    navRoutes: IRoute[];
    footerLinks: IRoute[];
    supporters: ISupporter[];
};

const Layout: React.FC<Props> = ({
    home,
    pageTitle,
    titlePage,
    pageDescription,
    videoPreload,
    children,
    navRoutes,
    footerLinks,
    supporters,
}) => {
    return (
        <>
            <Head><meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="theme-color" content="#ffffff"/>
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
                <link rel="manifest" href="/manifest.json" />
                <title>{!home ? pageTitle + ' | ' + titlePage : pageTitle}</title>
                <meta
                    name='description'
                    content={!home ? pageDescription + ' | ' + titlePage : pageDescription}
                />
                {home && <link rel='canonical' href={`https://castellersdebarcelona.cat/`} />}
                <link rel='icon' href='/favicon.ico' />
                {videoPreload ? (
                    <link
                        rel='preload'
                        as='video'
                        href={`${staticDataUrl}/sttic/${videoPreload.srcSet[1].src}`}
                        type={videoPreload.srcSet[1].type}
                    />
                ) : null}
                <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='true' />
            </Head>

            <h1 className={styles.wrapperLogo}>
                <Link href={'/'}>
                    <a>
                        <Image
                            width='320'
                            height='128'
                            loading='lazy'
                            alt={'Logo de la Colla Castellers de Barcelona'}
                            src={'/logo-castellers-de-barcelona.png'}
                            layout={'responsive'}
                        />
                    </a>
                </Link>
            </h1>
            {navRoutes ? <Nav small={false} navRoutes={navRoutes} /> : null}
            <ScrollUpButton
                style={{
                    backgroundColor: '#ffffff',
                    fill: 'rgb(217, 0, 29)',
                    right: '40px',
                    padding: '.25rem',
                    width: '30px',
                    height: '30px',
                    border: 'none',
                    bottom: '10px',
                }}
            />

            <div>{children}</div>

            <div className={styles.container}>
                <Footer footerLinks={footerLinks} supporters={supporters} />
                {navRoutes ? <Nav navRoutes={navRoutes} small /> : null}
            </div>
        </>
    );
};

export default Layout;
