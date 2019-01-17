import { jsx, css, Global } from '@emotion/core'
import { useOvermind } from '../overmind'
import Topbar from './Topbar'
import Profile from './Profile'
import { FaMagic, FaUser, FaCodeBranch } from 'react-icons/fa'
import ValueProposition from './ValueProposition'
import logo from '../logo.png'
import { Page } from '../overmind/state'

const App: React.FunctionComponent = () => {
  const { state } = useOvermind()

  return (
    <div
      css={{
        height: '100%',
        overflowY: 'scroll',
        backgroundColor: 'hsl(217, 0%, 98%)',
      }}
    >
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            height: 100%;
            font-family: Nunito, 'helvetica neue';
          }

          :root {
            --color-white-1: hsl(217, 0%, 95%);
            --color-white-2: hsl(217, 0%, 90%);
            --color-white-3: hsl(217, 0%, 85%);

            --color-black-1: hsl(217, 0%, 5%);
            --color-black-2: hsl(217, 0%, 10%);
            --color-black-3: hsl(217, 0%, 30%);

            --color-gray-1: hsl(217, 0%, 90%);

            --color-green: hsl(102, 89%, 61%);
            --color-blue: hsl(197, 89%, 61%);
            --color-red: hsl(0, 89%, 61%);
          }
        `}
      />
      <Topbar />
      {state.currentPage === Page.PROFILE ? (
        <Profile />
      ) : (
        <div
          css={{
            maxWidth: '1000px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <img src={logo} width="300" height="300" />

          <div
            css={{
              backgroundColor: 'var(--color-black-2)',
              color: 'var(--color-white-3)',
              fontFamily: '"Lucida Console", Monaco, monospace',
              borderRadius: '3px',
              minWidth: '500px',
              padding: '0.75rem 1rem',
              lineHeight: '32px',
              '> div': {
                fontSize: '14px',
                lineHeight: '24px',
              },
            }}
          >
            <strong>npx</strong> boilproject christianalfoni/react
            <div>Downloading boilerplate from boilproject.io...</div>
            <div>Creating files...</div>
            <div>Installing packages...</div>
            <div
              css={{
                color: 'var(--color-green)',
              }}
            >
              Done!
            </div>
          </div>
          <div
            css={{
              display: 'flex',
              marginTop: '2rem',
            }}
          >
            <ValueProposition Icon={FaMagic}>
              <strong>Tired</strong> of using boilerplating tools, forking repos
              and ejecting from create-whatever-apps?
            </ValueProposition>
            <ValueProposition Icon={FaUser}>
              <strong>Personal</strong> configurations that can be changed and
              used on any computer
            </ValueProposition>
            <ValueProposition Icon={FaCodeBranch}>
              <strong>Fork</strong> popular configurations and make your own
              adjustments in seconds
            </ValueProposition>
          </div>
          <div
            css={{
              position: 'relative',
              marginTop: '2rem',
              fontStyle: 'italic',
              color: 'var(--color-black-3)',
              maxWidth: '700px',
              textAlign: 'center',
              fontSize: '20px',
              lineHeight: '32px',
              ':before': {
                content: '"“"',
                color: 'var(--color-gray-1)',
                fontSize: '48px',
                fontWeight: 'bold',
              },
              ':after': {
                position: 'absolute',
                color: 'var(--color-gray-1)',
                content: '"”"',
                fontSize: '48px',
                fontWeight: 'bold',
              },
            }}
          >
            <strong>boilproject.io</strong> is a web service where you can
            define your own project boilerplates. Everything from NPM packages
            to install, linting, prettier, typescript and initial app files. No
            installs, just{' '}
            <a
              css={{
                color: 'var(--color-blue)',
                fontWeight: 'bold',
              }}
              href="https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b"
            >
              npx
            </a>{' '}
            on any machine to set up your project
          </div>
          <div
            css={{
              color: 'var(--color-white-3)',
              margin: '2rem',
            }}
          >
            Copyright © 2019 Christian Alfoni
          </div>
        </div>
      )}
    </div>
  )
}

export default App
