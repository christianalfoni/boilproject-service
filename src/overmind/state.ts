export enum Page {
  FRONT = 'FRONT',
  PROFILE = 'PROFILE',
}

export type User = {
  username: string
  displayName: string
  photoURL: string
  uid: string
}

export type File = {
  path: string
  content: string
}

export type Boilerplate = {
  created: number
  files: File[]
}

export type Profile = {
  boilerplates: {
    [name: string]: Boilerplate
  }
  username: string
}

export type State = {
  user: User

  currentPage: Page
  currentProfile: Profile
  currentBoilerplateName: string
  currentBoilerplate: Boilerplate

  isAuthenticating: boolean
  isLoggingIn: boolean
  isLoadingProfile: boolean
  isAddingConfiguration: boolean
  newConfigurationName: string
  isAddingFile: boolean
  newFileName: string
  newPackageName: string
  isUpdatingPackages: boolean
  currentFileIndex: number
  currentFile: File
  isOwner: boolean
}

export const state: State = {
  currentPage: Page.FRONT,
  currentProfile: null,
  isAuthenticating: true,
  isLoadingProfile: false,
  isLoggingIn: false,
  user: null,
  newConfigurationName: '',
  isAddingConfiguration: false,
  currentBoilerplateName: null,
  get currentBoilerplate(this: State) {
    return (
      this.currentProfile &&
      this.currentProfile.boilerplates[this.currentBoilerplateName]
    )
  },
  get currentFile(this: State) {
    return (
      (this.currentBoilerplate &&
        this.currentBoilerplate.files[this.currentFileIndex]) ||
      null
    )
  },
  isAddingFile: false,
  newFileName: '',
  newPackageName: '',
  isUpdatingPackages: false,
  currentFileIndex: 0,
  get isOwner(this: State) {
    return (
      this.currentProfile &&
      this.user &&
      this.user.username === this.currentProfile.username
    )
  },
}
