import React, { useState } from "react";
import "./TaskGroup.css";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskGroup = ({ title, tasks, onDelete, onStatusChange }) => {
  console.log('Group',title, tasks)

  const [openTaskId, setOpenTaskId] = useState(null);

  const toggleMenu = (taskId) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));

  };
  
  return (
    <div className="task-group">
      <h3 className={`task-group-title ${title.toLowerCase()}`}>{title} ({tasks.length})</h3>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-details">
              <h4>{task.title}</h4>
              <p className="task-category">{task.category}</p>
              <p className="task-due">Due Date: {task.dueDate}</p>
            </div>

            <select 
              value={task.status} 
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="task-status"
            >
              <option value="Todo">To-Do</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="task-actions">

            <div  className="edit-del-button">
      {/* Trigger button */}
      <button onClick={ ()=> toggleMenu(task.id)} style={{ fontSize: "20px", border: "none", background: "none", cursor: "pointer" }}>
        &#x22EE;
      </button>

      {/* Dropdown Menu */}
      {openTaskId===task.id && (
        <div className="edit-del-dropdown"
    
        >
          <div  className="edit-btn">
            ✏️ Edit
          </div>
          <div
          className="del-btn"
          onClick={()=> onDelete(task.id)}
          >
            🗑️ Delete
          </div>
        </div>
      )}
    </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks available.</p>
      )}
      <UpdateTaskModal/>
    </div>
  );
};

export default TaskGroup;
