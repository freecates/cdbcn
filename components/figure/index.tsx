import styles from './Figure.module.scss';
import Image from 'next/image';

const staticDataUrl = 'https://cdbdata.vercel.app/static';

type Props = {
    data: IData;
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
                <figure
                    className={`${styles.figure}${withOverlay ? ' ' + styles.withOverlay : ''}`}
                    style={type === 'fotos' ? { maxWidth: data.width } : null}
                >
                    <Image
                        quality={quality ? quality : null}
                        width={data.width}
                        height={data.height}
                        loading='lazy'
                        alt={data.alt}
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

interface IData {
    width: string;
    height: string;
    src: string;
    alt: string;
    url: string;
    source: string;
    imageCaption: { title: string; description: string };
}

export default Figure;
