'use client';
import Link from 'next/link';
import styles from '@components/post/Post.module.scss';
import Figure from '@components/figure';
import SocialSharer from '@components/socialsharer';
import { FaFlickr, FaYoutube } from 'react-icons/fa';
import { IContent } from '@interfaces/index';

type GaleriaProps = {
    urlFlickr: string;
    urlYoutube: string;
    title: string;
};

const Galeria: React.FC<GaleriaProps> = ({ urlFlickr, urlYoutube, title }) => {
    return (
        <>
            {urlFlickr === null && urlYoutube === null ? null : (
                <div className={styles.title}>
                    <p>
                        <strong>
                            <small>
                                Veure la galeria de: &quot;{title}&quot;<br />
                                {urlFlickr && (
                                    <a
                                        target={`_blank`}
                                        title={`Veure la galeria de fotos de: "${title}"`}
                                        href={urlFlickr}
                                        rel='noopener, noreferrer'
                                    >
                                        <FaFlickr size={30} />
                                    </a>
                                )}
                                {urlYoutube && (
                                    <a
                                        target={`_blank`}
                                        title={`Veure la galeria de vídeos de: "${title}"`}
                                        href={urlYoutube}
                                        rel='noopener, noreferrer'
                                    >
                                        <FaYoutube size={30} />
                                    </a>
                                )}
                            </small>
                        </strong>
                    </p>
                </div>
            )}
        </>
    );
};

type PostProps = {
    content: null | IContent;
    title?: string;
    author?: string;
    date?: string;
    description?: string;
    type: string;
    slug?: string;
    id: string;
    player?: string;
    mainImage: any;
};

const Post: React.FC<PostProps> = ({
    title,
    author,
    date,
    description,
    id,
    type,
    content,
    slug,
    mainImage,
    player,
}) => {
    if (type === 'fotos') {
        return (
            <div className={styles.postComponent}>
                
                <Figure
                    data={mainImage}
                    quality={100}
                    type={type}
                    layout={'responsive'}
                    withType
                />
                <div className={`${styles.container}`}>
                    <main className={`${styles.main}`}>
                        <SocialSharer type={type} id={id} slug={null} title={title} />
                        <h1 className={styles.title}>
                            <span>{title && title}</span>
                        </h1>
                        <p>
                            <small>
                                {author} | {date}
                            </small>
                        </p>
                        {description && (
                            <div
                                className={styles.bodyText}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </main>
                </div>
                <style jsx>{`
                    .root {
                        width: 100%;
                        max-width: 1680px;
                        margin: 0 auto;
                    }
                    .videoWrapper {
                        position: relative;
                        padding-bottom: 56.25%; /* 16:9 */
                        padding-top: 25px;
                        height: 0;
                    }
                    .root > :global(.videoWrapper iframe) {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>

                <div className={styles.container}>
                    <SocialSharer type={type} id={id} slug={null} title={title} />
                    <h3>
                        <Link href={`/${type}`} legacyBehavior>
                            <a className={'button'}>&larr; Anar a &quot;{type}&quot;</a>
                        </Link>
                    </h3>
                </div>
            </div>
        );
    }
    if (type === 'videos') {

        return (
            <div className={styles.postComponent}>
                
                {player && (
                    <div className={'root'}>
                        <div
                            className={'videoWrapper'}
                            dangerouslySetInnerHTML={{ __html: player }}
                        />
                    </div>
                )}
                <div className={`${styles.container}`}>
                    <main className={`${styles.main}`}>
                        <SocialSharer type={type} id={id} slug={null} title={title} />
                        <h1 className={styles.title}>
                            <span>{title && title}</span>
                        </h1>
                        <p>
                            <small>
                                {author} | {date}
                            </small>
                        </p>
                        {description && (
                            <div
                                className={styles.bodyText}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </main>
                </div>
                <style jsx>{`
                    .root {
                        width: 100%;
                        max-width: 1680px;
                        margin: 0 auto;
                    }
                    .videoWrapper {
                        position: relative;
                        padding-bottom: 56.25%; /* 16:9 */
                        padding-top: 25px;
                        height: 0;
                    }
                    .root > :global(.videoWrapper iframe) {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>

                <div className={styles.container}>
                    <SocialSharer type={type} id={id} slug={null} title={title} />
                    <h3>
                        <Link href={`/${type}`} legacyBehavior>
                            <a className={'button'}>&larr; Anar a &quot;{type}&quot;</a>
                        </Link>
                    </h3>
                </div>
            </div>
        );
    }
    if (type === 'actuacions' || type === 'noticies') {
        const {
            nom_de_la_diada,
            titular,
            titular_de_la_noticia,
            peu_de_foto_de_la_imatge_destacada,
            cronica_de_la_diada,
            cos_de_text_de_la_noticia,
            enllac_galeria_de_fotos,
            enllac_galeria_de_videos,
            resum_de_la_diada,
        } = content;
        return (
            <div className={styles.postComponent}>
                
                <Figure data={mainImage} withType withOverlay layout={'responsive'} />

                <div className={`${styles.container} ${styles.withOverlay}`}>
                    <main className={`${styles.main} ${styles.withOverlay}`}>
                        <p>
                            <small>{peu_de_foto_de_la_imatge_destacada}</small>
                        </p>
                        <SocialSharer type={type} id={id} slug={slug} title={title} />
                        {nom_de_la_diada && <h2 className={styles.title}>{nom_de_la_diada}</h2>}
                        <h1 className={styles.title}>
                            <span>
                                {titular && titular}
                                {titular_de_la_noticia && titular_de_la_noticia}
                            </span>
                        </h1>
                        <p>
                            <small>
                                {author} | {date}
                            </small>
                        </p>
                        {cronica_de_la_diada && (
                            <div
                                className={styles.bodyText}
                                dangerouslySetInnerHTML={{ __html: cronica_de_la_diada }}
                            />
                        )}
                        {cos_de_text_de_la_noticia && (
                            <div
                                className={styles.bodyText}
                                dangerouslySetInnerHTML={{ __html: cos_de_text_de_la_noticia }}
                            />
                        )}
                        <Galeria
                            urlFlickr={enllac_galeria_de_fotos ? enllac_galeria_de_fotos : null}
                            urlYoutube={enllac_galeria_de_videos ? enllac_galeria_de_videos : null}
                            title={title}
                        />
                    </main>
                </div>
                {resum_de_la_diada && (
                    <div className={styles.summary}>
                        <small dangerouslySetInnerHTML={{ __html: resum_de_la_diada }} />
                    </div>
                )}
                <div className={styles.container}>
                    <SocialSharer type={type} id={id} slug={slug} title={title} />
                    <h3>
                        <Link href={`/actualitat/${type}`} legacyBehavior>
                            <a className={'button'}>&larr; Anar a &quot;{type}&quot;</a>
                        </Link>
                    </h3>
                </div>
            </div>
        );
    }
};

export default Post;
