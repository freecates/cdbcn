import Head from 'next/head';
import Link from 'next/link';
import styles from '@components/post/Post.module.scss';
import Figure from '@components/figure';
import SocialSharer from '@components/socialsharer';
import { FaFlickr, FaYoutube } from 'react-icons/fa';

const Galeria = ({ urlFlickr, urlYoutube, title }) => {
    console.log('urlYoutube ', urlYoutube);
    return (
        <>
            {urlFlickr === null && urlYoutube === null ? null : (
                <div className={styles.title}>
                    <p>
                        <strong>
                            <small>
                                Veure la galeria de: "{title}"<br />
                                {urlFlickr && (
                                    <a
                                        target={`_blank`}
                                        title={`Veure la galeria de fotos de: "${title}"`}
                                        href={urlFlickr}
                                        rel='noopener'
                                        rel='noreferrer'
                                    >
                                        <FaFlickr size={30} />
                                    </a>
                                )}
                                {urlYoutube && (
                                    <a
                                        target={`_blank`}
                                        title={`Veure la galeria de vídeos de: "${title}"`}
                                        href={urlYoutube}
                                        rel='noopener'
                                        rel='noreferrer'
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

const Post = ({ title, author, date, description, id, type, content, slug, mainImage }) => {
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
                <meta name='description' content={description} />

                <meta property='fb:app_id' content='1064356173625695' />
                <meta
                    property='og:url'
                    content={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                />
                <meta property='og:type' content='article' />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta
                    property='og:image'
                    content={imatge_destacada.sizes.large}
                />
                <meta property='og:image:width' content={1024} />
                <meta property='og:image:height' content={1024} />

                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:site' content='cdbcn' />
                <meta name='twitter:creator' content='Castellers de Barcelona' />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
                <meta
                    name='twitter:image:src'
                    content={imatge_destacada.sizes.large}
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
    "@id": "${`https://castellersdebarcelona.cat/` + slug}"
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
  "headline": "${title}"
}`,
                    }}
                />
            </Head>
            <Figure data={mainImage} quality={100} withType withOverlay />

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
                    <Link href={`/${type}#llistat`}>
                        <a className={'button'}>&larr; Tornar</a>
                    </Link>
                </h3>
            </div>
        </div>
    );
};

export default Post;
