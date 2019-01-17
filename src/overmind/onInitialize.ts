import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({
  value: overmind,
  api,
  router,
}) => {
  api.onAuthChange(overmind.actions.onAuthChange)
  router.route('/', overmind.actions.showFrontPage)
  router.route<{ username: string }>('/:username', overmind.actions.showProfile)
  router.start()
}
