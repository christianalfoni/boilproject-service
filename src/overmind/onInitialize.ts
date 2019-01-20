import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({ actions, effects }) => {
  effects.api.onAuthChange(actions.onAuthChange)
  effects.router.route('/', actions.showFrontPage)
  effects.router.route<{ username: string }>('/:username', actions.showProfile)
  effects.router.route<{ username: string; boilerplate: string }>(
    '/:username/:boilerplate',
    actions.showProfile
  )
  effects.router.start()
}
