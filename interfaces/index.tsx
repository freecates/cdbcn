export interface IItem {
    kind: string;
    id: string;
    player: { embedHtml: string };
    snippet: {
        publishedAt: string;
        title: string;
        channelTitle: string;
        thumbnails: {
            high: {
                url: string;
            };
            maxres;
            standard;
        };
        description: string;
    };
}
export interface IData extends IItem {
    sort(arg0: (a: any, b: any) => 0 | 1 | -1);
    acf: {
        data: string;
        imatge_destacada: {
            widht: string;
            height: string;
        };
    };
    type: string;
    media: string;
    dateupload: string;
    title:
        | string
        | {
              rendered: string;
          };
    slug: string;
    datetaken: string;
    url_m: string;
    width_m: string;
    height_m: string;
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
    data: string;
}

export interface IRoute {
    map(arg0: (r: any, id: any) => JSX.Element): import('react').ReactNode;
    name: string;
    route: string;
}

export interface ISupporter {
    type: string;
    list: string;
}

export interface IMeta {
    title: string;
    pageTitle: string;
    pageDescription: string;
}

export interface IDataFigure {
    width: string;
    height: string;
    src: string;
    alt: string;
    url: string;
    source: string;
    imageCaption: { title: string; description: string };
}
