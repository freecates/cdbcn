import styles from './Video.module.scss';

const staticDataUrl = 'https://cdbdata.vercel.app/static';

const Video = ({ data }) => {
    return (
        <video className={styles.video} loop muted autoPlay width={data.width} height={data.height}>
            {data.srcSet.map((d, index) => (
                <source key={index + d.src} src={`${staticDataUrl}/${d.src}`} type={d.type} />
            ))}
        </video>
    );
};

export default Video;
