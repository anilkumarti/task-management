import React, { useState } from "react";
import "./TaskList.css";
import "./KanbanBoard";

import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus } from "../../../redux/slices/taskSlice";
import TaskGroup from "./TaskGroup";
import KanbanBoard from "./KanbanBoard";
import { List, LayoutGrid } from "lucide-react";

const TaskList = ({ openAddTask }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [activeView, setActiveView] = useState("list");
  const filterTasks = (status) => {
    const filteredTasks = tasks.filter((task) => {
      const statusMatch = task.status.toLowerCase() === status.toLowerCase();
      const categoryMatch =
        !filterCategory ||
        task.category.toLowerCase() === filterCategory.toLowerCase();
      const dueDateMatch = !filterDueDate || task.dueDate === filterDueDate;
      const searchMatch =
        !searchTerm ||
        task.title.toLowerCase().includes(searchTerm.trim().toLowerCase());

      return statusMatch && categoryMatch && dueDateMatch && searchMatch;
    });

    return filteredTasks;
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
  };

  return (
    <div>
      <div className="view-switcher">
        <button
          className={activeView === "list" ? "active" : ""}
          onClick={() => setActiveView("list")}
        >
           <List /> List
        </button>
        <button
          className={activeView === "board" ? "active" : ""}
          onClick={() => setActiveView("board")}
        >
          <LayoutGrid/> Board
        </button>
      </div>
      <div className="task-list">
        <div className="task-filter">
          <p>filter by</p>
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">Filter by Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <input
            type="date"
            onChange={(e) => setFilterDueDate(e.target.value)}
            placeholder="Filter by Due Date"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button onClick={openAddTask} className="add-task-btn">
            Add Task
          </button>
        </div>

        {activeView === "board" ? (
          <div className="Kanban-Board">
          <KanbanBoard
            title="Todo"
            tasks={filterTasks("Todo")}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
          <KanbanBoard
             title="In-Progress"
             tasks={filterTasks("In-Progress")}
             onDelete={handleDeleteTask}
             onStatusChange={handleStatusChange}
          />
          <KanbanBoard
               title="Completed"
               tasks={filterTasks("Completed")}
               onDelete={handleDeleteTask}
               onStatusChange={handleStatusChange}
          />
          </div>
          
        ) : (
          <>
            <div className="task-list-container">
              <div className="task-heading">
                <p>Task Name</p>
                <p>Due on</p>
                <p>Task Status</p>
                <p>Task Category</p>
              </div>

              <TaskGroup
                title="Todo"
                tasks={filterTasks("Todo")}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
              <TaskGroup
                title="In-Progress"
                tasks={filterTasks("In-Progress")}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
              <TaskGroup
                title="Completed"
                tasks={filterTasks("Completed")}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
