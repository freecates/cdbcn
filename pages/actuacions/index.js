import Grid from '@components/grid';

const Actuacions = ({ data }) => {
    return (
    <div>
        <h1>Actuacions</h1>
            <Grid data={data} />
    </div>
)};

export const getStaticProps = async () => {
    const res = await fetch(`https://cms.castellersdebarcelona.cat/wp-json/wp/v2/actuacions?per_page=100`);
    const data = await res.json();
    return {
        props: {
            data: data,
        },
    };
};

export default Actuacions;
