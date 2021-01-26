import Markdown from 'markdown-to-jsx';
import styles from './MDFileContent.module.scss';

export default function MDFileContent({ content }) {
    return (
        <div className={styles.MDFileContentComponent}>
            <Markdown>{content}</Markdown>
        </div>
    );
}
