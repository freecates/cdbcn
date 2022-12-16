import api from '@libs/api.js';
type Props = {
    pageTitle: string;
    title: string;
    pageDescription: string;
};

const Head = async () => {
    const { pageTitle, title, pageDescription }: Props = await getData();
    return (
        <>
            <title>{`${pageTitle} | ${title}`}</title>
            <meta
                name='description'
                content={pageDescription + ' | ' + title}
            />
        </>
    );
};

const getData = async () => {
    const colla = await api.cdbData.getData('colla');
    return { ...colla[0].meta };
};

export default Head;
