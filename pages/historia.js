import Layout from '../components/Layout';
import MDFileParser from '../components/MDFileParser';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Historia = () => (
    <Layout
        pageTitle={'Historia'}
        title={'Colla Castellers de Barcelona'}
        pageDescription={'Toc d’entrada a plaça. 8 de juny de 1969. Tot comença amb el pilar de 4'}
    >
        <figure className={styles.figure}>
            <Link href={'/'}>
                <a>
                    <Image
                        width='841'
                        height='431'
                        loading='lazy'
                        alt={
                            'Primer Pilar de 4. 8 de juny de 1969.Inaugiració de la base al Monument dels Castellers'
                        }
                        src={'https://cdbdata.vercel.app/static/pilar-de-4-1969-general.webp'}
                    />
                    <figcaption className={styles.figcaption}>
                        <p>
                            Pilar de 4<br />
                            <small>
                                Acte d’inauguració de la primera fase del Monument als Castellers,
                                obra de l’escultor Josep Cañas{' '}
                            </small>
                        </p>
                    </figcaption>
                </a>
            </Link>
        </figure>
        <div className={styles.container}>
            <main className={styles.main}>
                <MDFileParser file={'1969.md'} />
            </main>
        </div>
        <figure className={styles.figure}>
            <Link href={'/'}>
                <a>
                    <Image
                        width='608'
                        height='840'
                        loading='lazy'
                        alt={'Detall del primer Pilar de 4. 8 de juny de 1969'}
                        src={'https://cdbdata.vercel.app/static/pilar-de-4-1969.webp'}
                    />
                    <figcaption className={styles.figcaption}>
                        <p>
                            Pilar de 4<br />
                            <small>
                                Nico Barquet, Josep Sala Mañé, Jaume Hill, Josep Torres, Manel
                                Pallarès i els germans José Ricardo i Ángel Moreno
                            </small>
                        </p>
                    </figcaption>
                </a>
            </Link>
        </figure>
    </Layout>
);

export default Historia;
