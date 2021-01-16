import Layout from '@components/Layout';
import MDFileParser from '@components/MDFileParser';
import styles from '@styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const LaColla = () => (
    <Layout
        pageTitle={'Historia'}
        title={'Colla Castellers de Barcelona'}
        pageDescription={'Toc d’entrada a plaça. 8 de juny de 1969. Tot comença amb el pilar de 4'}
    >
        <h1 className={styles.title}>La Colla</h1>
        <figure className={`${styles.figure}`}>
            <Link href={'/'}>
                <a>
                    <Image
                        width='840'
                        height='432'
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

        <div className={`${styles.container}`}>
            <main className={styles.main}>
                <MDFileParser file={'1969.md'} />
                <div className={styles.grid}>
                    <figure className={`${styles.figure} ${styles.card}`}>
                        <Link href={'/'}>
                            <a>
                                <Image
                                    width='400'
                                    height='570'
                                    loading='lazy'
                                    alt={'Detall del primer Pilar de 4. 8 de juny de 1969'}
                                    src={'https://cdbdata.vercel.app/static/pilar-de-4-1969.webp'}
                                    layout={'responsive'}
                                />
                                <figcaption className={styles.figcaption}>
                                    <p>
                                        Pilar de 4<br />
                                        <small>
                                            Nico Barquet, Josep Sala Mañé, Jaume Hill, Josep Torres,
                                            Manel Pallarès i els germans José Ricardo i Ángel Moreno
                                        </small>
                                    </p>
                                </figcaption>
                            </a>
                        </Link>
                    </figure>
                    <figure className={`${styles.figure} ${styles.card}`}>
                        <Link href={'/'}>
                            <a>
                                <Image
                                    width='400'
                                    height='470'
                                    loading='lazy'
                                    alt={
                                        'Pilar de 4 històric a la diada del 50è aniversari. El segon, Nico Barquet, és qui va fer també de segon en el pilar del 1969, just 50 anys més tard.'
                                    }
                                    src={'https://cdbdata.vercel.app/static/pilar-de-4-2019.webp'}
                                    layout={'responsive'}
                                />
                                <figcaption className={styles.figcaption}>
                                    <p>
                                        08/06/2019
                                        <br />
                                        <small>
                                            Pilar de 4 històric a la diada del 50è aniversari. El
                                            segon, Nico Barquet, és qui va fer també de segon en el
                                            pilar del 1969, just 50 anys més tard.
                                        </small>
                                    </p>
                                </figcaption>
                            </a>
                        </Link>
                    </figure>
                </div>
            </main>
        </div>
    </Layout>
);

export default LaColla;
