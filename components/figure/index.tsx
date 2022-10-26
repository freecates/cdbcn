import styles from './Figure.module.scss';
import Image from 'next/image';
import { IDataFigure } from '@interfaces/index';

const staticDataUrl = 'https://cdbdata.vercel.app/static';

type Props = {
    data: IDataFigure;
    quality?: number;
    layout?: any;
    withType?: boolean;
    withOverlay?: boolean;
    type?: string;
    isOne?: boolean;
};

const Figure: React.FC<Props> = ({ data, quality, layout, withType, withOverlay, type, isOne }) => {
    return (
        <div className={styles.figureComponent}>
            {Array.isArray(data) && (
                <div className={styles.grid}>
                    {data.map((d, index) => (
                        <figure
                            key={index + d.src}
                            className={`${styles.figure} ${styles.card} ${
                                isOne ? styles.one : null
                            }`}
                        >
                            <Image
                                quality={quality ? quality : null}
                                width={d.width}
                                height={d.height}
                                loading='lazy'
                                alt={d.alt}
                                sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                  
                                src={`${staticDataUrl}/${d.src}`}
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
                <figure
                    className={`${styles.figure}${withOverlay ? ' ' + styles.withOverlay : ''}`}
                    style={type === 'fotos' ? { maxWidth: data.width } : null}
                >
                    <Image
                        quality={quality ? quality : null}
                        width={Number(data.width)}
                        height={Number(data.height)}
                        priority
                        alt={data.alt}
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
          
                        src={
                            withType
                                ? type !== 'fotos'
                                    ? `${data.url.replace(
                                          '/uploads/',
                                          '/uploads-webpc/uploads/'
                                      )}.webp`
                                    : data.source
                                : `${staticDataUrl}/${data.src}`
                        }
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
