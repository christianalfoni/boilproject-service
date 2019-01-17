import { Action, pipe, action, Operator, debounce, filter } from 'overmind'
import { User, File, Page } from './state'

export const showFrontPage: Action = ({ state }) => {
  state.currentPage = Page.FRONT
}

export const showProfile: Action<{ username }> = async ({
  value: params,
  state,
  api,
}) => {
  state.currentPage = Page.PROFILE

  if (
    state.currentProfile &&
    params.username === state.currentProfile.username
  ) {
    return
  }

  state.isLoadingProfile = true
  state.currentProfile = await api.getProfile(params.username)
  state.currentBoilerplateName = Object.keys(
    state.currentProfile.boilerplates || {}
  )[0]
  state.currentFileIndex = 0
  state.isLoadingProfile = false
}

export const onAuthChange: Action<User> = async ({ value: user, state }) => {
  state.isAuthenticating = false

  if ((state.user && user) || !user) {
    return
  }

  if (state.user && !user) {
    state.user = null
    return
  }

  state.user = user
}

export const login: Action = async ({ state, api, router }) => {
  state.isLoggingIn = true
  try {
    state.user = await api.authenticate()
  } catch (e) {
    console.log('Was not able to login', e)
  }
  state.isLoggingIn = false
  router.goTo('/' + state.user.username)
}

export const logout: Action = async ({ api }) => {
  await api.signOut()
}

export const changeNewConfigurationName: Action<
  React.ChangeEvent<HTMLInputElement>
> = ({ value: event, state }) => {
  state.newConfigurationName = event.currentTarget.value
}

export const addBoilerplate: Action = async ({ state, api }) => {
  state.isAddingConfiguration = true
  const configuration = await api.createBoilerplate(
    state.user,
    state.newConfigurationName
  )
  state.currentProfile.boilerplates[state.newConfigurationName] = configuration
  state.newConfigurationName = ''
  state.isAddingConfiguration = false
}

export const updatePackageJson: Operator<string> = pipe(
  filter(({ state }) => Boolean(state.user)),
  action(({ value, state }) => {
    state.currentBoilerplate.files[0].content = value
  }),
  debounce(200),
  action(({ state, api }) => {
    api.updateBoilerplate(
      state.user,
      state.currentBoilerplateName,
      state.currentBoilerplate
    )
  })
)

export const updateFile: Operator<{ value: string; file: File }> = pipe(
  action(({ value: details, state }) => {
    details.file.content = details.value
  }),
  debounce(200),
  action(({ state, api }) => {
    api.updateBoilerplate(
      state.user,
      state.currentBoilerplateName,
      state.currentBoilerplate
    )
  })
)

export const changeNewFileName: Action<React.ChangeEvent<HTMLInputElement>> = ({
  value: event,
  state,
}) => {
  state.newFileName = event.currentTarget.value
}

export const addFile: Action = async ({ state, api }) => {
  state.isAddingFile = true
  await api.updateBoilerplate(
    state.user,
    state.currentBoilerplateName,
    state.currentBoilerplate
  )
  const newLength = state.currentBoilerplate.files.push({
    path: state.newFileName,
    content: '',
  })

  state.isAddingFile = false
  state.newFileName = ''
  state.currentFileIndex = newLength - 1
}

export const changeNewPackageName: Action<
  React.ChangeEvent<HTMLInputElement>
> = ({ value: event, state }) => {
  state.newPackageName = event.currentTarget.value
}

export const changeFile: Action<number> = ({ value: index, state }) => {
  state.currentFileIndex = index
}

export const changeBoilerplate: Action<string> = ({ value: name, state }) => {
  state.currentFileIndex = 0
  state.currentBoilerplateName = name
}
