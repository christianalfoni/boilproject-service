import { jsx } from '@emotion/core'
import { useOvermind } from '../overmind'
import { FaGithub } from 'react-icons/fa'

const Topbar: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <div
      css={{
        height: '60px',
      }}
    >
      <div
        css={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div
          css={{
            marginLeft: 'auto',
          }}
        >
          {state.user ? (
            <img
              css={{
                borderRadius: '50%',
                border: '1px solid var(--color-black-2)',
              }}
              onClick={actions.logout}
              src={state.user.photoURL}
              width="30"
              height="30"
            />
          ) : state.isAuthenticating ? null : (
            <button
              onClick={actions.login}
              disabled={state.isLoggingIn}
              css={{
                outline: 'none',
                borderRadius: '3px',
                fontFamily: 'Nunito',
                textTransform: 'uppercase',
                border: '1px solid var(--color-black-1)',
                backgroundColor: 'var(--color-white-1)',
                padding: '0.25rem 0.5rem',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':disabled': {
                  opacity: 0.75,
                },
                ':hover': {
                  backgroundColor: 'var(--color-white-2)',
                },
              }}
            >
              <FaGithub
                css={{
                  marginRight: '0.5rem',
                }}
              />{' '}
              <span
                css={{
                  fontSize: '11px',
                }}
              >
                Log in with Github
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topbar
