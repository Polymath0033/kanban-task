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
