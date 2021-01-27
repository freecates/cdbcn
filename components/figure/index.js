import styles from './Figure.module.scss';
import Image from 'next/image';

const staticDataUrl = 'https://cdbdata.vercel.app/static';

const Figure = ({ data, quality, layout, withType, withOverlay }) => {
    return (
        <div className={styles.figureComponent}>
            {Array.isArray(data) && (
                <div className={styles.grid}>
                    {data.map((d, index) => (
                        <figure key={index + d.src} className={`${styles.figure} ${styles.card}`}>
                            <Image
                                quality={quality ? quality : null}
                                width={d.width}
                                height={d.height}
                                loading='lazy'
                                alt={d.alt}
                                src={`${staticDataUrl}/${d.src}`}
                                layout={layout ? layout : null}
                            />
                            {d.imageCaption ? (
                                <figcaption className={styles.figcaption}>
                                    <p>
                                        {d.imageCaption.title}
                                        <br />
                                        <small>{d.imageCaption.description}</small>
                                    </p>
                                </figcaption>
                            ) : null}
                        </figure>
                    ))}
                </div>
            )}
            {!Array.isArray(data) && (
                <figure className={`${styles.figure} ${withOverlay && styles.withOverlay}`}>
                    <Image
                        quality={quality ? quality : null}
                        width={data.width}
                        height={data.height}
                        loading='lazy'
                        alt={data.alt}
                        src={withType ? data.url : `${staticDataUrl}/${data.src}`}
                        layout={layout ? layout : null}
                    />
                    {data.imageCaption ? (
                        <figcaption className={styles.figcaption}>
                            <p>
                                {data.imageCaption.title}
                                <br />
                                <small>{data.imageCaption.description} </small>
                            </p>
                        </figcaption>
                    ) : null}
                </figure>
            )}
        </div>
    );
};

export default Figure;
