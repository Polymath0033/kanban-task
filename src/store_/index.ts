//@ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
//@ts-ignore
import data from '../lib/data.json'
import type { Data } from '@/types/Data'
import type { InjectionKey } from 'vue'
export interface State {
  hello: string
  toggle: boolean
  data: Data[]
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore({
  state: {
    hello: 'Hello  Vuex',
    toggle: false,
    data: [data]
  },
  getters: {
    hello(state: State) {
      return state.hello
    },
    toggle: (state: State) => {
      return state.toggle
    },
    data: (state: State) => {
      return state.data
    }
  },
  mutations: {
    changeText(state: State, payload: string) {
      state.hello = payload
    },
    btnToggle(state: State) {
      state.toggle = !state.toggle
    }
  },
  actions: {
    changeText(context: any, payload: string) {
      context.commit('changeText', payload)
    },
    btnToggle({ commit }: any) {
      commit('btnToggle')
    }
  }
})
export function useStore() {
  return baseUseStore(key)
}
