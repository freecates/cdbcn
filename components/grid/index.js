import Link from 'next/link';
import styles from './Grid.module.scss';

const thumbnailWidth = 768;
const thumbnailHeight = 768;

const Grid = ({ data }) => {
    console.log(new Date(data[0].acf.data));
    return (
        <div className={styles.gridComponent}>
            {data
                .sort((a, b) => {
                    if (a.acf.data > b.acf.data) {
                        return -1;
                    }
                    if (a.acf.data < b.acf.data) {
                        return 1;
                    }
                    return 0;
                })
                .map((c, id) => (
                    <div key={c.id} id={id} className={styles.card}>
                        <div>
                            <header>
                                {!c.acf.imatge_destacada ? null : (
                                    <Link href={`/${c.type}/${c.id}/${c.slug}`}>
                                        <a title={`Veure la fitxa de: ${c.title.rendered}`}>
                                            <img
                                                loading='lazy'
                                                src={c.acf.imatge_destacada.sizes.medium_large}
                                                alt={c.title.rendered}
                                                width={thumbnailWidth}
                                                height={thumbnailHeight}
                                            />
                                        </a>
                                    </Link>
                                )}
                            </header>
                            <main>
                                <Link href={`/${c.type}/${c.id}/${c.slug}`}>
                                    <a title={`Veure la fitxa de: ${c.title.rendered}`}>
                                        <h3>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: c.title.rendered,
                                                }}
                                            />
                                            &rarr;
                                        </h3>
                                    </a>
                                </Link>
                                <p>
                                    <small>
                                        {c._embedded.author[0].name} | {c.acf.data}
                                    </small>
                                </p>
                            </main>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Grid;
