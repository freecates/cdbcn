const staticDataUrl = process.env.STATIC_DATA_URL;
const wordPressApiUrl = process.env.WORDPRESS2_API_URL;
const flickrApiUrl = process.env.FLICKR_API_URL;
const flickrApiKey = process.env.FLICKR_APY_KEY;
const flickrApiUserId = process.env.FLICKR_API_USER_ID;
const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;

const date = new Date().toJSON();
const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);

    return date.toJSON();
};
const currentYearLasttDay = new Date(new Date().getFullYear(), 12, 1).toJSON();

const getFlickrPhotos = `${flickrApiUrl}?method=flickr.photos.search&format=json&nojsoncallback=?&api_key=${flickrApiKey}&user_id=${flickrApiUserId}&extras=description,url_m,date_upload,date_taken,media&per_page=200&content_type=1`;

const getFlickrPhoto = (id) =>
    `${flickrApiUrl}/?method=flickr.photos.getInfo&format=json&nojsoncallback=?&api_key=${flickrApiKey}&photo_id=${id}`;

const getFlickrPhotoDetails = (id) =>
    `${flickrApiUrl}/?method=flickr.photos.getSizes&format=json&nojsoncallback=?&api_key=${flickrApiKey}&photo_id=${id}`;

const getYoutubeVideos = (q) =>
    `${youtubeApiUrl}/search?part=snippet&channelId=${youtubeChannelId}&maxResults=50&order=date&type=video&${
        q
            ? 'q=' + q + '&publishedBefore=' + date
            : 'publishedAfter=' +
              subtractYears(new Date(), 2) +
              '&publishedBefore=' +
              currentYearLasttDay
    }&key=${youtubeApiKey}`;

const getYoutubeVideo = (id) => `${youtubeApiUrl}/videos?part=player&id=${id}&key=${youtubeApiKey}`;

const getYoutubeVideoDetails = (id) =>
    `${youtubeApiUrl}/videos?part=snippet&id=${id}&key=${youtubeApiKey}`;

const getByType = (type, id, q) => {
    switch (type) {
        case 'photos':
            return getFlickrPhotos;
        case 'photo':
            return getFlickrPhoto(id);
        case 'photoDetails':
            return getFlickrPhotoDetails(id);
        case 'videos':
            return getYoutubeVideos(q);
        case 'video':
            return getYoutubeVideo(id);
        case 'videoDetails':
            return getYoutubeVideoDetails(id);
        default:
            return null;
    }
};

const api = {
    cdbData: {
        async getData(fileName) {
            const response = await fetch(`${staticDataUrl}/data/${fileName}.json`);
            const data = response.status !== 200 ? null : await response.json();
            return data;
        },
    },
    wpData: {
        async getData(type, amount, id) {
            const response = await fetch(
                `${wordPressApiUrl}/wp/v2/${type}${id ? '/' + id : ''}?${
                    amount ? 'per_page=' + amount + '&' : ''
                }_embed`,
                { next: { revalidate: 60 } },
            );
            const data = await response.json();
            return data;
        },
    },
    flickrData: {
        async getData(type, id) {
            const response = await fetch(getByType(type, id), { next: { revalidate: 60 } });
            const data = await response.json();
            return data;
        },
    },
    youtubeData: {
        async getData(type, id, q) {
            const response = await fetch(getByType(type, id, q), { next: { revalidate: 60 } });
            const data = response.status !== 200 ? null : await response.json();
            return data;
        },
    },
    footer: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/data/footer.json`);
            const data = await response.json();
            return data;
        },
    },
    routes: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/data/routes.json`);
            const data = await response.json();
            return data;
        },
    },
    historiaRoutes: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/data/historiaRoutes.json`);
            const data = await response.json();
            return data;
        },
    },
    mdContent: {
        async getData(slug) {
            const response = await fetch(`${staticDataUrl}/content/${slug}.md`);
            const data = response.status !== 200 ? null : await response.text();
            if (data?.includes('NOT_FOUND')) return null;
            return data;
        },
    },
};

export default api;
