import Layout from '@components/layout';
import React from 'react';
import styles from './Fallback.module.scss';

type Props = {
    notFound?: boolean;
};

const Fallback: React.FC<Props> = ({ notFound }) => {
    return (
        <Layout
            titlePage={notFound ? '404' : '... carregant'}
            pageTitle={
                notFound ? 'Pàgina no trobada o no disponible' : '... Estem carregant la pàgina'
            }
            pageDescription={null}
            navRoutes={null}
            footerLinks={null}
            supporters={null}
        >
            <div className={`${styles.fallBackComponent}`}>
                <div className={`file${notFound ? '' : ' loading'}`}>
                    <h1>
                        {notFound
                            ? 'Pàgina no trobada o no disponible en aquest moment'
                            : '... Carregant'}
                    </h1>
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
