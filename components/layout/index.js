import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';
import Footer from '@components/footer';
import Nav from '@components/nav';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';

const staticDataUrl = 'https://cdbdata.vercel.app';

const Layout = (props) => {
    return (
        <>
            <Head>
                <title>
                    {!props.home ? props.pageTitle + ' | ' + props.title : props.pageTitle}
                </title>
                <meta
                    name='description'
                    content={
                        !props.home
                            ? props.pageDescription + ' | ' + props.title
                            : props.pageDescription
                    }
                />
                <link rel='icon' href='/favicon.ico' />
                {props.videoPreload ? (
                    <link
                        rel='preload'
                        as='video'
                        href={`${staticDataUrl}/sttic/${props.videoPreload.srcSet[1].src}`}
                        type={props.videoPreload.srcSet[1].type}
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
            {props.navRoutes ? <Nav navRoutes={props.navRoutes} /> : null}
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

            <div>{props.children}</div>

            <div className={styles.container}>
                <Footer footerLinks={props.footerLinks} supporters={props.supporters} />
                {props.navRoutes ? <Nav navRoutes={props.navRoutes} small /> : null}
            </div>
        </>
    );
};

export default Layout;
