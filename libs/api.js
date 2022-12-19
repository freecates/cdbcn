const staticDataUrl = process.env.STATIC_DATA_URL;
const wordPressApiUrl = process.env.WORDPRESS_API_URL;
const flickrApiUrl = process.env.FLICKR_API_URL;
const flickrApiKey = process.env.FLICKR_APY_KEY;
const flickrApiUserId = process.env.FLICKR_API_USER_ID;
const youtubeApiUrl = process.env.YOUTUBE_API_URL;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;

const getFlickrPhotos = `${flickrApiUrl}?method=flickr.photos.search&format=json&nojsoncallback=?&api_key=${flickrApiKey}&user_id=${flickrApiUserId}&extras=description,url_m,date_upload,date_taken,media&per_page=200&content_type=1`;

const getFlickrPhoto = (id) =>
    `${flickrApiUrl}/?method=flickr.photos.getInfo&format=json&nojsoncallback=?&api_key=${flickrApiKey}&photo_id=${id}`;

const getFlickrPhotoDetails = (id) =>
    `${flickrApiUrl}/?method=flickr.photos.getSizes&format=json&nojsoncallback=?&api_key=${flickrApiKey}&photo_id=${id}`;

const getYoutubeVideos = `${youtubeApiUrl}/search?part=snippet&channelId=${youtubeChannelId}&maxResults=50&order=date&type=video&publishedAfter=2020-01-01T00:00:00Z&key=${youtubeApiKey}`;

const getYoutubeVideo = (id) => `${youtubeApiUrl}/videos?part=player&id=${id}&key=${youtubeApiKey}`;

const getYoutubeVideoDetails = (id) =>
    `${youtubeApiUrl}/videos?part=snippet&id=${id}&key=${youtubeApiKey}`;

const getByType = (type, id) => {
    switch (type) {
        case 'photos':
            return getFlickrPhotos;
        case 'photo':
            return getFlickrPhoto(id);
        case 'photoDetails':
            return getFlickrPhotoDetails(id);
        case 'videos':
            return getYoutubeVideos;
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
            const data = response.status === 200 ? await response.json() : null;
            return data;
        },
    },
    wpData: {
        async getData(type, amount, id) {
            const response = await fetch(
                `${wordPressApiUrl}/wp/v2/${type}${id ? '/' + id : ''}?${
                    amount ? 'per_page=' + amount + '&' : ''
                }_embed`,
                {
                    headers: { 'Cache-Control': 'no-cache' },
                },
            );
            const data = await response.json();
            return data;
        },
    },
    flickrData: {
        async getData(type, id) {
            const response = await fetch(getByType(type, id));
            const data = await response.json();
            return data;
        },
    },
    youtubeData: {
        async getData(type, id) {
            const response = await fetch(getByType(type, id));
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
            const data = response.status === 200 ? await response.text() : null;
            return data;
        },
    },
};

export default api;
