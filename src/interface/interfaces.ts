export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: number;
  title: string;
  subtasks: Subtask[];
  isCompleted: boolean;
}
