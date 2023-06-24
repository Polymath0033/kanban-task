//@ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
//@ts-ignore
import data from '../lib/data.json'
import type { Data, Boards, Tasks, SubTasks, Columns, Board } from '@/types/Data'
import type { InjectionKey } from 'vue'
export interface State {
  hello: string
  toggle: boolean
  data: Data[]
  modal: boolean
  edit: boolean
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore({
  state: {
    hello: 'Hello  Vuex',
    toggle: false,
    data: [data],
    modal: false,
    edit: false
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
    },
    edit: (state: State) => {
      return state.edit
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
    },
    addBoard: (state: State, payload: Board) => {
      state.data[0].boards.push(payload)
    },
    editBoard: (state: State, payload: Board) => {
      state.data[0].boards.map((board) => {
        board.name === payload.name ? { ...board, board: payload } : board
        console.log(board)
      })
    },
    toggleEdit: (state: State) => {
      state.edit = !state.edit
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
    },
    addBoard: ({ commit }: any, payload: Board) => {
      commit('addBoard', payload)
    },
    editBoard: ({ commit }: any, payload: Board) => {
      commit('editBoard', payload)
    },
    toggleEdit: ({ commit }: any) => {
      commit('toggleEdit')
    }
  }
})
export function useStore() {
  return baseUseStore(key)
}
