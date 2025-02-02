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
      console.log(`Redux updating task ${id} to ${status}`); // Debug log
      
      const taskIndex = state.tasks.findIndex((task) => task.id.toString() === id.toString());
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status; 
      }
    },
    
    updateTask: (state, action) => {
      const { id, updatedTaskData } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTaskData } : task
      );
    },
  }
});

export const { addTask, deleteTask, updateTaskStatus,updateTask } = taskSlice.actions;
export default taskSlice.reducer;
