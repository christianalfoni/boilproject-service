import { jsx } from '@emotion/core'
import { Boilerplate } from '../overmind/state'
import { useOvermind } from '../overmind'
import { FaChevronDown, FaChevronRight, FaTrashAlt } from 'react-icons/fa'

type Props = {
  name: string
  boilerplate: Boilerplate
}

const ListItem: React.FunctionComponent<Props> = ({ name, boilerplate }) => {
  const { state, actions } = useOvermind()

  return (
    <li
      css={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        padding: '0.5rem',
      }}
      key={name}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          ':hover :last-child': {
            display: 'block',
          },
        }}
      >
        {name === state.currentBoilerplateName ? (
          <FaChevronDown
            css={{
              color: 'var(--color-white-3)',
              marginRight: '0.5rem',
              fontSize: '12px',
            }}
          />
        ) : (
          <FaChevronRight
            css={{
              color: 'var(--color-white-3)',
              marginRight: '0.5rem',
              fontSize: '12px',
            }}
          />
        )}
        <a
          href={`/${state.currentProfile.username}/${name}`}
          css={{
            fontWeight:
              name === state.currentBoilerplateName ? 'bold' : 'normal',
            textDecoration: 'none',
            color: 'var(--color-black-1)',
          }}
        >
          {name}
        </a>
        {state.isOwner ? (
          <FaTrashAlt
            onClick={() => {
              actions.removeBoilerplate(name)
            }}
            css={{
              marginLeft: 'auto',
              color: 'var(--color-black-3)',
              opacity: 0.2,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'none',
              ':hover': {
                opacity: 0.75,
              },
            }}
          />
        ) : null}
      </div>

      {name === state.currentBoilerplateName ? (
        <div
          css={{
            fontSize: '14px',
          }}
        >
          {boilerplate.files.map((file, index) => (
            <div
              key={file.path}
              onClick={(event) => {
                event.stopPropagation()
                actions.changeFile(index)
              }}
              css={{
                fontWeight:
                  index === state.currentFileIndex ? 'bold' : 'normal',
                display: 'flex',
                ':hover svg': {
                  display: 'block',
                },
              }}
            >
              {file.path}
              {index === 0 || !state.isOwner ? null : (
                <FaTrashAlt
                  onClick={(event) => {
                    event.stopPropagation()
                    actions.removeFile(index)
                  }}
                  css={{
                    marginLeft: 'auto',
                    color: 'var(--color-black-3)',
                    fontSize: '12px',
                    opacity: 0.2,
                    display: 'none',
                    cursor: 'pointer',
                    ':hover': {
                      opacity: 0.75,
                    },
                  }}
                />
              )}
            </div>
          ))}
          {state.isOwner ? (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                actions.addFile()
              }}
            >
              <input
                type="text"
                css={{
                  border: 0,
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid var(--color-white-3)',
                  outline: 'none',
                  fontSize: '14px',
                  padding: '0.5rem 0',
                  '::placeholder': {
                    color: 'var(--color-white-3)',
                  },
                }}
                disabled={state.isAddingFile}
                onChange={actions.changeNewFileName}
                value={state.newFileName}
                placeholder="add file..."
              />
            </form>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

export default ListItem
