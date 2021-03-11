import Markdown from 'markdown-to-jsx';
import styles from './MDFileContent.module.scss';

type Props = {
    content: string;
};

const MDFileContent: React.FC<Props> = ({ content }) => {
    return (
        <div className={styles.MDFileContentComponent}>
            <Markdown>{content}</Markdown>
        </div>
    );
};

export default MDFileContent;
