import Layout from '@components/layout';
import MDFileParser from '@components/mdnfileparser';
import styles from '@styles/Home.module.scss';

const CinquantaAnys50Tuits = () => (
    <Layout
        pageTitle={'Historia'}
        title={'50 anys en 50 tuits'}
        pageDescription={
            'Un recull de la trajectòria de la colla sintetitzat en 50 notes sobre fets i fites dels 50 anys.'
        }
    >
        <h1 className={styles.title}>La Colla</h1>

        <div className={`${styles.container}`}>
            <main className={styles.main}>
                <MDFileParser file={`50-anys-50-tuits.md`} />
            </main>
        </div>
    </Layout>
);

export default CinquantaAnys50Tuits;
