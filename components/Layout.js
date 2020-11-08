import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';
import Footer from './Footer';

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

            <h1 className={styles.title}>
                <Link href={'/'}>
                    <a>
                        <Image
                            width='600'
                            height='300'
                            loading='lazy'
                            alt={'Logo de la Colla Castellers de Barcelona'}
                            src={'/logo-castellers-de-barcelona.png'}
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
