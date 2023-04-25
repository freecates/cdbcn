'use client';
import React from 'react';
import styles from './Fallback.module.scss';

type Props = {
    notFound?: boolean;
};

const Fallback: React.FC<Props> = ({ notFound }) => {
    return (
        <>
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
        </>
    );
};

export default Fallback;
