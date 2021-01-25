import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import styles from './MDFileParser.module.scss'

const staticDataUrl = 'https://cdbdata.vercel.app/content';

export default function MDFileParser({ file }) {
    const [content, setContent] = useState('');
    const [filename, setFilename] = useState('');

    useEffect(() => {
        async function updateContentFromFileName(fileName) {
            const res = await fetch(`${staticDataUrl}/${fileName}`);
            const filename = fileName;
            const content = await res.text();
            setContent(content);
            setFilename(filename);
        }
        updateContentFromFileName(file);
    }, [file]);

    return (
        <React.Fragment>
            {filename.includes('.html') ? (
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    className={styles.MDFileParserComponent}
                />
            ) : (
                <div className={styles.MDFileParserComponent}>
                    <Markdown>{content}</Markdown>
                </div>
            )}
        </React.Fragment>
    );
}
