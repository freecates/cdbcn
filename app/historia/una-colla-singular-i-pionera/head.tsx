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
            <meta name='description' content={pageDescription + ' | ' + title} />
        </>
    );
};

const getData = async () => {
    const unaCollaSingularIPionera = await api.cdbData.getData('unaCollaSingularIPionera');
    return { ...unaCollaSingularIPionera[0].meta };
};

export default Head;
