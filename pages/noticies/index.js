import Grid from '@components/grid';

const Noticies = ({ data }) => {
    return (
        <div>
            <h1>Notícies</h1>
            <Grid data={data} />
        </div>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(
        `https://cms.castellersdebarcelona.cat/wp-json/wp/v2/noticies?per_page=100`
    );
    const data = await res.json();
    return {
        props: {
            data: data,
        },
        revalidate: 1,
    };
};

export default Noticies;
