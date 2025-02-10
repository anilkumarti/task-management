import React, { useState,useEffect } from "react";
import "./TaskList.css";
import "./KanbanBoard";

import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus,updateTask } from "../../../redux/slices/taskSlice";
import TaskGroup from "./TaskGroup";
import KanbanBoard from "./KanbanBoard";

import { ReactComponent as ListIcon } from "../../../assets/icons/list_icon.svg";
import { ReactComponent as GroupIcon } from "../../../assets/icons/GroupIcon.svg";

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

  useEffect(() => {
    console.log("openAddTask triggered");
  }, [openAddTask]);
  
  const handleDeleteTask = (id) => {
    console.log("Deleting task with id:", id);
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
  };
  // console.log("data of task",tasks);

  const handleUpdateTask=(id,updatedTaskData)=> {
    
    dispatch(updateTask({ id, updatedTaskData }));
  }

  return (
    <div>
      <div className="view-switcher">
        <button
          className={activeView === "list" ? "active" : ""}
          onClick={() => setActiveView("list")}
        >
           <ListIcon /> List
        </button>
        <button
          className={activeView === "board" ? "active" : ""}
          onClick={() => setActiveView("board")}
        >
          <GroupIcon/> Board
        </button>
      </div>
      <div className="task-list">

      <div className="task-controls">

  <div className="filter-section">
    <p>Filter by</p>
    <select onChange={(e) => setFilterCategory(e.target.value)}>
      <option value="">Filter by Category</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
    </select>

    <input 
      type="date"
      onChange={(e) => setFilterDueDate(e.target.value)}
      placeholder="Filter by Due Date"
      className="calender"
    />
  </div>

 
 

  <div className="search-add-section">
    <input
      type="text"
      placeholder="Search tasks..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button onClick={(e)=> {  e.stopPropagation();
      openAddTask();}} className="add-task-btn" >
      Add Task
    </button>

  
  </div>
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
              {/* <hr className="long-line" /> */}
              <TaskGroup
                title="Todo"
                onUpdateTask={handleUpdateTask} 
                tasks={filterTasks("Todo")}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
              <TaskGroup
                title="In-Progress"
                onUpdateTask={handleUpdateTask} 
                tasks={filterTasks("In-Progress")}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
              <TaskGroup
                title="Completed"
                onUpdateTask={handleUpdateTask} 
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
