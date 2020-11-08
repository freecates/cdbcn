import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'

export default function MDFileParser({ file }) {
  const [content, setContent] = useState('')
  const [filename, setFilename] = useState('')

  useEffect(() => {
    async function updateContentFromFileName(fileName) {
      const res = await fetch(`https://cdbdata.vercel.app/${fileName}`)
      const filename = fileName
      const content = await res.text()
      setContent(content)
      setFilename(filename)
    }
    updateContentFromFileName(file)
  }, [file])

  return (
    <React.Fragment>
      {filename.includes('.html') ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <Markdown>{content}</Markdown>
      )}
    </React.Fragment>
  )
}
