import { jsx } from '@emotion/core'
import List from './List'
import Editor from './Editor'
import { useOvermind } from '../overmind'
import Loader from './Loader'

const Profile: React.FunctionComponent = () => {
  const { state } = useOvermind()

  if (state.isLoadingProfile) {
    return (
      <div
        css={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <div
      css={{
        maxWidth: '1000px',
        display: 'flex',
        margin: '0 auto',
        '> div': {
          margin: '0 1rem',
        },
      }}
    >
      <div
        css={{
          flex: '0 0 250px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List />
      </div>
      <div
        css={{
          flex: 1,
        }}
      >
        <Editor />
      </div>
    </div>
  )
}

export default Profile
