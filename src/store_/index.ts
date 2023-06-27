//@ts-ignore
import { createStore, useStore as baseUseStore, Store } from 'vuex'
//@ts-ignore
import data from '../lib/data.json'
import type { Data, Boards, Tasks, SubTasks, Columns, Board, Task } from '@/types/Data'
import type { InjectionKey } from 'vue'
export interface State {
  hello: string
  toggle: boolean
  data: Data[]
  modal: boolean
  edit: boolean
}
export interface AddTask {
  routeName: string | string[]
  column: string
  payload: Task
}
export interface DeleteTask {
  routeName: string | string[]
  column: string
  title: string
}
export interface EditBoard {
  boardIndex: number
  boardName: string
  columnIndexes: number[]
  columnNames: string[]
}
export interface EditTask {
  boardIndex: number
  columnIndex: number
  tasksIndex: number
  tasksInput: Task
  subtasksIndexes: number[]
  subtasksInputs: { title: string; isCompleted: boolean }[]
}
export interface ToggleCompleted {
  boardIndex: number
  columnIndex: number
  taskIndex: number
  subtaskIndex: number
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
    editBoard: (state: State, payload: EditBoard) => {
      const data = state.data[0]
      if (data) {
        const boards = data.boards[payload.boardIndex]
        if (boards) {
          boards.name = payload.boardName
          if (!boards.columns) {
            boards.columns = []
          }
          if (boards.columns) {
            payload.columnIndexes.forEach((columnIndex, i) => {
              if (boards.columns[columnIndex]) {
                boards.columns[columnIndex].name = payload.columnNames[i]
              }
            })
          }
          if (payload.columnNames.length > boards.columns.length) {
            const newColumns = payload.columnNames.slice(boards.columns.length).map((name) => ({
              name,
              tasks: []
            }))
            boards.columns.push(...newColumns)
          }
        }
      }
    },
    toggleEdit: (state: State) => {
      state.edit = !state.edit
    },
    deleteBoard: (state: State, payload: string | string[]) => {
      const data = state.data[0].boards
      const index = data.findIndex(({ name }) => name === payload)
      console.log(index)
      state.data[0].boards.splice(index, 1)
    },
    addTask: (state: State, payload: AddTask) => {
      const data = state.data[0].boards
      const filterBoard = data.filter(({ name }) => name === payload.routeName)
      let column: Columns = []
      for (const col of filterBoard) {
        column = col.columns
      }
      const filterColumns = column.filter(({ name }) => name === payload.payload.status)
      let tasks: Tasks = []
      for (const task of filterColumns) {
        tasks = task.tasks
      }
      tasks.push(payload.payload)
    },
    editTask: (state: State, payload: EditTask) => {
      const data = state.data[0]
      if (data) {
        const boards = data.boards[payload.boardIndex]
        if (boards) {
          const tasks = boards.columns[payload.columnIndex].tasks
          if (tasks) {
            tasks[payload.tasksIndex].title = payload.tasksInput.title
            tasks[payload.tasksIndex].description = payload.tasksInput.description
            tasks[payload.tasksIndex].status = payload.tasksInput.status
            const subtasks = tasks[payload.tasksIndex].subtasks
            if (subtasks) {
              payload.subtasksIndexes.forEach((subtaskIndex, i) => {
                if (subtasks[subtaskIndex]) {
                  subtasks[subtaskIndex].title = payload.subtasksInputs[i].title
                  subtasks[subtaskIndex].isCompleted = payload.subtasksInputs[i].isCompleted
                }
                if (payload.subtasksIndexes.length > subtasks.length) {
                  const newSubtask = payload.subtasksInputs
                    .slice(subtasks.length)
                    .map(({ title, isCompleted }) => ({ title, isCompleted: false }))
                  subtasks.push(...newSubtask)
                }
              })
            }
          }
        }
      }
    },
    deleteTask: (state: State, payload: DeleteTask) => {
      const data = state.data[0].boards
      const filterBoard = data.filter(({ name }) => name === payload.routeName)
      let column: Columns = []
      for (const col of filterBoard) {
        column = col.columns
      }
      const filterColumns = column.filter(({ name }) => name === payload.column)
      let tasks: Tasks = []
      for (const task of filterColumns) {
        tasks = task.tasks
      }
      const taskIndex = tasks.findIndex(({ title }) => title === payload.title)
      tasks.splice(taskIndex, 1)
    },
    toggleCompleted: (state: State, payload: ToggleCompleted) => {
      const data = state.data[0]
      if (data) {
        const boards = data.boards[payload.boardIndex]
        if (boards && boards.columns && boards.columns[payload.columnIndex]) {
          const task = boards.columns[payload.columnIndex].tasks[payload.taskIndex]
          if (task && task.subtasks && task.subtasks[payload.subtaskIndex]) {
            task.subtasks[payload.subtaskIndex].isCompleted =
              !task.subtasks[payload.subtaskIndex].isCompleted
          }
        }
      }
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
    editBoard: ({ commit }: any, payload: EditBoard) => {
      commit('editBoard', payload)
    },
    toggleEdit: ({ commit }: any) => {
      commit('toggleEdit')
    },
    deleteBoard: ({ commit }: any, payload: string) => {
      commit('deleteBoard', payload)
    },
    addTask: ({ commit }: any, payload: AddTask) => {
      commit('addTask', payload)
    },
    editTask: ({ commit }: any, payload: string) => {
      commit('editTask', payload)
    },
    deleteTask: ({ commit }: any, payload: string) => {
      commit('deleteTask', payload)
    },
    toggleCompleted: ({ commit }: any, payload: string) => {
      commit('toggleCompleted', payload)
    }
  }
})
export function useStore() {
  return baseUseStore(key)
}
