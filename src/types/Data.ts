export interface Data {
  boards: {
    name: string
    columns: {
      name: string
      tasks: {
        title: string
        description: string
        status: string
        subtasks: { title: string; isCompleted: boolean }[]
      }[]
    }[]
  }[]
}
export type H = Omit<Data, 'boards'>
export type Boards = Data['boards']
export type Columns = Data['boards'][number]['columns']
export type Tasks = Data['boards'][number]['columns'][number]['tasks']
export type SubTasks = Data['boards'][number]['columns'][number]['tasks'][number]['subtasks']
export type Board = {
  name: string
  columns: {
    name: string
    tasks: {
      title: string
      description: string
      status: string
      subtasks: { title: string; isCompleted: boolean }[]
    }[]
  }[]
}
export type Column = {
  name: string
  tasks: {
    title: string
    description: string
    status: string
    subtasks: { title: string; isCompleted: boolean }[]
  }[]
}

export type Task = {
  title: string
  description: string
  status: string
  subtasks: { title: string; isCompleted: boolean }[]
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
export interface UpdateStatus {
  boardIndex: number
  columnIndex: number
  taskIndex: number
  title: string
  status: string
}
export interface AddColumn {
  route: string | string[]
  column: Column
}
