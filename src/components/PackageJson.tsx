import { jsx, css } from '@emotion/core'
import { useOvermind } from '../overmind'
import FileEditor from './FileEditor'
import { useState } from 'react'
import NpmSearch from './NpmSearch'

const PackageJson: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()
  const [showError, setShowError] = useState(false)
  const [codemirror, setCodemirror] = useState(null)
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

  function addDependency(dependency: string, version: string) {
    try {
      const value = JSON.parse(codemirror.getValue())
      value.dependencies = value.dependencies || {}
      value.dependencies[dependency] = version
      codemirror.setValue(JSON.stringify(value, null, 2))
    } catch (e) {}
  }

  function addDevDependency(dependency: string, version: string) {
    try {
      const value = JSON.parse(codemirror.getValue())
      value.devDependencies = value.devDependencies || {}
      value.devDependencies[dependency] = version
      codemirror.setValue(JSON.stringify(value, null, 2))
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
        <NpmSearch onSubmit={addDependency} />
        <NpmSearch onSubmit={addDevDependency} />
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
