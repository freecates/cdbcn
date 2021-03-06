import Head from 'next/head';
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
    content: IContent;
    title: string;
    author: string;
    date: string;
    description: string;
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
                <Head>
                    <title>
                        {title} - Castelllers de Barcelona - {type}
                    </title>
                    <meta name='description' content={`${description}...`} />

                    <meta property='fb:app_id' content='1064356173625695' />
                    <meta
                        property='og:url'
                        content={`https://castellersdebarcelona.cat/${type}/${id}`}
                    />
                    <meta property='og:type' content='article' />
                    <meta property='og:title' content={title} />
                    <meta property='og:description' content={`${description}...`} />
                    <meta property='og:image' content={mainImage[0].source} />
                    <meta property='og:image:width' content={'1024'} />
                    <meta property='og:image:height' content={'1024'} />

                    <meta name='twitter:card' content='summary_large_image' />
                    <meta name='twitter:site' content='cdbcn' />
                    <meta name='twitter:creator' content='Castellers de Barcelona' />
                    <meta name='twitter:title' content={title} />
                    <meta name='twitter:description' content={`${description}...`} />

                    <link
                        rel='canonical'
                        href={`https://castellersdebarcelona.cat/${type}/${id}`}
                    />

                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: `
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${`https://castellersdebarcelona.cat/` + type + '/' + id}"
  },
  "author": {
    "@type": "Person",
    "name": "${author}"
  },
  "publisher": {
   "@type": "Organization",
   "name": "Castellers de Barcelona",
   "logo": {
     "@type": "ImageObject",
     "url": "https://castellersdebarcelona.cat/logo-castellers-de-barcelona.png"
   }
  }, 
  "description": "${description}...",
  "image": "${mainImage[0].source}",
  "datePublished": "${date}",
  "headline": "${title}"
}`,
                        }}
                    />
                </Head>

                <Figure
                    data={mainImage[0]}
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
                        <Link href={`/${type}`}>
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
                <Head>
                    <title>
                        {title} - Castelllers de Barcelona - {type}
                    </title>
                    <meta name='description' content={`${description.substring(0, 240)}...`} />

                    <meta property='fb:app_id' content='1064356173625695' />
                    <meta
                        property='og:url'
                        content={`https://castellersdebarcelona.cat/${type}/${id}`}
                    />
                    <meta property='og:type' content='article' />
                    <meta property='og:title' content={title} />
                    <meta
                        property='og:description'
                        content={`${description.substring(0, 240)}...`}
                    />
                    <meta property='og:image' content={mainImage} />
                    <meta property='og:image:width' content={'1024'} />
                    <meta property='og:image:height' content={'1024'} />

                    <meta name='twitter:card' content='player' />
                    <meta name='twitter:site' content='@cdbcn' />
                    <meta name='twitter:title' content={title} />
                    <meta
                        name='twitter:description'
                        content={`${description.substring(0, 240)}...`}
                    />
                    <meta name='twitter:image:src' content={mainImage} />
                    <meta name='twitter:player' content={`https://www.youtube.com/embed/${id}`} />
                    <meta name='twitter:player:width' content='480' />
                    <meta name='twitter:player:height' content='360' />

                    <link
                        rel='canonical'
                        href={`https://castellersdebarcelona.cat/${type}/${id}`}
                    />

                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: `
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${`https://castellersdebarcelona.cat/` + type + '/' + id}"
  },
  "author": {
    "@type": "Person",
    "name": "${author}"
  },
  "publisher": {
   "@type": "Organization",
   "name": "Castellers de Barcelona",
   "logo": {
     "@type": "ImageObject",
     "url": "https://castellersdebarcelona.cat/logo-castellers-de-barcelona.png"
   }
  }, 
  "description": "${description.substring(0, 120)}...",
  "image": "${mainImage}",
  "datePublished": "${date}",
  "headline": "${title}"
}`,
                        }}
                    />
                </Head>

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
                        <Link href={`/${type}`}>
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
            subtitol_de_la_diada,
            imatge_destacada,
            resum_de_la_diada,
        } = content;
        return (
            <div className={styles.postComponent}>
                <Head>
                    <title>
                        {title} - Castelllers de Barcelona - {type}
                    </title>
                    <meta name='description' content={`${description.substring(3, 240)}...`} />

                    <meta property='fb:app_id' content='1064356173625695' />
                    <meta
                        property='og:url'
                        content={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                    />
                    <meta property='og:type' content='article' />
                    <meta property='og:title' content={title} />
                    <meta
                        property='og:description'
                        content={`${description.substring(3, 240)}...`}
                    />
                    <meta property='og:image' content={imatge_destacada.sizes.large} />
                    <meta property='og:image:width' content={'1024'} />
                    <meta property='og:image:height' content={'1024'} />

                    <meta name='twitter:card' content='summary_large_image' />
                    <meta name='twitter:site' content='cdbcn' />
                    <meta name='twitter:creator' content='Castellers de Barcelona' />
                    <meta name='twitter:title' content={title} />
                    <meta
                        name='twitter:description'
                        content={`${description.substring(3, 240)}...`}
                    />
                    <meta name='twitter:image:src' content={imatge_destacada.sizes.large} />

                    <link
                        rel='canonical'
                        href={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                    />

                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: `
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${`https://castellersdebarcelona.cat/` + type + '/' + id + '/' + slug}"
      },
      "author": {
        "@type": "Person",
        "name": "${author}"
      },
      "publisher": {
       "@type": "Organization",
       "name": "Castellers de Barcelona",
       "logo": {
         "@type": "ImageObject",
         "url": "https://castellersdebarcelona.cat/logo-castellers-de-barcelona.png"
       }
      }, 
      "description": "${
          type === 'actuacions'
              ? cronica_de_la_diada.substring(3, 120)
              : cos_de_text_de_la_noticia.substring(3, 120)
      }...",
      "image": "${imatge_destacada.sizes.large}",
      "datePublished": "${date}",
      "headline": "${title.replace(/['"]+/g, '')}"
    }`,
                        }}
                    />
                </Head>
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
                        <Link href={`/${type}`}>
                            <a className={'button'}>&larr; Anar a &quot;{type}&quot;</a>
                        </Link>
                    </h3>
                </div>
            </div>
        );
    }
};

export default Post;
