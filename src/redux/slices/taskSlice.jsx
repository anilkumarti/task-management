// src/redux/slices/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchTasksStart: (state) => {
      state.isLoading = true;
    },
    fetchTasksSuccess: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchTasksFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { fetchTasksStart, fetchTasksSuccess, fetchTasksFailure, addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;