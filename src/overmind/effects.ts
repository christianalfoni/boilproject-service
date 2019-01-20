import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { User, Boilerplate, Profile } from './state'
import page from 'page'

export const router = {
  route<Params>(url: string, action: (params: Params) => void) {
    page(url, (context) => action(context.params))
  },
  start() {
    page.start()
  },
  goTo(url: string) {
    page.show(url)
  },
  redirect(url: string) {
    page.redirect(url)
  },
}

export const api = (() => {
  function createFirebaseInstance(config) {
    const provider = new firebase.auth.GithubAuthProvider()

    provider.setCustomParameters({
      allow_signup: 'false',
    })

    firebase.initializeApp(config)

    const db = firebase.firestore()

    db.settings({
      timestampsInSnapshots: true,
    })

    return {
      db,
      provider,
    }
  }

  function getUser(user: firebase.User, username: string): User {
    return {
      uid: user.uid,
      username,
      photoURL: user.photoURL,
      displayName: user.displayName,
    }
  }

  const { db, provider } = createFirebaseInstance({
    apiKey: 'AIzaSyBOSII8X17PcYE_usoU4eHXzckPFVebhuc',
    authDomain: 'configure-project-85b8a.firebaseapp.com',
    databaseURL: 'https://configure-project-85b8a.firebaseio.com',
    projectId: 'configure-project-85b8a',
    storageBucket: 'configure-project-85b8a.appspot.com',
    messagingSenderId: '186256588329',
  })

  return {
    onAuthChange(action: (user: User) => void) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('profiles')
            .doc(user.uid)
            .get()
            .then((doc) => {
              action(getUser(user, doc.get('username')))
            })
        } else {
          action(null)
        }
      })
    },
    authenticate(): Promise<User> {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            return fetch(
              'https://api.github.com/user?access_token=' +
                (result.credential as any).accessToken
            )
              .then((response) => response.json())
              .then((githubResult) => {
                return db
                  .collection('profiles')
                  .doc(result.user.uid)
                  .set(
                    {
                      username: githubResult.login,
                    },
                    {
                      merge: true,
                    }
                  )
                  .then(() => githubResult.login)
              })
              .then((login) => resolve(getUser(result.user, login)))
          })
          .catch((error) => reject(error))
      })
    },
    signOut() {
      return new Promise((_, reject) => {
        firebase
          .auth()
          .signOut()
          .then(() => location.reload(true))
          .catch((error) => reject(error))
      })
    },
    getProfile(username: string): Promise<Profile> {
      return new Promise((resolve) => {
        db.collection('profiles')
          .where('username', '==', username)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.docs.length) {
              const doc = querySnapshot.docs[0]

              db.collection('profiles')
                .doc(doc.id)
                .collection('boilerplates')
                .get()
                .then((querySnapshot) => {
                  const profile = {
                    ...doc.data(),
                    boilerplates: querySnapshot.docs.reduce(
                      (aggr, doc) => ({
                        ...aggr,
                        [doc.id]: doc.data(),
                      }),
                      {}
                    ),
                  } as Profile

                  resolve(profile)
                })
            } else {
              resolve(null)
            }
          })
          .catch(() => {
            resolve(null)
          })
      })
    },
    createBoilerplate(user: User, name: string): Promise<Boilerplate> {
      const ref = db
        .collection('profiles')
        .doc(user.uid)
        .collection('boilerplates')
        .doc(name)

      return new Promise((resolve, reject) => {
        ref
          .get()
          .then((doc) => {
            if (doc.exists) {
              throw new Error('Already exists')
            }

            const configuration: Boilerplate = {
              created: Date.now(),
              files: [
                {
                  path: 'package.json',
                  content: '{\n\n}',
                },
              ],
            }

            return Promise.all([
              ref.set(configuration).then(() => ({
                id: name,
                ...configuration,
              })),
              db.collection('links').add({
                uid: user.uid,
                name,
                username: user.username,
              }),
            ]).then(() => configuration)
          })
          .then(resolve)
          .catch(reject)
      })
    },
    updateBoilerplate(user: User, name: string, data: Partial<Boilerplate>) {
      return new Promise((resolve, reject) => {
        db.collection('profiles')
          .doc(user.uid)
          .collection('boilerplates')
          .doc(name)
          .update({
            files: data.files,
          })
          .then(() => resolve())
          .catch((error) => reject(error))
      })
    },
  }
})()
