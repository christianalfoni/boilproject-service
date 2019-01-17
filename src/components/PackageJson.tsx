import { jsx, css } from '@emotion/core'
import { useOvermind } from '../overmind'
import FileEditor from './FileEditor'
import { useState, useEffect } from 'react'

const input = css({
  border: 0,
  backgroundColor: 'transparent',
  borderBottom: '1px solid var(--color-white-3)',
  outline: 'none',
  fontSize: '14px',
  padding: '0.5rem 0',
  '::placeholder': {
    color: 'var(--color-white-3)',
  },
  ':read-only': {
    opacity: 0.75,
  },
})

const PackageJson: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()
  const [showError, setShowError] = useState(false)
  const [codemirror, setCodemirror] = useState(null)
  const [newDependencyName, setNewDependencyName] = useState('')
  const [newDevDependencyName, setNewDevDependencyName] = useState('')
  const boilerplate = state.currentBoilerplate

  function onChange(value: string) {
    try {
      JSON.parse(value)
      setShowError(false)
      actions.updatePackageJson(value)
    } catch (e) {
      !showError && setShowError(true)
    }
  }

  function onInitialized(cm) {
    setCodemirror(cm)
  }

  function addDependency() {
    try {
      const value = JSON.parse(codemirror.getValue())
      value.dependencies = value.dependencies || {}
      value.dependencies[newDependencyName] = 'latest'
      codemirror.setValue(JSON.stringify(value, null, 2))
      setNewDependencyName('')
    } catch (e) {}
  }

  function addDevDependency() {
    try {
      const value = JSON.parse(codemirror.getValue())
      value.devDependencies = value.devDependencies || {}
      value.devDependencies[newDevDependencyName] = 'latest'
      codemirror.setValue(JSON.stringify(value, null, 2))
      setNewDevDependencyName('')
    } catch (e) {}
  }

  return (
    <div>
      <div
        css={{
          display: 'flex',
          '> form': {
            marginRight: '1rem',
          },
        }}
      >
        {state.isOwner ? (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              addDependency()
            }}
          >
            <input
              type="text"
              css={input}
              onChange={(event) =>
                setNewDependencyName(event.currentTarget.value)
              }
              value={newDependencyName}
              placeholder="Add dependency..."
            />
          </form>
        ) : null}
        {state.isOwner ? (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              addDevDependency()
            }}
          >
            <input
              type="text"
              css={input}
              onChange={(event) =>
                setNewDevDependencyName(event.currentTarget.value)
              }
              value={newDevDependencyName}
              placeholder="Add dev dependency..."
            />
          </form>
        ) : null}
      </div>
      <div
        css={{
          border: showError
            ? '1px solid var(--color-red)'
            : '1px solid var(--color-white-3)',
        }}
      >
        <FileEditor
          onChange={onChange}
          key={state.currentBoilerplateName}
          initialValue={boilerplate.files[0].content || '{\n\n}'}
          fileName="package.json"
          onInitialized={onInitialized}
        />
      </div>
    </div>
  )
}

export default PackageJson
