import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';
import Footer from '@components/footer';

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
            </Head>

            <h1 className={styles.wrapperLogo}>
                <Link href={'/'}>
                    <a>
                        <Image
                            width='320'
                            height='160'
                            loading='lazy'
                            alt={'Logo de la Colla Castellers de Barcelona'}
                            src={'/logo-castellers-de-barcelona.png'}
                            layout={'responsive'}
                        />
                    </a>
                </Link>
            </h1>

            <div>{props.children}</div>
            <div className={styles.container}>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
