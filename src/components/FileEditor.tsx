import { jsx } from '@emotion/core'
import { useRef, useEffect, useState } from 'react'
import CodeMirror from 'codemirror'
import * as path from 'path'
import { useOvermind } from '../overmind'

type Props = {
  initialValue: string
  fileName: string
  onChange: (content: string) => void
  onInitialized?: (cm: CodeMirror) => void
}

function getMode(fileName) {
  const type = path.extname(fileName).replace('.', '')

  switch (type) {
    case 'json':
      return 'json'
    case 'js':
      return 'javascript'
    default:
      return 'json'
  }
}

const FileEditor: React.FunctionComponent<Props> = ({
  initialValue,
  onChange,
  fileName,
  onInitialized,
}) => {
  const { state } = useOvermind()
  const codeMirrorRef = useRef(null)

  useEffect(() => {
    const cm = CodeMirror(codeMirrorRef.current, {
      mode: getMode(fileName),
      value: initialValue || '',
      tabSize: 2,
      readOnly: !state.user,
    })
    const listener = () => onChange(cm.getValue())

    cm.on('change', listener)

    onInitialized && onInitialized(cm)

    return () => {
      cm.off('change', listener)
    }
  }, [])

  return <div ref={codeMirrorRef} />
}

export default FileEditor
