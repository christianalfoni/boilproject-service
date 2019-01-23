import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/solarized.css'
import { jsx } from '@emotion/core'
import { useOvermind } from '../overmind'
import FileEditor from './FileEditor'
import PackageJson from './PackageJson'
import * as path from 'path'
import { useState } from 'react'

const Editor: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()
  const [showError, setShowError] = useState(false)

  if (
    !state.currentProfile.boilerplates ||
    !Object.keys(state.currentProfile.boilerplates).length
  ) {
    return (
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>No boilerplates created</h2>
      </div>
    )
  }

  if (!state.currentBoilerplate) {
    return <div>Loading...</div>
  }

  if (state.currentFile.path === 'package.json') {
    return <PackageJson />
  }

  const file = state.currentFile

  function onChange(value: string) {
    if (path.extname(file.path) === '.json') {
      try {
        JSON.parse(value)
        setShowError(false)
        actions.updateFile({ file, value })
      } catch (e) {
        !showError && setShowError(true)
      }
    } else {
      actions.updateFile({ file, value })
    }
  }

  return (
    <div
      css={{
        border: showError
          ? '1px solid var(--color-red)'
          : '1px solid var(--color-white-3)',
      }}
    >
      <FileEditor
        key={file.path}
        onChange={onChange}
        initialValue={file.content}
        fileName={file.path}
      />
    </div>
  )
}

export default Editor
