import { Overmind, TConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { onInitialize } from './onInitialize'
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  onInitialize,
  state,
  actions,
  effects,
}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const overmind = new Overmind(config)

export const useOvermind = createHook(overmind)
