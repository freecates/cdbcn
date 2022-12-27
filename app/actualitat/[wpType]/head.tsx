import api from '@libs/api.js';
type Props = {
    pageTitle: string;
    title: string;
    pageDescription: string;
};

const Head = async ({ params }) => {
    const { wpType } = params;
    const { pageTitle, title, pageDescription }: Props = await getData(wpType);
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

const getData = async (wpType: string) => {
    const headPageData = await api.cdbData.getData(wpType);
    return { ...headPageData[0].meta };
};

export default Head;
