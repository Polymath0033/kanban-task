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
