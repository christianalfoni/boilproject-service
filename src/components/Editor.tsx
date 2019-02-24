import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/solarized.css'
import { jsx } from '@emotion/core'
import { useOvermind } from '../overmind'
import FileEditor from './FileEditor'
import PackageJson from './PackageJson'
import * as path from 'path'
import { useState } from 'react'
import { FaCodeBranch } from 'react-icons/fa'

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
    return (
      <div>
        <h1
          css={{
            marginTop: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {state.currentBoilerplateName}
          {state.currentProfile.username === state.user.username ? null : (
            <div
              css={{
                cursor: 'pointer',
                opacity: 0.2,
                marginLeft: 'auto',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                ':hover': {
                  opacity: 0.75,
                },
              }}
              onClick={
                state.isForkingBoilerplate
                  ? null
                  : () => actions.forkBoilerplate()
              }
              style={
                state.isForkingBoilerplate
                  ? {
                      cursor: 'default',
                      opacity: 0.1,
                    }
                  : null
              }
            >
              <FaCodeBranch
                css={{
                  marginRight: '0.25rem',
                }}
              />{' '}
              {state.isForkingBoilerplate ? 'forking...' : 'fork'}
            </div>
          )}
        </h1>
        <PackageJson />
      </div>
    )
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
    <div>
      <h1
        css={{
          marginTop: 0,
        }}
      >
        {state.currentBoilerplateName}
      </h1>
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
    </div>
  )
}

export default Editor
