import { IMember } from '@interfaces/index';
import styles from './BoardList.module.scss';

type Props = {
    data: IMember[];
    title: string;
};

const BoardList: React.FC<Props> = ({ title, data }) => {
    return (
        <div className={styles.boardListComponent}>
            <h2>{title}</h2>
            <dl>
                {data.map((d, index) => (
                    <div key={index + d.name}>
                        <dt>{d.title}:</dt>
                        <dd>{d.name}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default BoardList;
