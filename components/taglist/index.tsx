import Link from 'next/link';
import styles from './TagList.module.scss';

type Props = {
    data: string[];
    url: string;
    title?: string;
    isQuery: boolean;
};

const TagList: React.FC<Props> = ({ title, data, url, isQuery }) => {
    return (
        <div className={styles.tagListComponent}>
            {title && (
                <p>
                    <small>{title}</small>
                </p>
            )}
            <ul>
                {data.map((d, index) => (
                    <li key={index + d}>
                        <Link
                            prefetch={true}
                            href={`${url}${isQuery ? '?q=' + d : '/' + d}`}
                            passHref
                        >
                            <span className={'button'}>{d}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagList;
