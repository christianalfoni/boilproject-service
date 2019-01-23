import { jsx, css } from '@emotion/core'
import { useOvermind } from '../overmind'
import ListItem from './ListItem'

const List: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <div>
      {state.isOwner ? (
        <form
          css={{ margin: 0 }}
          onSubmit={(event) => {
            event.preventDefault()
            actions.addBoilerplate()
          }}
        >
          <input
            type="text"
            css={{
              fontSize: '16px',
              padding: '0.5rem 0',
              width: '100%',
              border: 0,
              borderBottom: '1px solid var(--color-white-3)',
              backgroundColor: 'transparent',
              outline: 'none',
              '::placeholder': {
                color: 'var(--color-white-3)',
              },
              ':disabled': {
                opacity: 0.5,
              },
            }}
            disabled={state.isAddingConfiguration}
            onChange={actions.changeNewConfigurationName}
            value={state.newConfigurationName}
            placeholder="create new boilerplate..."
          />
        </form>
      ) : null}
      <ul
        css={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {Object.keys(state.currentProfile.boilerplates).map((name) => (
          <ListItem
            key={name}
            name={name}
            boilerplate={state.currentProfile.boilerplates[name]}
          />
        ))}
      </ul>
    </div>
  )
}

export default List
