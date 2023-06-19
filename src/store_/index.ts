//@ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
//@ts-ignore
import data from '../lib/data.json'
import type { Data, Boards, Tasks, SubTasks } from '@/types/Data'
import type { InjectionKey } from 'vue'
export interface State {
  hello: string
  toggle: boolean
  data: Data[]
  modal: boolean
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore({
  state: {
    hello: 'Hello  Vuex',
    toggle: false,
    data: [data],
    modal: false
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
    },
    modal: (state: State) => {
      return state.modal
    }
  },
  mutations: {
    changeText(state: State, payload: string) {
      state.hello = payload
    },
    btnToggle(state: State) {
      state.toggle = !state.toggle
    },
    toggleModal(state: State, payload: string) {
      state.modal = !state.modal
    }
  },
  actions: {
    changeText(context: any, payload: string) {
      context.commit('changeText', payload)
    },
    btnToggle({ commit }: any) {
      commit('btnToggle')
    },
    toggleModal({ commit }: any, payload: string) {
      commit('toggleModal', payload)
    }
  }
})
export function useStore() {
  return baseUseStore(key)
}
