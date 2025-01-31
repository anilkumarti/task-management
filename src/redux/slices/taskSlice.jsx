import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], 
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, status: "todo" }); // Default status is "todo"
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    updateTask: (state, action) => {
      const { id, updatedTaskData } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        // Ensure immutability by creating a new object
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTaskData };
      }
    }
    
  },
});

export const { addTask, deleteTask, updateTaskStatus,updateTask } = taskSlice.actions;
export default taskSlice.reducer;
