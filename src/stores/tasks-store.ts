import { defineStore } from 'pinia'

// Add 'id' to the Subtask interface
export interface Subtask {
  id: string
  label: string
  completed: boolean
  editing?: boolean
}

export interface TaskGroup {
  id: string
  title: string
  tasks: Subtask[]
  editing?: boolean
  newTitle?: string
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as TaskGroup[],
  }),

  actions: {
    loadTasks() {
      const stored = localStorage.getItem('taskGroups')
      if (stored) {
        // When loading, ensure every subtask has a unique ID for robust rendering
        this.tasks = JSON.parse(stored).map((group: TaskGroup) => ({
          ...group,
          tasks: group.tasks.map((task: any) => ({
            ...task,
            id: task.id || Math.random().toString(36).substring(2, 9), // Add ID if missing
            editing: false,
          })),
        }))
      }
    },

    saveTasks() {
      localStorage.setItem('taskGroups', JSON.stringify(this.tasks))
    },

    // Updated to accept tasks without IDs and assign them here
    addTaskGroup(title: string, tasks: Omit<Subtask, 'id'>[]) {
      const newGroup: TaskGroup = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        tasks: tasks.map((task) => ({
          ...task,
          // Assign a new unique ID to each subtask
          id: Math.random().toString(36).substring(2, 9),
        })),
      }
      this.tasks.push(newGroup)
      this.saveTasks()
    },

    addNewSubtask(groupId: string, afterIndex: number) {
      const group = this.tasks.find((g) => g.id === groupId)
      if (group) {
        const newSubtask: Subtask = {
          // Assign a new unique ID
          id: Math.random().toString(36).substring(2, 9),
          label: '',
          completed: false,
          editing: true,
        }
        group.tasks.splice(afterIndex + 1, 0, newSubtask)
      }
    },

    toggleSubtask(groupId: string, index: number) {
      const group = this.tasks.find((g) => g.id === groupId)
      if (group) {
        group.tasks[index].completed = !group.tasks[index].completed
        this.saveTasks()
      }
    },

    removeTask(groupId: string) {
      this.tasks = this.tasks.filter((g) => g.id !== groupId)
      this.saveTasks()
    },

    editGroupTitle(groupId: string, newTitle: string) {
      const group = this.tasks.find((g) => g.id === groupId)
      if (group) {
        group.title = newTitle
        this.saveTasks()
      }
    },

    removeSubtask(groupId: string, index: number) {
      const group = this.tasks.find((g) => g.id === groupId)
      if (group) {
        group.tasks.splice(index, 1)
        this.saveTasks()
      }
    },
  },
})
