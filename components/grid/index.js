import Link from 'next/link';

const thumbnailWidth = 'thumbnail-width';
const thumbnailHeight = 'thumbnail-height'

const Grid = ({ data }) => {
    return (
        <>
            {data
                .sort((a, b) => {
                    if (a.date > b.date) {
                        return -1;
                    }
                    if (a.date < b.date) {
                        return 1;
                    }
                    return 0;
                })
                .map((c, id) => (
                    <div key={c.id} id={id}>
                        <div>
                            <header>
                                {!c.acf.imatge_destacada ? null : (
                                    <img
                                        loading='lazy'
                                        src={c.acf.imatge_destacada.sizes.thumbnail}
                                        alt={c.title.rendered}
                                        width={c.acf.imatge_destacada.sizes.thumbnailWidth}
                                        height={c.acf.imatge_destacada.sizes.thumbnailHeight}
                                    />
                                )}
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
                            </header>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default Grid;
