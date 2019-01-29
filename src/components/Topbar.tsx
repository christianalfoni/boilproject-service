import { jsx } from '@emotion/core'
import { useOvermind } from '../overmind'
import { FaGithub } from 'react-icons/fa'
import Loader from './Loader'
import { useRef } from 'react'

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
        <a
          css={{
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'var(--color-black-1)',
            ':hover': {
              color: 'var(--color-black-3)',
            },
          }}
          href="/"
        >
          boilproject.io
        </a>
        <div
          css={{
            marginLeft: 'auto',
          }}
        >
          {state.user ? (
            <div
              css={{
                position: 'relative',
                outline: 'none',
                cursor: 'pointer',
                '> div': {
                  display: 'none',
                },
                ':focus div, :focus-within div': {
                  display: 'block',
                },
              }}
              tabIndex={-1}
            >
              <img
                css={{
                  borderRadius: '50%',
                  border: '1px solid var(--color-black-2)',
                }}
                src={state.user.photoURL}
                width="30"
                height="30"
              />
              <div
                css={{
                  position: 'absolute',
                  top: '30px',
                  right: 0,
                  boxSizing: 'border-box',
                  width: '150px',
                  zIndex: 999,
                }}
                onClick={() => (document.activeElement as any).blur()}
              >
                <div
                  css={{
                    margin: '0.5rem 0',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#FFF',
                    border: '1px solid var(--color-white-2)',
                    borderRadius: '3px',
                  }}
                >
                  <a
                    css={{
                      textDecoration: 'none',
                      color: 'var(--color-black-1)',
                      ':hover': {
                        color: 'var(--color-black-3)',
                      },
                    }}
                    href={`/${state.user.username}`}
                  >
                    my boilerplates
                  </a>
                  <div
                    css={{
                      textDecoration: 'none',
                      color: 'var(--color-black-1)',
                      ':hover': {
                        color: 'var(--color-black-3)',
                      },
                      cursor: 'pointer',
                    }}
                    onClick={actions.logout}
                  >
                    log out
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={actions.login}
              disabled={state.isLoggingIn || state.isAuthenticating}
              css={{
                outline: 'none',
                borderRadius: '3px',
                fontFamily: 'Nunito',
                textTransform: 'uppercase',
                border: '1px solid var(--color-black-1)',
                backgroundColor: 'var(--color-white-1)',
                padding: '0.25rem 0.5rem',
                boxSizing: 'border-box',
                height: '30px',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':disabled': {
                  opacity: 0.5,
                },
                ':hover': {
                  backgroundColor:
                    state.isLoggingIn || state.isAuthenticating
                      ? 'inherit'
                      : 'var(--color-white-2)',
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
