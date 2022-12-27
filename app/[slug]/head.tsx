import api from '@libs/api.js';
type Props = {
    headPageData: {
        pageTitle: string;
        title: string;
        pageDescription: string;
    }
};

const Head = async ({ params }) => {
    const { slug } = params;
    const headPageData: Props = await getData(slug);
    if (!headPageData)
        return (
            <>
                <title>Not Found</title>
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
                />
            </>
        );
    const { pageTitle, title, pageDescription } = headPageData[0].meta;
    return (
        <>
            <title>{`${pageTitle} | ${title}`}</title>
            <meta name='description' content={pageDescription + ' | ' + title} />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
            />
        </>
    );
};

const getData = async (slug: string) => {
    const camelCased = slug.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    const headPageData = await api.cdbData.getData(camelCased);
    if (!headPageData) return;
    return headPageData;
};

export default Head;
