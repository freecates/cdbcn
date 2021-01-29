import Layout from '@components/layout';
import styles from './Fallback.module.scss'

const Fallback = ({ notFound }) => {
    return (
        <Layout>
            <div className={`${styles.fallBackComponent}`}>
                <div className={`file${notFound ? '' : ' loading'}`}>
                    <h1>{notFound ? 'Pàgina no trobada o no disponible en aquest moment' : '... Carregant'}</h1>
                </div>
                <style jsx>{`
                    .loading {
                        height: 100vh;
                    }
                `}</style>
            </div>
        </Layout>
    );
};

export default Fallback;
