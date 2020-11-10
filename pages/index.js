import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';

export default function Home() {
    return (
        <Layout
            title={'Colla Castellers de Barcelona'}
            pageTitle={'La Colla Degana de la Ciutat - 1969'}
            pageDescription={
                'Nascuts l’any 1969, som la colla degana de la ciutat. Assajos: dimarts, dijous i divendres.'
            }
            home
        >
            <div className={styles.wrapperVideo}>
                <video className={styles.video} loop muted autoPlay width='1680' height='945'>
                    <source src='https://cdbdata.vercel.app/static/3d9.mp4' type='video/mp4' />
                    <source src='https://cdbdata.vercel.app/static/3d9.webm' type='video/webm' />
                </video>
            </div>
            <div className={styles.container}>
                <main className={styles.main}>
                    <p className={styles.description}>
                        <strong>Colla Castellers de Barcelona</strong>
                        <br />
                        [La Colla Degana de la Ciutat -{' '}
                        <Link href={'/la-colla'}>
                            <a>1969</a>
                        </Link>
                        ]
                        <br />
                        <br />
                        Carrer de Bilbao, 212 - 214 08018, Barcelona
                        <br />
                        T. 934 98 27 28
                        <br />
                        M. 608 28 72 78 [premsa]
                        <br />
                        www.castellersdebarcelona.cat
                        <br />
                        <a href={'mailto:colla@castellersdebarcelona.cat'}>
                            colla@castellersdebarcelona.cat
                        </a>
                    </p>
                </main>
            </div>
        </Layout>
    );
}
