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




// First, let's analyze what we need:
// 1. A Task interface with id, title, subtasks array, and isCompleted flag
// 2. A Subtask interface with id, title, and isCompleted flag
// 3. Need to maintain proper typing throughout
// 4. Should use ShadcN's Checkbox component for accessibility
// 5. Need proper default props for standalone usage

// import { useState } from 'react';
// import { Check } from 'lucide-react';
// import { Checkbox } from '@/components/ui/checkbox';

// // Define our interfaces first. These match exactly what the user provided in their types.ts file.
// // Using number for IDs as specified, rather than string.

// interface Subtask {
//   id: number;
//   title: string;
//   isCompleted: boolean;
// }

// interface Task {
//   id: number;
//   title: string;
//   subtasks: Subtask[];
//   isCompleted: boolean;
// }

// // Now define our component props interface. Make everything optional with sensible defaults.
// // Include a callback for when tasks/subtasks are toggled.

// interface TaskWithSubtasksProps {
//   /** The task to display and manage */
//   task?: Task;
//   /** Called when any task or subtask is toggled */
//   onToggle?: (taskId: number, subtaskId?: number) => void;
// }

// // Create some default data that matches the expected shape.
// // This ensures the component works without any props passed.

// const DEFAULT_TASK: Task = {
//   id: 1,
//   title: "Sample Task",
//   subtasks: [
//     { id: 1, title: "First subtask", isCompleted: false },
//     { id: 2, title: "Second subtask", isCompleted: false },
//     { id: 3, title: "Third subtask", isCompleted: false }
//   ],
//   isCompleted: false
// };

// // Now implement the main component. Use proper TypeScript typing throughout.
// // Maintain immutability when updating state.

// const TaskWithSubtasks = ({ 
//   task = DEFAULT_TASK,
//   onToggle 
// }: TaskWithSubtasksProps) => {
//   const [currentTask, setCurrentTask] = useState<Task>(task);

//   const handleToggle = (subtaskId?: number) => {
//     const updatedTask = { ...currentTask };
    
//     if (subtaskId !== undefined) {
//       const subtaskIndex = updatedTask.subtasks.findIndex(st => st.id === subtaskId);
//       if (subtaskIndex !== -1) {
//         updatedTask.subtasks[subtaskIndex].isCompleted = !updatedTask.subtasks[subtaskIndex].isCompleted;
        
//         // Update parent task completion status
//         updatedTask.isCompleted = updatedTask.subtasks.every(st => st.isCompleted);
//       }
//     } else {
//       // Toggle parent task and all subtasks
//       updatedTask.isCompleted = !updatedTask.isCompleted;
//       updatedTask.subtasks.forEach(st => st.isCompleted = updatedTask.isCompleted);
//     }

//     setCurrentTask(updatedTask);
//     onToggle?.(updatedTask.id, subtaskId);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Main Task Checkbox */}
//       <div className="flex items-center space-x-3">
//         <Checkbox
//           id={`task-${currentTask.id}`}
//           checked={currentTask.isCompleted}
//           onCheckedChange={() => handleToggle()}
//           aria-label={`Toggle completion of ${currentTask.title}`}
//           className="data-[state=checked]:bg-primary"
//         />
//         <label
//           htmlFor={`task-${currentTask.id}`}
//           className="text-lg font-medium cursor-pointer"
//         >
//           {currentTask.title}
//         </label>
//       </div>

//       {/* Subtasks List */}
//       <ul className="space-y-2 pl-6">
//         {currentTask.subtasks.map((subtask) => (
//           <li key={subtask.id} className="flex items-center space-x-3">
//             <Checkbox
//               id={`subtask-${subtask.id}`}
//               checked={subtask.isCompleted}
//               onCheckedChange={() => handleToggle(subtask.id)}
//               aria-label={`${subtask.title} ${subtask.isCompleted ? 'complete' : 'incomplete'}`}
//               className="data-[state=checked]:bg-primary"
//             />
//             <label
//               htmlFor={`subtask-${subtask.id}`}
//               className="text-sm cursor-pointer"
//             >
//               {subtask.title}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskWithSubtasks;