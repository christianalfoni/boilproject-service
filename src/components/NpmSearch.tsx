import { jsx, css } from '@emotion/core'
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  Configure,
} from 'react-instantsearch-dom'
import { useState } from 'react'

function getName(value: string) {
  const scope = value[0] === '@' ? '@' : ''
  value = scope ? value.substr(1) : value

  return scope + value.split('@')[0]
}

function isExplicitVersion(value: string) {
  const scope = value[0] === '@' ? '@' : ''
  value = scope ? value.substr(1) : value

  return value.includes('@')
}

function getVersion(value: string, hit) {
  return value.indexOf('@') > 0 ? value.split('@')[1] : hit ? hit.version : null
}

function getIsValid(value: string, hit, version: string) {
  return Boolean(
    hit &&
      hit.name === getName(value) &&
      (version in hit.tags || version in hit.versions)
  )
}

type Props = {
  onSubmit: (dependency: string, version: string) => void
}

const Search: React.FunctionComponent<Props> = connectSearchBox(
  connectHits(({ currentRefinement, refine, hits, onSubmit }) => {
    const [state, setState] = useState({
      value: '',
      error: false,
    })
    const hit = currentRefinement && hits[0]
    const version = getVersion(state.value, hit)
    const isValid = getIsValid(state.value, hit, version)

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!isValid) {
            setState({
              value: state.value,
              error: true,
            })
            return
          }

          onSubmit(currentRefinement, version)
          setState({
            value: '',
            error: false,
          })
          refine('')
        }}
        css={{
          position: 'relative',
          height: '40px',
          width: '200px',
        }}
      >
        <div
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '0.5rem 0',
            fontSize: '14px',
            width: '100%',
          }}
        >
          {isExplicitVersion(state.value) ? state.value : currentRefinement}
          <span
            css={{
              color: 'var(--color-white-3)',
            }}
          >
            {isExplicitVersion(state.value)
              ? null
              : hit && isValid
              ? '@' + hit.version
              : null}
          </span>
        </div>
        <input
          type="text"
          spellCheck={false}
          css={{
            position: 'absolute',
            left: 0,
            top: 0,
            border: 0,
            backgroundColor: 'transparent',
            fontFamily: 'inherit',
            borderBottom: `1px solid ${
              state.error ? 'var(--color-red)' : 'var(--color-white-3)'
            }`,
            outline: 'none',
            fontSize: '14px',
            color: 'transparent',
            caretColor: 'var(--color-black-1)',
            padding: '0.5rem 0',
            '::placeholder': {
              color: 'var(--color-white-3)',
            },
            ':read-only': {
              opacity: 0.75,
            },
          }}
          onChange={(event) => {
            const value = event.currentTarget.value

            refine(getName(value))
            setState({
              value,
              error: false,
            })
          }}
          value={state.value}
          placeholder="Add dependency..."
        />
      </form>
    )
  })
)

const NpmSearch: React.FunctionComponent<Props> = ({ onSubmit }) => {
  return (
    <InstantSearch
      appId="OFCNCOG2CU"
      apiKey="0ec32c7bf787298ec009acc797cf44fc"
      indexName="npm-search"
    >
      <Configure hitsPerPage="1" />
      <Search onSubmit={onSubmit} />
    </InstantSearch>
  )
}

export default NpmSearch
