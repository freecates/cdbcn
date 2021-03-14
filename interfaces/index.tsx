export interface IItem {
    kind: string;
    etag: string;
    id: string;
    player: { embedHtml: string };
    snippet: {
        title: string;
        thumbnails: { maxres; standard; high };
        channelTitle: string;
        publishedAt: string;
        description: string;
    };
}

export interface IContent {
    nom_de_la_diada: string;
    titular: string;
    titular_de_la_noticia: string;
    peu_de_foto_de_la_imatge_destacada: string;
    cronica_de_la_diada: string;
    cos_de_text_de_la_noticia: string;
    enllac_galeria_de_fotos: string;
    enllac_galeria_de_videos: string;
    subtitol_de_la_diada: string;
    imatge_destacada: { sizes: { large: string } };
    resum_de_la_diada: string;
    title: string;
    description: string;
}

export interface IRoute {
    name: string;
    route: string;
}

export interface ISupporter {
    type: string;
    list: string;
}
