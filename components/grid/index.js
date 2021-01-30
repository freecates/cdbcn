import Link from 'next/link';
import styles from './Grid.module.scss';

const thumbnailWidth = 768;
const thumbnailHeight = 768;

const Grid = ({ data, isThree }) => {
    return (
        <div className={styles.gridComponent}>
            {data
                .sort((a, b) => {
                    if (a.type === 'actuacions' || a.type === 'noticies') {
                        const dateA = a.acf.data;
                        const dateB = b.acf.data;

                        {
                            if (dateA > dateB) {
                                return -1;
                            }
                            if (dateA < dateB) {
                                return 1;
                            }
                            return 0;
                        }
                    }
                    if (a.kind === 'youtube#searchResult') {
                        const dateA = a.snippet.publishedAt;
                        const dateB = b.snippet.publishedAt;

                        {
                            if (dateA > dateB) {
                                return -1;
                            }
                            if (dateA < dateB) {
                                return 1;
                            }
                            return 0;
                        }
                    }
                })
                .map((c, id) => {
                    if (c.type === 'actuacions' || c.type === 'noticies') {
                        const date = c.acf.data;
                        const title = c.title.rendered;
                        const itemId = c.id;
                        const slug = c.slug;
                        const author = c._embedded.author[0].name;
                        const itemImg = c.acf.imatge_destacada;
                        const imgSrc = itemImg.sizes.medium_large;
                        const type = c.type;
                        const itemUrl = `/${type}/${itemId}/${slug}`;
                        return (
                            <div
                                key={itemId}
                                id={id}
                                className={`${styles.card} ${isThree ? styles.three : null}`}
                            >
                                <div>
                                    <header>
                                        {!itemImg ? null : (
                                            <Link href={itemUrl}>
                                                <a title={`Veure la fitxa de: ${title}`}>
                                                    <img
                                                        loading='lazy'
                                                        src={imgSrc}
                                                        alt={title}
                                                        width={thumbnailWidth}
                                                        height={thumbnailHeight}
                                                    />
                                                </a>
                                            </Link>
                                        )}
                                    </header>
                                    <main>
                                        <Link href={itemUrl}>
                                            <a title={`Veure la fitxa de: ${title}`}>
                                                <h2>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: title,
                                                        }}
                                                    />
                                                    &rarr;
                                                </h2>
                                            </a>
                                        </Link>
                                        <p>
                                            <small>
                                                {author} | {date} | [{type}]
                                            </small>
                                        </p>
                                    </main>
                                </div>
                            </div>
                        );
                    }
                    if (c.kind === 'youtube#searchResult') {
                        const date = c.snippet.publishedAt;
                        const title = c.snippet.title;
                        const itemId = c.id.videoId;
                        const author = c.snippet.channelTitle;
                        const itemImg = c.snippet.thumbnails.high;
                        const imgSrc = itemImg.url;
                        const type = 'videos';
                        const itemUrl = `/${type}/${itemId}`;
                        return (
                            <div
                                key={itemId}
                                id={id}
                                className={`${styles.card} ${isThree ? styles.three : null}`}
                            >
                                <div>
                                    <header>
                                        {!itemImg ? null : (
                                            <a href={itemUrl} title={`Veure la fitxa de: ${title}`}>
                                                <img
                                                    loading='lazy'
                                                    src={imgSrc}
                                                    alt={title}
                                                    width={thumbnailWidth}
                                                    height={thumbnailHeight}
                                                />
                                            </a>
                                        )}
                                    </header>
                                    <main>
                                        <Link href={itemUrl}>
                                            <a title={`Veure la fitxa de: ${title}`}>
                                                <h2>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: title,
                                                        }}
                                                    />
                                                    &rarr;
                                                </h2>
                                            </a>
                                        </Link>
                                        <p>
                                            <small>
                                                {author} | {date} | [{type}]
                                            </small>
                                        </p>
                                    </main>
                                </div>
                            </div>
                        );
                    }
                })}
        </div>
    );
};

export default Grid;
