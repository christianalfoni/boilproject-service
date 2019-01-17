import { jsx } from '@emotion/core'

type Props = {
  Icon: React.FunctionComponent
}

const ValueProposition: React.FunctionComponent<Props> = ({
  Icon,
  children,
}) => {
  return (
    <div
      css={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Icon
          css={{
            fontSize: '48px',
            color: 'var(--color-black-2)',
            padding: '1rem',
          }}
        />
      </div>
      <div css={{ fontSize: '18px' }}>{children}</div>
    </div>
  )
}

export default ValueProposition
