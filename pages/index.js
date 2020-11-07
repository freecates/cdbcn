import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
    return (
        <>
            <Head>
                <title>Colla Castellers de Barcelona</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <h1 className={styles.title}>
                <a href='https://www.castellersdebarcelona.cat/'>
                    <Image
                        width='600'
                        height='300'
                        loading='lazy'
                        alt={'Logo de la Colla Castellers de Barcelona'}
                        src={'/logo-castellers-de-barcelona.png'}
                    />
                </a>
            </h1>
            <video className={styles.video} loop muted autoPlay width='1680' height='945'>
                <source src='https://cdbdata.now.sh/static/3d9.mp4' type='video/mp4' />
                <source src='https://cdbdata.now.sh/static/3d9.webm' type='video/webm' />
            </video>
            <div className={styles.container}>
                <main className={styles.main}>
                    <p className={styles.description}>
                        <strong>Colla Castellers de Barcelona</strong>
                        <br />
                        [La Colla Degaga de la Ciutat]
                        <br />
                        <br />
                        Carrer de Bilbao, 212 - 214 08018, Barcelona
                        <br />
                        T. 93 498 27 28
                        <br />
                        www.castellersdebarcelona.cat
                        <br />
                        <a href={'mailto:colla@castellersdebarcelona.cat'}>
                            colla@castellersdebarcelona.cat
                        </a>
                    </p>
                </main>

                <footer className={styles.footer}>
                    <a href='https://www.instagram.com/castellersdebarcelona/'>Instagram</a>
                    <a href='https://www.youtube.com/user/arxiucdb'>Youtube</a>
                    <a href='https://twitter.com/cdbcn'>Twitter</a>
                    <a href='https://www.facebook.com/castellersdebarcelona'>Facebook</a>
                </footer>
            </div>
        </>
    );
}
