import styles from './Video.module.scss';

const staticDataUrl = 'https://cdbdata.vercel.app/static';

type VideoProps = {
    data: {
        width: string;
        height: string;
        srcSet: {
            src: string;
            type: string;
            map(arg0: (d: any, index: any) => JSX.Element): import('react').ReactNode;
        };
    };
};

const Video: React.FC<VideoProps> = ({ data }) => {
    return (
        <video className={styles.video} loop muted autoPlay width={data.width} height={data.height}>
            {data.srcSet.map((d, index) => (
                <source key={index + d.src} src={`${staticDataUrl}/${d.src}`} type={d.type} />
            ))}
        </video>
    );
};

export default Video;
