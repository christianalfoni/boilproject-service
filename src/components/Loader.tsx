import { jsx, css, keyframes } from '@emotion/core'

const animation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`

const base = css`
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation: ${animation} 1.8s infinite ease-in-out;
`

const attachmentBase = css`
  content: '';
  position: absolute;
  top: 0;
`

const Loader: React.FunctionComponent = () => (
  <div
    css={css`
      ${base}
      color: var(--color-white-3);
      font-size: 10px;
      margin: 80px auto;
      position: relative;
      text-indent: -9999em;
      transform: translateZ(0);
      animation-delay: -0.16s;
      :before {
        ${base}
        ${attachmentBase}
        left: -3.5em;
        animation-delay: -0.32s;
      }
      :after {
        ${base}
        ${attachmentBase}
        left: 3.5em;
      }
    `}
  />
)

export default Loader
